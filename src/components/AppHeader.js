import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// styles
import './header.css'
import { useAppData } from '../context/AppProvider'

//icon
import { BiMenuAltRight } from "react-icons/bi";


function AppHeader() {

  const { functionSelectNav, selectedNav } = useAppData();

  const [menuActive, setMenuActive] = useState(null);

  const menuButtons = [
    {
      title: 'Pocetna',
      url: '/'
    },
    {
      title: 'Rezervisite odmah',
      url: '/rezervacija'
    },
    {
      title: 'Kontakt',
      url: '/kontakt'
    }
  ]

  const handleMenu = () => {
    menuActive === true ? setMenuActive(null) : setMenuActive(true)
  }

  return (
    <div style={{ height: 90 }} className='header-container flex items-center justify-between p-3 relative'>
        <img style={{ width: 70 }} className='rounded-full' src={require('../assets/logo.PNG')} alt="" />
        <button onClick={handleMenu} className='menubutton p-3 bg-blue-800 text-white rounded'><BiMenuAltRight size={20} /></button>
        <nav className='flex gap-3' style={{ display: menuActive ? 'flex' : null }}>
            {
              menuButtons.map((menu, i) => {
                return (
                  <Link to={menu.url} onClick={() => functionSelectNav(i)} key={i} style={{ backgroundColor: selectedNav === i ? '#156adc' : null, color: selectedNav === i ? 'white' : null }} className={`py-3 px-5 bg-gray-100 rounded-full text-sm uppercase`}>{menu.title}</Link>
                )
              })
            }
        </nav>
    </div>
  )
}

export default AppHeader