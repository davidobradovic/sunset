import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ApplicationProvider, useAppData } from './context/AppProvider'
import AppERouter from './AppERouter'
import lotieAnim from './assets/lotieAnim.json'
import Lottie from 'lottie-react';
import Snowfall from 'react-snowfall';

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000)
  }, [])

  return (
    <BrowserRouter>
      <ApplicationProvider>
        {
          loading ? (
            <div style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }} className='flex items-center justify-center'>
              <Lottie className='h-1/2' animationData={lotieAnim} loop={true} autoplay={true} />
            </div>
          ) : (
            <Routes>
            <Route path='/*' element={<AppERouter />} />
          </Routes>
          )
        }
      </ApplicationProvider>
    </BrowserRouter>
  )
}

export default App