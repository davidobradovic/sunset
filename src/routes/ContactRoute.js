import React, { useCallback, useState } from 'react'
import AppHeader from '../components/AppHeader'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// style
import '../style.css'

function ContactRoute() {

    const locationURl = 'https://www.google.com/maps/dir//Obu%C4%87ina+Bare+34/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x4758bfb511328a03:0x43cf98f647096698?sa=X&ved=2ahUKEwjl-YrarK2CAxWVtqQKHWxOBbAQwwV6BAgWEAA'

    const center = {
        lat: 43.733445,
        lng: 18.560294
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyACKt4Y_oqEF7CUDVcRzJ5Cozzrwsi4jCs"
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (
        <div>
            <AppHeader />
            <div style={{ height: 'calc(100vh - 90px)' }} className='flex items-center justify-center flex-col gap-5'>
                <GoogleMap
                    mapContainerStyle={{
                        width: '90%',
                        height: 500,
                    }}
                    center={center}
                    zoom={19}
                    onLoad={onLoad}
                    streetView={false}
                    onUnmount={onUnmount}
                    tilt={45}

                >
                    <Marker
                        icon={require('../assets/marker.png')}
                        title='Sunset Jahorina'
                        position={{
                            lat: 43.733427,
                            lng: 18.560270
                        }} />
                </GoogleMap>
                <div style={{ width: '90%', }} className="buttons-contact flex items-center justify-between gap-3">
                    <a style={{ minWidth: '33%', backgroundColor: '#156adc' }} className='p-4 rounded-full flex items-center justify-center text-white' href="tel:+38765651685">CALL US / POZOVITE NAS</a>
                    <a style={{ minWidth: '33%', backgroundColor: '#156adc' }} className='p-4 rounded-full flex items-center justify-center text-white' href="mailto:brckalob@gmail.com">EMAIL</a>
                    <a style={{ minWidth: '33%', backgroundColor: '#156adc' }} className='p-4 rounded-full flex items-center justify-center text-white' href="https://www.google.com/maps/dir//Obu%C4%87ina+Bare+36/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x4758bfb511328a03:0x7635118878340404?sa=X&ved=2ahUKEwjUrYyXgMGDAxXshv0HHRGKAMkQwwV6BAgPEAA">GOOGLE MAPS</a>
                </div>
            </div>
        </div>
    ) : <></>
}

export default ContactRoute