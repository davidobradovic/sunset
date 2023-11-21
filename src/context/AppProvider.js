import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const ApplicationProvider = ({ children }) => {

    const [selectedNav, setSelectedNav] = useState(0)
    const [selectedSubNav, setSelectedSubNav] = useState(null)
    const [homeDetails, setHomeDetails] = useState([])
    const [reservations, setReservations] = useState([])
    const [gallery, setGallery] = useState([])
    const [ isUserAuthed, setIsUserAuthed ] = useState(null)

    async function fetchHomeDetails() {
        await fetch('https://api.sunsetapi.bio/sunset/api/admin')
            .then((res) => res.json())
            .then((response) => {
                setHomeDetails(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function fetchReservations() {
        await fetch('https://api.sunsetapi.bio/reservation/')
            .then((res) => res.json())
            .then((response) => {
                setReservations(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function fetchGallery() {
        await fetch('https://api.sunsetapi.bio/gallery/')
            .then((res) => res.json())
            .then((response) => {
                setGallery(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const functionSelectNav = (i) => {
        setSelectedNav(i)
        setSelectedSubNav(null)
    }

    const functionSelecSubtNav = (i) => {
        setSelectedSubNav(i)
    }



    useEffect(() => {
        fetchHomeDetails()
        fetchReservations()
        fetchGallery()
    }, []);

    return (
        <AppContext.Provider value={{
            selectedNav,
            functionSelectNav,
            functionSelecSubtNav,
            selectedSubNav,
            homeDetails,
            reservations,
            setHomeDetails,
            setReservations,
            gallery,
            fetchGallery,
            fetchHomeDetails,
            setIsUserAuthed,
            isUserAuthed

        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = () => {
    return useContext(AppContext);
};
