import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer, DirectionsRendererProps } from '@react-google-maps/api';
import { useAppContext } from "@/app/context";

const containerStyle = {
    width: "74vw",
    height: "80vh"
};

const center = {
  lat: -41.146267,
  lng: -71.3132121
};

const points2 = [
    {
        lat: -41.146267,
        lng: -71.3132121,
        address: "Las Nalcas 8291, San Carlos de Bariloche"
    },
    {
        lat: -41.146267,
        lng: -71.3232121,
        address: "Mitre 520, San Carlos de Bariloche"
    },
    {
        lat: -41.146267,
        lng: -71.3332121,
        address: "Beschedt 1230, San Carlos de Bariloche"
    },
    {
        lat: -41.146267,
        lng: -71.3132121,
        address: "Las Nalcas 8291, San Carlos de Bariloche"
    }    
]
var points = []
export default function Mapa() {
    const [map, setMap] = React.useState(null)
    const [directions, setDirections] = React.useState(null)
    const { dataxls, tecnico, fecha, setFecha, base, setDatapedidos, setDistancia, distancia } = useAppContext()
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA-P7adlhlQfseuBcfPD0jrRRUxAY11siY"
    })
    
    const buscaPedidos = async() => {
        var id = 1
        points = []
        for (let i = 0; i < dataxls.length; i++) {
            if (base !== '' && id===1 ) {
                points.push({"id": id, "address":base})
                id = id + 1
            }
            if (tecnico === dataxls[i].TECNICOASISTIO && fecha === dataxls[i].FECHALLEGADA) {
                var newpedido = {"id": id, "address": dataxls[i].DIRECCION + "," + dataxls[i].LOCALIDAD}
                points.push(newpedido)
                id = id + 1
            }
        }
        if (base !== '') {
            points.push({"id": id, "address":base})
            id = id + 1
        }
    
        points.sort((a, b) => {
            let x = a.id
            let y = b.id
            if (x < y) { return -1}
            if (x > y) { return 1 }
            return 0
        } )
    }

    const calculateDirections = async()=>{
        if(isLoaded && points.length > 1){
            const directionService = new window.google.maps.DirectionsService()
            const waypoints = points.map((point)=>({
                location: point.address
            }))
            
            const request = {
                origin: waypoints[0].location,
                destination: waypoints[waypoints.length -1].location,
                waypoints: waypoints.slice(1, -1),
                travelMode: window.google.maps.TravelMode.DRIVING
            }

            const res = await directionService.route(request)
            if (res.status === 'OK') {
                let km = 0
                for (let i = 0; i < res.routes[0].legs.length; i++) {
                    km += res.routes[0].legs[i].distance.value /1000
                }
                setDistancia(km.toPrecision(4))
                setDirections(res)
            }
        }
    }

    useEffect(()=>{
        buscaPedidos()
        calculateDirections()
    }, [isLoaded])

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onLoad={(map)=>setMap(map)}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                {
                    directions && (
                        <DirectionsRenderer directions={directions} />
                    )
                }
                
                <></>
            </GoogleMap>
        </div>
    ) : <></>
}
