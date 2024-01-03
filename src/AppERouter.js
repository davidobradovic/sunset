import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ModeratorRoute from './routes/ModeratorRoute';
import AuthRoute from './routes/AuthRoute';
import { useAppData } from './context/AppProvider';
import HomeRoute from './routes/HomeRoute';
import ReservationRoute from './routes/ReservationRoute';
import ContactRoute from './routes/ContactRoute';

function AppERouter() {
    const { isUserAuthed } = useAppData();


    useEffect(() => {

    }, [isUserAuthed])

    return (
        <Routes>
            <Route path='/' element={<HomeRoute />} />
            <Route path='/rezervacija' element={<ReservationRoute />} />
            <Route path='/kontakt' element={<ContactRoute />} />
            {isUserAuthed ? (
                <Route path='/moderator' element={<ModeratorRoute />} />
            ) : (
                <Route path='/moderator' element={<Navigate to='/auth' />} />
            )}
            <Route path='/auth' element={<AuthRoute />} />
        </Routes>
    );
}

export default AppERouter;
