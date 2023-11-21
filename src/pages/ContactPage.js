import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

//icons
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
  
function ContactPage() {

  const locationURl = 'https://www.google.com/maps/dir//Obu%C4%87ina+Bare+34/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x4758bfb511328a03:0x43cf98f647096698?sa=X&ved=2ahUKEwjl-YrarK2CAxWVtqQKHWxOBbAQwwV6BAgWEAA'

  const center = {
    lat: 43.733445,
    lng: 18.560294
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyACKt4Y_oqEF7CUDVcRzJ5Cozzrwsi4jCs"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
    <div style={{  }} className='px-3'>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
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
      <div className="contact-form mt-3 w-full flex items-center pb-3">
        <div className="main-contact-details w-full h-full flex items-center flex-wrap items-center justify-center" style={{color: '#FFCF73'}}>
          <button onClick={() => window.location.href=locationURl} style={{backgroundColor: '#FFCF73', color: '#0B1832'}} className='w-full p-3 mb-3'>GO TO SUNSET</button>
          <div className="flex items-center gap-10">
          <a className='flex items-center gap-2 text-sm' href='tel:+38765651685'><AiOutlinePhone size={30} />+387 65 651 685</a>
          <a className='flex items-center gap-2 text-sm' href='mailto:brckalob@gmail.com'><AiOutlineMail size={30} />brckalob@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  ) : <></>

}

export default ContactPage