import React, { useState, useCallback, useContext } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api';
import { CenterContext } from '../context/map';
import Autocomplete from "react-google-autocomplete";


const containerStyle = {
    width: '400px',
    height: '400px'
};




const Map2 = ({ zoom }) => {
    const { center } = useContext(CenterContext)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        language: 'he'
    })

    const [points, setPoints] = useState([])

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        console.log({ zoom })
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [zoom])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <div>
            <Autocomplete
                apiKey={"AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw"}
                onPlaceSelected={(place) => {
                    console.log(place);
                }}
            />

        {isLoaded ? (

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                defaultZoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={ev => {
                    console.log("latitide = ", ev.latLng.lat());
                    console.log("longitude = ", ev.latLng.lng());
                    setPoints(prev => [...prev, { lat: ev.latLng.lat(), lng: ev.latLng.lng() }])
                }}
            >
                {points.map((p, i) => <MarkerF key={i} position={p} />)}

                <PolylineF
                    path={points}
                    geodesic={true}
                    options={{
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.75,
                        strokeWeight: 2,
                        icons: [
                            {

                                offset: "0",
                                repeat: "20px"
                            }
                        ]
                    }}
                />

                <></>
            </GoogleMap>
            ) : <></>
                }
        </div>)
}

export default Map2