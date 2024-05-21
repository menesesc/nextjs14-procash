import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer, DirectionsRendererProps } from '@react-google-maps/api';
import { useAppContext } from "@/app/context";

const containerStyle = {
    width: "74vw",
    height: "80vh"
};

var points: any = []
export default function Mapa() {
    const [map, setMap] = React.useState(null)
    const [directions, setDirections] = React.useState(null)
    const { dataxls, tecnico, fecha, setFecha, base, dataPedidos, setDistancia, distancia } = useAppContext()
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAP_API
    })
    
    const calculateDirections = async()=>{
        if(isLoaded && points.length > 1){
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

            const res = await directionService.route(request)
            if (res.status === 'OK') {
                let km = 0
                for (let i = 0; i < res.routes[0].legs.length; i++) {
                    km += res.routes[0].legs[i].distance.value /1000
                }
                setDistancia(km.toFixed(2))
                setDirections(res)
            }
        }
    }

    useEffect(()=>{
        var id = 1
        points = []
        for (let i = 0; i < dataPedidos.length; i++) {
            let newPoint
            if (dataPedidos[i].cliente === "BASE") {
                newPoint = {"id": id, "address": dataPedidos[i].direccion}
            } else {
                newPoint = {"id": id, "address": dataPedidos[i].cliente + ", " + dataPedidos[i].direccion + "," + dataPedidos[i].localidad + "," + dataPedidos[i].provincia}
            }
            points.push(newPoint)
            id = id + 1

        }
        calculateDirections()
    }, [dataPedidos])

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
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
