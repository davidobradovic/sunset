import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ApplicationProvider, useAppData } from './context/AppProvider'
import AppERouter from './AppERouter'

function App() {


  return (
    <BrowserRouter>
      <ApplicationProvider>
        <Routes>
          <Route path='/*' element={<AppERouter />} />
        </Routes>
      </ApplicationProvider>
    </BrowserRouter>
  )
}

export default App