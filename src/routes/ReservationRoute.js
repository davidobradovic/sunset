import React, { useState } from 'react'
import AppHeader from '../components/AppHeader'
import { Input } from '@mui/joy'
// styles
import './reservation.css'
import { DatePicker, DatePickerInput } from '@carbon/react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import axios from 'axios';


function ReservationRoute() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [formData, setFormData] = useState({
        advancePayment: null,
        resName: '',
        resEmail: '',
        resPhone: '',
        resStartDate: null,
        resEndDate: null,
        resAdults: 0,
        resKids: 0,
        resPrice: 0,
    });

    const handleDateChange = (selectedDates) => {
        const [start, end] = selectedDates;

        setFormData((prevFormData) => ({
            ...prevFormData,
            resStartDate: dayjs(start).format('YYYY-MM-DD'),
            resEndDate: dayjs(end).format('YYYY-MM-DD'),
        }));
    };

    console.log(formData)

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
            if (response) {
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

    return (
        <div>
            <AppHeader />
            <section style={{ height: 'calc(100vh - 90px)' }} className='bg-gray-200 flex items-center justify-center flex-col gap-10'>
                <div className='text-container text-center'>
                    <h1 className='font-semibold text-xl uppercase'>Rezervisite Vas smjestaj u SUNSETU</h1>
                    <p className='text-xs'>NAPOMENA: DA BI VASA REZERVACIJA BILA USPJESNA TREBATE IZVRSITI UPLATU AKONTACIJE U IZNOSU OD 30%, TE ISTU POSLATI</p>
                </div>
                <form className='reservation-form w-1/2 h-2/3 bg-gray-50 rounded flex flex-col items-center justify-center gap-4 relative' onSubmit={handleSubmit}>
                    <div className='input-container w-4/5 bg-gray-100 flex flex-col'>
                        <label className='text-xs'>Izaberite sliku akontacije</label>
                        <input
                            className='w-4/5 p-3 text-sm outline-none border-none'
                            type="file"
                            name="advancePayment"
                            onChange={(e) => setFormData({ ...formData, advancePayment: e.target.files[0] })}
                        />
                    </div>
                    <Input
                        onChange={(e) => setFormData({ ...formData, resName: e.target.value })}
                        className='w-4/5 p-3 text-sm outline-none border-none'
                        color="neutral"
                        placeholder="Unesite ime"
                        size="sm"
                        variant="soft"
                    />
                    <Input
                        onChange={(e) => setFormData({ ...formData, resPhone: e.target.value })}
                        className='w-4/5 p-3 text-sm outline-none border-none'
                        color="neutral"
                        type='number'
                        placeholder="Unesite broj"
                        size="sm"
                        variant="soft"
                    />
                    <Input
                        onChange={(e) => setFormData({ ...formData, resEmail: e.target.value })}
                        className='w-4/5 p-3 text-sm outline-none border-none'
                        color="neutral"
                        type='email'
                        placeholder="Unesite email"
                        size="sm"
                        variant="soft"
                    />
                    <DatePicker style={{ top: '5%' }} className='absolute w-fit' onChange={handleDateChange} datePickerType="range">
                        <DatePickerInput className='bg-gray-200' id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="Start date" size="md" />
                        <DatePickerInput className='bg-gray-200' id="date-picker-input-id-finish" placeholder="mm/dd/yyyy" labelText="End date" size="md" />
                    </DatePicker>
                    <div className='small-form w-4/5 flex items-center justify-between gap-3'>
                        <Input
                            onChange={(e) => setFormData({ ...formData, resAdults: e.target.value })}
                            className='w-3/5 p-3 text-sm outline-none border-none'
                            color="neutral"
                            type='number'
                            placeholder="Br. odraslih osoba"
                            size="sm"
                            variant="soft"
                        />
                        <Input
                            onChange={(e) => setFormData({ ...formData, resKids: e.target.value })}
                            className='w-3/5 p-3 text-sm outline-none border-none'
                            color="neutral"
                            type='number'
                            placeholder="Br. maloljetnih osoba"
                            size="sm"
                            variant="soft"
                        />
                    </div>
                    <button style={{ left: 10, width: 'calc(100% - 20px)', bottom: 10 }} className='absolute p-3 bg-blue-600 rounded text-white'>Potvrdi</button>
                </form>
            </section>
        </div>
    )
}

export default ReservationRoute