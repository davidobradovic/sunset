import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MakeReservation from '../pages/MakeReservation'
import ContactPage from '../pages/ContactPage'

function MainRoute() {
    return (
        <NavigationBar>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/rezervisi-odmah' element={<MakeReservation />} />
            </Routes>
        </NavigationBar>
    )
}

export default MainRoute