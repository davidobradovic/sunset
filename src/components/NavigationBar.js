
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai'
import { TbRoute } from 'react-icons/tb'
import { CgMenuRight } from 'react-icons/cg'

// ... (your icon imports)

function NavigationBar({ children }) {

    const [ navOpened, setNavOpened ] = useState(null)

    const navHandle = () => {
        navOpened === true ? setNavOpened(null) : setNavOpened(true)
    }


    return (
        <div style={{ backgroundColor: '#0B1832' }} className='page-screen'>
            <div style={{ height: 80 }} className="navigation-bar p-3 text-white flex items-center justify-around">
                <Link to='/'><img style={{ width: 50, height: 50 }} src={require('../assets/logo.PNG')} alt="" /></Link>
                <nav style={navOpened === true ? { left: '0%' } : null} className='flex items-center gap-10 uppercase text-xs'>
                    <Link to='/'>Pocetna</Link>
                    <Link to='/contact'>Kontakt</Link>
                    <Link to='/rezervisi-odmah' className='font-bold'>Rezervisite ODMAH</Link>
                </nav>
                <button style={{ backgroundColor: '#0f1e3d', width: 40, height: 40, color: '#FFCF73', borderColor: '#FFCF73' }} className='menu-button absolute right-5 rounded border-2 flex items-center justify-center' onClick={navHandle}><CgMenuRight style={{ marginLeft: 7.5 }} size={20} /></button>
            </div>
            <main className='main-container'>
                {children}
            </main>
            <footer className='p-1'>
                <h1 className='text-sm text-gray-400'>website creator: <a href="https://www.instagram.com/__dado__777">Compas DAVID</a></h1>
            </footer>
        </div>
    );
}

export default NavigationBar;
