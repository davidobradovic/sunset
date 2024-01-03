import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeRoute from './routes/HomeRoute'
import { ApplicationProvider } from './context/AppProvider'
import ReservationRoute from './routes/ReservationRoute'
import './app.scss'
import AuthRoute from './routes/AuthRoute'
import ModeratorRoute from './routes/ModeratorRoute'
import AppERouter from './AppERouter'

function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <AppERouter />
      </BrowserRouter>
    </ApplicationProvider>
  )
}

export default App