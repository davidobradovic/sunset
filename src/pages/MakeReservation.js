import React, { useEffect, useRef, useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import '../styles/reservationpage.css'
import emailjs from '@emailjs/browser';
import axios from 'axios'
import moment from 'moment';
import { toast } from 'react-toastify';
import { TiCalendar } from 'react-icons/ti';
import { useAppData } from '../context/AppProvider';
const dayjs = require('dayjs')


function MakeReservation() {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const  [ numberOfDiffDates, setNumberOfDiffDates ] = useState(0)

    const [value, setValue] = useState({
        startDate: new Date(), // Set the initial startDate to null
        endDate: new Date(),
    });

    const { reservations } = useAppData();

    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_viliujl', 'template_ikfx4nc', formRef.current, 'FteBiTH7D2hkT6J3N')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    
    const dd = moment(checkIn)
    const da = moment(checkOut)
    const dateDifference = da.diff(dd, 'days')



    const [formData, setFormData] = useState({
        advancePayment: null,
        resName: '',
        resEmail: '',
        resPhone: '',
        resStartDate: checkIn,
        resEndDate: checkOut,
        resAdults: 0,
        resKids: 0,
        resPrice: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('advancePayment', formData.advancePayment);
        formDataToSend.append('resName', formData.resName);
        formDataToSend.append('resEmail', formData.resEmail);
        formDataToSend.append('resPhone', formData.resPhone);
        formDataToSend.append('resStartDate', formData.resStartDate);
        formDataToSend.append('resEndDate', formData.resEndDate);
        formDataToSend.append('resAdults', formData.resAdults);
        formDataToSend.append('resKids', formData.resKids);
        formDataToSend.append('resPrice', formData.resPrice);

        try {
            const response = await axios.post('https://sunsetapi.bio/reservation', formDataToSend);
            if(response) {
                toast.success('USPJESNO STE REZERVISALI SMJESTAJ!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Niste uspjeli registrovati ovo!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
        }
    };


    const getAllDatesBetweenReservations = (reservations) => {
        const allDates = [];
    
        reservations.forEach((reservation) => {
          const checkInDate = moment(reservation.resStartDate).add(1, 'day');
          const checkOutDate = moment(reservation.resEndDate).subtract(1, 'day');
    
          let currentDate = checkInDate.clone();
          while (currentDate.isSameOrBefore(checkOutDate, 'day')) {
            allDates.push(currentDate.format('YYYY-MM-DD'));
            currentDate.add(1, 'day');
          }
        });
    
        return Array.from(new Set(allDates)); // Remove duplicates using Set
      };
    


    const disabledDates = getAllDatesBetweenReservations(reservations)

    useEffect(() => {
        setNumberOfDiffDates(dateDifference);
    }, [value]);


    const isDisabledDate = (date) => {
        return disabledDates.includes(date);
    };

    const handleCheckInChange = (event) => {
        const newCheckIn = event.target.value;
        if (isDisabledDate(newCheckIn)) {
            toast.info('Molimo Vas izaberite drugi datum ovaj datum nije dostupan', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setCheckIn(''); // Reset the selected date
        } else {
            setCheckIn(newCheckIn);
            setFormData((prevData) => ({ ...prevData, resStartDate: newCheckIn }));
        }
    };

    const handleCheckOutChange = (event) => {
        const newCheckOut = event.target.value;
        if (isDisabledDate(newCheckOut)) {
            toast.info('Molimo Vas izaberite drugi datum ovaj datum nije dostupan', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setCheckOut(''); // Reset the selected date
        } else {
            setCheckOut(newCheckOut);
            setFormData((prevData) => ({ ...prevData, resEndDate: newCheckOut }));
        }
    };
    


    return (
        <div style={{ minHeight: 'calc(100vh - 80px)' }} className='flex items-center justify-center gap-10 flex-col'>
            <h1 className='font-black text-white text-xl'>NAPOMENA: DA BI VASA REZERVACIJA BILA USPJESNA TREBATE IZVRSITI UPLATU AKONTACIJE U IZNOSU OD 30%, TE ISTU IZABRATI NA PRVOM POLJU FORME</h1>
            <div style={{ backgroundColor: '#0f1e3d' }} className="mr-form w-1/2 p-3">
                <h1 className='text-white text-center text-sm font-bold pt-2 pb-4'>MAKE YOUR RESERVATION FAST</h1>
                <form action="" ref={formRef} onSubmit={handleSubmit}>
                    <input
                        className='outline-none text-white w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl mb-3'
                        type="file"
                        name="advancePayment"
                        onChange={(e) => setFormData({ ...formData, advancePayment: e.target.files[0] })}
                    />
                    <input className='outline-none text-white w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl' type='text' name="resName" id="" placeholder='Rezervacija na ime' onChange={(e) => setFormData({ ...formData, resName: e.target.value })} />
                    <input className='outline-none text-white w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl mt-3' type='tel' name="resPhone" id="" placeholder='Broj telefona' onChange={(e) => setFormData({ ...formData, resPhone: e.target.value })} />
                    <input className='outline-none text-white w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl mt-3' type='email' name="resEmail" id="" placeholder='Unesite email' onChange={(e) => setFormData({ ...formData, resEmail: e.target.value })} />
                    {/* <Datepicker
                        inputClassName='outline-none w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl text-white mt-3'
                        value={value}
                        name="date"
                        minDate={value.startDate}
                        onChange={handleValueChange}
                    /> */}
                    <div className="choose-dates flex items-center gap-2 mt-3">
                        <div className="rounded-md w-1/2">
                            <label className="block text-white text-xs p-2 rounded-xl" style={{ backgroundColor: '#0B1832' }} >
                                Check-in:
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="date"
                                        name='resStartDate'
                                        value={checkIn}
                                        onChange={handleCheckInChange}
                                        style={{ minWidth: '50%', backgroundColor: '#0B1832' }}
                                        disabled={isDisabledDate(checkIn)}
                                        className={`form-input text-xs text-white mt-1 block w-full py-2 px-3 leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 bg-white ${isDisabledDate(checkIn) ? 'date-input-disabled' : ''}`}
                                    />
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <TiCalendar className="h-6 w-6 text-gray-500" />
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="rounded-md  w-1/2">
                            <label className="block text-white text-xs p-2 rounded-xl" style={{ backgroundColor: '#0B1832' }} >
                                Check-out:
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        min={dayjs(checkIn).format('YYYY-MM-DD')}
                                        type="date"
                                        name='resEndDate'
                                        value={checkOut}
                                        onChange={handleCheckOutChange}
                                        style={{
                                            minWidth: '50%',
                                            backgroundColor: isDisabledDate(checkOut) ? '#f2f2f2' : '#0B1832', // Change background color conditionally
                                            color: isDisabledDate(checkOut) ? '#999' : '#fff', // Change text color conditionally
                                            // Add any other styles you want to customize
                                        }}
                                        disabled={isDisabledDate(checkOut)}
                                        className={`form-input text-xs text-white mt-1 block w-full py-2 px-3 leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 bg-white ${isDisabledDate(checkOut) ? 'date-input-disabled' : ''}`}
                                    />
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <TiCalendar className="h-6 w-6 text-gray-500" />
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <input className='outline-none text-white w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl mt-3' type='number' name="resAdults" id="" placeholder='Broj odraslih osoba' onChange={(e) => setFormData({ ...formData, resAdults: e.target.value })} />
                    <input className='outline-none text-white w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl mt-3' type="number" name="resKids" id="" placeholder='Broj maloljetnih osoba' onChange={(e) => setFormData({ ...formData, resKids: e.target.value })} />
                    <button style={{ backgroundColor: "#156adc" }} type='submit' className='outline-none w-full p-3 bg-transparent border-2 border-gray-700 rounded-xl mt-3 text-white'>REZERVISI | {    dateDifference ? (
        dateDifference * 250
    ).toLocaleString(void 0, { maximumFractionDigits: 2 }) : 250} EUR</button>
                </form>



            </div>
        </div>
    )
}

export default MakeReservation
