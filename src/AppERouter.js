import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainRoute from './routes/MainRoute';
import ModeratorRoute from './routes/ModeratorRoute';
import AuthRoute from './routes/AuthRoute';
import { useAppData } from './context/AppProvider';

function AppERouter() {
    const { isUserAuthed } = useAppData();


    useEffect(() => {

    }, [isUserAuthed])

    return (
        <Routes>
            <Route path='/*' element={<MainRoute />} />
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
