import React, { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'

// style
import '../style.css'

//icons
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherShower, TiWeatherPartlySunny } from 'react-icons/ti'
import { WiHumidity } from 'react-icons/wi'
import { LuWind } from 'react-icons/lu'
import { BsArrowUpCircle } from 'react-icons/bs'
import { useAppData } from '../context/AppProvider'

function HomeRoute() {

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([])

    const { gallery } = useAppData();

    async function fetchWeather() {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=43.733422&lon=18.560291&units=metric&appid=4af5b5c76f3c71029b4239f0ea7db62f`)
            .then(res => res.json())
            .then(result => {
                setData(result)
            })
            .catch((e) => console.log(e))
    }

    const checkWeather = data.weather && data.weather[0] && data.weather[0].main

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
        fetchWeather()
    }, [lat, long]);

    return (
        <div className=''>
            <AppHeader />
            <section style={{ minHeight: 'calc(100vh - 90px)' }} className="main-section flex flex-col justify-around oveflow-hidden">
                <section style={{ minHeight: '50vh' }} className='m-3 p-3 flex items-center justify-between about-section'>
                    <div className="text-home w-1/2">
                        <h1 className='text-2xl font-semibold uppercase mb-2'>SUNSET Jahorina</h1>
                        <p className='text-sm'>Sunset na Jahorini je jedno od najmagičnijih iskustava koje možete doživeti. Kada sunce lagano tone iza planinskih vrhova, nebo poprima nijanse crvene, narandžaste i ljubičaste boje, stvarajući prelep ambijent na nebu i oko vas.<br /><br />
                            Sunset vikendica na Jahorini je savršeno pozicionirana kako biste imali privilegiju posmatranja ovog prelepog prizora iz udobnosti svog doma. Smještena blizu staze, omogućava vam ne samo brz pristup skijaškim aktivnostima tokom dana, već i fantastičan pogled na zalazak sunca u večernjim satima.
                            <br /><br />
                            Enterijer vaše vikendice je topla oaza, idealna za okupljanje sa porodicom i prijateljima. Prostrani dnevni boravak sa velikim prozorima pruža neometan pogled na planinski pejzaž, dok vas topla atmosfera kamina greje i stvara opuštajuću atmosferu. Kuhinja je potpuno opremljena, omogućavajući vam da uživate u pripremi obroka sa dragim osobama.
                            <br /><br />
                            Vikendica može primiti do 10 osoba, pružajući dovoljno prostora za udoban boravak svakog gosta. Sobe su ukusno uređene, pružajući osećaj topline i udobnosti. Sa terase ili prostranog dvorišta, imate savršen pogled na planinske vrhove i uživate u svim nijansama zalazećeg sunca.
                            <br /><br />
                            Ovo je mesto gde se priroda, luksuz i udobnost sjedinjuju, pružajući vam nezaboravan doživljaj odmora na Jahorini.
                        </p>
                    </div>
                    <div style={{ minWidth: 450 }} className="image-home w-1/2 h-full p-3 flex items-center justify-end">
                        <img style={{ minWidth: 450 }} className='w-2/3' src={require('../assets/IMG_5911.jpg')} alt="" />
                    </div>
                </section>
                <div style={{ gap: '5%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} className="weather-container flex items-center justify-evenly bg-gray-100 rounded border-2 py-4 w-2/3 mb-3">
                    {data && data.main ? (
                        <>
                            {checkWeather === "Clear" ? (
                                <h1 className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherPartlySunny size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : checkWeather === "Snow" ? (
                                <h1 className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherShower size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : checkWeather === "Rain" ? (
                                <h1 className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherDownpour size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : checkWeather === "Sunny" ? (
                                <h1 className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherCloudy size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : (
                                <h1 className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherCloudy size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            )}
                            <h1 className='font-light text-sm flex flex-col items-center gap-3'>
                                <WiHumidity size={25} /> {data.main.humidity} %
                            </h1>
                            <div className='flex flex-col gap-3 items-center'>
                                <BsArrowUpCircle size={25} style={{ rotate: `${data.wind.deg}deg` }} />
                                <h1 className='font-light text-sm flex items-center gap-2'>
                                    <LuWind size={18} /> {data.wind.speed.toFixed(0)} km/h
                                </h1>
                            </div>
                        </>
                    ) : null}

                </div>
            </section>
            <section className='p-3'>
                <h1 className='uppercase text-xl font-bold text-center mb-3'>Galerija</h1>
                <div style={{ gap: 5 }} className='galler-container flex flex-wrap justify-between'>
                    {
                        gallery.map((imgs) => {
                            return (
                                <img className='gallery-image' style={{ width: 'calc(100% / 4 - 5px)', height: 'auto' }} src={`https://sunsetapi.bio/upload/${imgs.url}`} alt="" />
                            )
                        })
                    }
                </div>
            </section>
            <section className="sunset-infos p-3">
                <h1 className='font-bold text-center uppercase text-2xl mb-2'>Informacije o vikendici</h1>
                <div className="infos-container flex gap-3">
                    <div className="info-card uppercase border-2 w-1/4 rounded">
                        <h1>Jacuzzi</h1>
                    </div>
                    <div className="info-card uppercase border-2 w-1/4 rounded">
                        <h1>Sauna</h1>
                    </div>
                    <div className="info-card uppercase border-2 w-1/4 rounded">
                        <h1>Internet</h1>
                    </div>
                    <div className="info-card uppercase border-2 w-1/4 rounded">
                        <h1>Smart TV</h1>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeRoute