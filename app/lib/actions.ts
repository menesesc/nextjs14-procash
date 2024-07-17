'use server'
import { connectDB } from '@/app/lib/mongoose'
import Pedidos from '@/app/lib/models/Pedido'
import Tecnico from '@/app/lib//models/Tecnico';

export type PedidoProps = {
  pedido: string,
  cliente: string,
  atm: string,
  direccion: string,
  localidad: string,
  provincia: string,
  tecnicoasistio: string,
  zona: string,
  fechaalta: string,
  horaalta: string,
  fechallegada: string,
  horallegada: string,
  fechafin: string,
  horafin: string,
  };

export async function createBulkUPedidos(pedidos: PedidoProps[]) {
    try {
      connectDB()
      await Pedidos.deleteMany()
      await Pedidos.insertMany(pedidos)
      
    } catch (error) {
      console.log(error);
    }
  }

export async function agregarBases() {
    try {
      connectDB()
      
      let search = `[
        {"$match": {"esbase": true}},
        {"$project": {"_id": 0}}
      ]`
      const bases = await Tecnico.aggregate(JSON.parse(search))
      let pedidosBases = []
      for (let i = 0; i < bases.length; i++) {
        const fechas:any = await getFechasPedidos(bases[i].tecnico)
        for (let j = 0; j < fechas.length; j++) {
          let newPedidoIn = {"pedido": "-", "cliente": "BASE", "atm": '-', "direccion": bases[i].desc, "localidad": ".", "provincia": ".", "tecnicoasistio": bases[i].tecnico, "zona": "", "fechaalta": fechas[j].fechallegada, "horaalta": "00:01", "fechallegada": fechas[j].fechallegada, "horallegada": "00:01", "fechafin": fechas[j].fechallegada, "horafin": "00:01",}
          let newPedidoOut = {"pedido": "-", "cliente": "BASE", "atm": '-', "direccion": bases[i].desc, "localidad": ".", "provincia": ".", "tecnicoasistio": bases[i].tecnico, "zona": "", "fechaalta": fechas[j].fechallegada, "horaalta": "23:59", "fechallegada": fechas[j].fechallegada, "horallegada": "23:59", "fechafin": fechas[j].fechallegada, "horafin": "23:59",}
          pedidosBases.push(newPedidoIn)
          pedidosBases.push(newPedidoOut)
        }
      }
      if(pedidosBases.length > 0) {
        await Pedidos.insertMany(pedidosBases)
      }
      return bases
      
    } catch (error) {
      console.log(error);
    }
  }

export async function getTotalKmsFecha(tecnico: string, fecha: string) {
  var points: any = []
  var id = 1
  let km = 0
  try {
      connectDB()

      const apigoogle:any = process.env.GOOGLE_MAP_API

      const dataPedidos:any = await getPedidos(tecnico, fecha)
      console.log(dataPedidos)
      points = []
      for (let i =0; i < dataPedidos.length; i++) {
            let newPoint
            if (dataPedidos[i].cliente === "BASE") {
                newPoint = {"id": id, "address": dataPedidos[i].direccion}
            } else {
                newPoint = {"id": id, "address": dataPedidos[i].cliente + ", " + dataPedidos[i].direccion + "," + dataPedidos[i].localidad + "," + dataPedidos[i].provincia}
            }
            points.push(newPoint)
            id = id + 1
        }

      if(points.length > 1){
        const directionService = new window.google.maps.DirectionsService()
        const waypoints = points.map((point: any)=>({
            location: point.address
        }))
        
        const request = {
            origin: waypoints[0].location,
            destination: waypoints[waypoints.length -1].location,
            waypoints: waypoints.slice(1, -1),
            travelMode: window.google.maps.TravelMode.DRIVING
        }

        const res:any = await directionService.route(request)
        if (res.status === 'OK') {
            for (let i = 0; i < res.routes[0].legs.length; i++) {
                km += res.routes[0].legs[i].distance.value /1000
            }
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      return km.toFixed(0)
    }
  }

export async function getTotalKms(tecnico: string) {
  let totalKms = 0
  try {
    connectDB()
    const fechas:any = await getFechasPedidos(tecnico)
    for (let i =0; i < fechas.length; i++) {
      let kms = await getTotalKmsFecha(tecnico, fechas[i].fechallegada)
      totalKms += +(kms) 
    }
  } catch (error) {
    console.log(error)
  } finally {
    return totalKms
  }
}

export async function postParadaTecnico(tecnico: string, domicilio: string){
  if (domicilio.length > 0) {
    try {
      // crea parada
      connectDB()
      let paradas:any = await getParadas(tecnico)
      let post = (paradas.length === 0) ? [{"tecnico": tecnico, "desc": domicilio, "esbase": true}] : [{"tecnico": tecnico, "desc": domicilio, "esbase": false}]
      await Tecnico.insertMany(post)
      
      //agrega info si es base a la bd
      if (paradas.length === 0) {
        let pedidosBases = []
        const fechas:any = await getFechasPedidos(tecnico)
        for (let j = 0; j < fechas.length; j++) {
          let newPedidoIn = {"pedido": "-", "cliente": "BASE", "atm": '-', "direccion": domicilio, "localidad": ".", "provincia": ".", "tecnicoasistio": tecnico, "zona": "", "fechaalta": fechas[j].fechallegada, "horaalta": "00:01", "fechallegada": fechas[j].fechallegada, "horallegada": "00:01", "fechafin": fechas[j].fechallegada, "horafin": "00:01"}
          let newPedidoOut = {"pedido": "-", "cliente": "BASE", "atm": '-', "direccion": domicilio, "localidad": ".", "provincia": ".", "tecnicoasistio": tecnico, "zona": "", "fechaalta": fechas[j].fechallegada, "horaalta": "23:59", "fechallegada": fechas[j].fechallegada, "horallegada": "23:59", "fechafin": fechas[j].fechallegada, "horafin": "23:59"}
          pedidosBases.push(newPedidoIn)
          pedidosBases.push(newPedidoOut)
        }
        
        if(pedidosBases.length > 0) {
          await Pedidos.insertMany(pedidosBases)
        }
      }
      return true
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Domicilio vacio")
  }
}

export async function postParadaPedido(tecnico: string, domicilio: string, fecha: string, hora:string) {
  try {
    connectDB()
    let newPedido = [{"pedido": "-", "cliente": "PARADA", "atm": '-', "direccion": domicilio, "localidad": ".", "provincia": ".", "tecnicoasistio": tecnico, "zona": "", "fechaalta": fecha, "horaalta": hora, "fechallegada": fecha, "horallegada": hora, "fechafin": fecha, "horafin": hora}]
    const id = await Pedidos.insertMany(newPedido)
    return id
  } catch (error) {
    console.log(error)
  }
}

export async function deleteParadaPedido(id:string) {
  try {
    await Pedidos.findByIdAndDelete(id)
    return true
  } catch (error) {
    console.log(error)
  }
}

export async function getPedidos(tecnicoasistio: string, fechallegada: string) {
  try {
    connectDB()
    let search = `[
      {"$match": {"$and": 
        [{"tecnicoasistio": "${tecnicoasistio}"}, 
         {"fechallegada": "${fechallegada}"}]}},
      {"$sort": { "horallegada": 1}}      
    ]`
    const pedidos = await Pedidos.aggregate(JSON.parse(search))
    return JSON.stringify(pedidos) 
  } catch (error) {
    console.log(error);
  }
}

export async function getFechasPedidos(tecnicoasistio: string) {
  try {
    connectDB()
    let search = `[
      {"$match": {"tecnicoasistio": "${tecnicoasistio}"}},
      {"$group": {"_id": null, "fechallegada": {"$addToSet": "$fechallegada"}}}, 
      {"$unwind": {"path": "$fechallegada"}},
      {"$sort": { "fechallegada": 1}},
      {"$project": { "_id": 0}}

    ]`
    const fechas = await Pedidos.aggregate(JSON.parse(search))
    return fechas 
  } catch (error) {
    console.log(error);
  }
}

export async function getTecnicos() {
  try {
    connectDB()
    let search = `[
      {"$match": {"fechallegada": {"$ne": null}}},
      {"$group": {"_id": null, "tecnico": {"$addToSet": "$tecnicoasistio"}}}, 
      {"$unwind": {"path": "$tecnico"}},
      {"$sort": { "tecnico": 1}},
      {"$project": { "_id": 0}}
    ]`
    const tecnicos = await Pedidos.aggregate(JSON.parse(search))
    if (tecnicos.length == 0) return ""
    return tecnicos
  } catch (error) {
    console.log(error);
  }
}

export async function getParadas(tecnicoasistio: string) {
  try {
    connectDB()
    let search = `[
      {"$match": {"tecnico": "${tecnicoasistio}"}},
      {"$project": {"_id": 0}}
    ]`
    const paradas = await Tecnico.aggregate(JSON.parse(search))
    return paradas 
  } catch (error) {
    console.log(error);
  }
}