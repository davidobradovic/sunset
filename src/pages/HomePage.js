import React, { useEffect, useState } from 'react'

//icons
import { AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai'
import { TbRoute } from 'react-icons/tb'
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherShower, TiWeatherPartlySunny } from 'react-icons/ti'
import { WiHumidity } from 'react-icons/wi'
import { LuWind } from 'react-icons/lu'
import { BsArrowUpCircle } from 'react-icons/bs'
import { FaPeopleRoof } from 'react-icons/fa6'
import { GiSkier } from 'react-icons/gi'

//styles
import '../styles/mainsection.css'
import { useAppData } from '../context/AppProvider'
import { Link } from 'react-router-dom'

function HomePage() {
    
    // https://api.sunsetapi.bio/upload/

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([])
    
    const { homeDetails, gallery } = useAppData()

    async function fetchWeather() {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=43.733422&lon=18.560291&units=metric&appid=4af5b5c76f3c71029b4239f0ea7db62f`)
            .then(res => res.json())
            .then(result => {
                setData(result)
            });
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
        <div>
            <section style={{ minHeight: 'calc(100vh - 80px)' }} className="main-section flex items-center relative">
                <div className="text-container w-1/2 h-full flex flex-col items-start p-4 justify-center gap-5" style={{ color: '#FFCF73', }}>
                    <div className='w-full flex flex-col gap-3'>
                        <h1 className='font-bold text-4xl uppercase'>Dobrodošli u Sunset Jahorina!</h1>
                        {
                            homeDetails.map((details) => {
                                return (
                                    <p style={{ color: 'rgba(255, 207, 115, 0.5)' }} className='text-sm w-full'>{details.aboutDescription}</p>
                                )
                            })
                        }
                    </div>
                    <div className="main-buttons py-4 w-full flex items-center gap-3">
                        <a href={homeDetails.map((m) => m.instaLink)} style={{ backgroundColor: '#FFCF73', color: '#0B1832' }} className='p-2 rounded-full' target='_blank'><AiOutlineInstagram size={30} /></a>
                        <a href={homeDetails.map((m) => m.faceLink)} style={{ backgroundColor: '#FFCF73', color: '#0B1832' }} className='p-2 rounded-full' target='_blank'><AiOutlineFacebook size={30} /></a>
                        <a href={homeDetails.map((m) => m.googleLink)} style={{ backgroundColor: '#FFCF73', color: '#0B1832' }} className='p-2 rounded-full' target='_blank'><TbRoute size={30} /></a>
                    </div>
                </div>
                <div className="image-container flex items-center justify-center w-1/2">
                    <img style={{ borderColor: '#FFCF73', width: '50%', height: 'calc(auto + 10px)', minWidth: 350 }} className='w-1/2 rounded-full border-4' src={`https://api.sunsetapi.bio/upload/${homeDetails.map((m) => m.aboutImage)}`} alt="" />
                </div>
                <div style={{ gap: '5%' }} className="weather-container flex items-center justify-center absolute bottom-10 w-full ">
                    {data && data.main ? (
                        <>
                            {checkWeather === "Clear" ? (
                                <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherPartlySunny size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : checkWeather === "Snow" ? (
                                <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherShower size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : checkWeather === "Rain" ? (
                                <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherDownpour size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : checkWeather === "Sunny" ? (
                                <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherCloudy size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            ) : (
                                <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex flex-col items-center gap-3'>
                                    <TiWeatherCloudy size={25} /> {data.main.temp.toFixed(0)} °C
                                </h1>
                            )}
                            <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex flex-col items-center gap-3'>
                                <WiHumidity size={25} /> {data.main.humidity} %
                            </h1>
                            <div className='flex flex-col gap-3 items-center'>
                                <BsArrowUpCircle color='#FFCF73' size={25} style={{ rotate: `${data.wind.deg}deg` }} />
                                <h1 style={{ color: '#FFCF73' }} className='font-light text-sm flex items-center gap-2'>
                                    <LuWind size={18} /> {data.wind.speed.toFixed(0)} km/h
                                </h1>
                            </div>
                        </>
                    ) : null}

                </div>

            </section>
            <section style={{ color: '#0B1832' }} className='p-3 bg-white'>
                <h1 className='text-center font-semibold uppercase text-xl pt-2 pb-4'>Galerija</h1>
                <div style={{ gap: 5 }} className="list-of-images flex flex-wrap justify-center">
                    {
                        gallery.map((imgs) => {
                            return (
                                <img style={{ width: 'calc(100% / 5 - 5px)', minWidth: 250, height: 'auto' }} src={`https://api.sunsetapi.bio/upload/${imgs.url}`} alt="" />
                            )
                        })
                    }
                </div>
            </section>
            <section style={{ color: '#FFCF73' }} className="informations-about-house p-3">
                <h1 className="title text-center font-bold uppercase py-3">Osnovne informacije</h1>
                <div className="list-of-informations flex items-center justify-center gap-20 py-6">
                    <div style={{ width: 150, textAlign: 'center' }} className='flex flex-col items-center gap-3 '>
                        <h1 className='flex items-center gap-2 text-sm'><FaPeopleRoof size={22} /> 10</h1>
                        <p className='text-xs'>Broj osoba koje prima nasa vikendica</p>
                    </div>
                    <div style={{ width: 150, textAlign: 'center' }} className='flex flex-col items-center gap-3'>
                        <h1 className='flex items-center gap-2 text-sm'><GiSkier size={22} /> 5 min</h1>
                        <p className='text-xs'>Udaljenost od ski staze</p>
                    </div>
                </div>
                <div className="other-addons">
                    <h1 className='text-sm uppercase font-semibold pb-4'>Dodaci Nase vikendice</h1>
                    <li className='text-sm pb-2'>Sauna</li>
                    <li className='text-sm pb-2'>Jacuzzi</li>
                    <li className='text-sm pb-2'>Internet</li>
                    <li className='text-sm pb-2'>Smart TV</li>
                </div>
            </section>
        </div>
    )
}

export default HomePage