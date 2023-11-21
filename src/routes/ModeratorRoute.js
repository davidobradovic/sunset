import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import '../styles/adminpage.css'


//icons
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineEye, AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai'
import { CiCalendarDate } from 'react-icons/ci'
import { IoManOutline, IoPricetagOutline } from 'react-icons/io5'
import { LiaChildSolid, LiaMapSolid } from 'react-icons/lia'
import { MdDeleteOutline } from 'react-icons/md'

//components
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Calendar from '../components/Calendar';
import { useAppData } from '../context/AppProvider';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ModeratorRoute() {
  const [reservations, setReservations] = useState([])
  const { homeDetails, setHomeDetails, gallery, fetchGallery, fetchHomeDetails } = useAppData()
  const [usernameFilter, setUsernameFilter] = useState('');
  const [sortType, setSortType] = useState('startDate');

  const [formData, setFormData] = useState({
    aboutDescription: '',
    aboutImage: null,
    instaLink: '',
    faceLink: '',
    googleLink: '',
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHomeFileChange = (e) => {
    setFormData({
      ...formData,
      aboutImage: e.target.files[0],
    });
  };


  const handleImageClick = () => {
    // Trigger the file input when clicking on the displayed image
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('aboutDescription', formData.aboutDescription);
    formDataToSend.append('aboutImage', formData.aboutImage); // Change this line
    formDataToSend.append('instaLink', formData.instaLink);
    formDataToSend.append('faceLink', formData.faceLink);
    formDataToSend.append('googleLink', formData.googleLink);

    try {
      const response = await fetch('https://api.sunsetapi.bio/sunset/api/admin/put/1', {
        method: 'PUT',
        body: formDataToSend
      });

      if (response) {
        toast.success('USPJESNO STE ARZURIRALI DETALJE!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchHomeDetails()
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://api.sunsetapi.bio/gallery/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Prihvaceno', {
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
        toast.error('Neuspjesno uploadanje slike', {
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
      console.error('Error uploading image:', error);
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

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`https://api.sunsetapi.bio/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Uspjesno', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchGallery()
      } else {
        toast.error('Neuspjesno uploadanje slike', {
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
      console.error('Error deleting item:', error);
    }
  }

  const filteredReservations = reservations.filter((reservation) =>
    reservation.resName.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  const sortReservations = (reservations, sortType) => {
    switch (sortType) {
      case 'smallDate':
        return [...reservations].sort((a, b) => moment(a.resStartDate).diff(moment(b.resStartDate)));
      case 'highDate':
        return [...reservations].sort((a, b) => moment(b.resStartDate).diff(moment(a.resStartDate)));
      case 'nightsMore':
        return [...reservations].sort((a, b) => moment(b.resEndDate).diff(moment(b.resStartDate)) - moment(a.resEndDate).diff(moment(a.resStartDate)));
      case 'nightsSmall':
        return [...reservations].sort((a, b) => moment(a.resEndDate).diff(moment(a.resStartDate)) - moment(b.resEndDate).diff(moment(b.resStartDate)));
      default:
        return reservations;
    }
  };

  const sortedReservations = sortReservations(filteredReservations, sortType);

  useEffect(() => {
    fetchReservations()
    fetchGallery();
  }, [gallery, homeDetails])


  return (
    <div style={{ backgroundColor: '#0B1832', width: '100vw', minHeight: '100vh', color: 'white' }} className='p-3'>
      <h1 className='text-center py-3'>Administracija SUNSET</h1>
      <Calendar markedDates={disabledDates} />
      {/* <div className='text-black flex items-start justify-center w-full gap-3'>
        <Calendar
          className=''
          onChange={handlePrevMonthChange}
        />
        <Calendar
          className=''
          value={currentMonthDate} // Display the current month
          onChange={handleCurrentMonthChange}
        />
        <Calendar
          className=''
          onChange={handleNextMonthChange}
        />
      </div> */}
      <div className="list-of-reservations p-3  mt-3" style={{ backgroundColor: '#0f1e3d' }}>
        <div className="header-lor overflow-auto flex items-center justify-between gap-5">
          <h1 className='text-sm'>Rezervacije</h1>
          <div className="actions flex items-center gap-2">
            <input onChange={(e) => setUsernameFilter(e.target.value)} className='p-2 text-xs outline-none' type='text' name="" id="" placeholder='Pretrazite rezervaciju po osobi' style={{ backgroundColor: '#132547', minWidth: 200 }} />
            <select onChange={(e) => setSortType(e.target.value)} style={{ backgroundColor: '#132547' }} className='p-2 text-xs outline-none' name="" id="">
              <option value="" selected disabled>Sortiraj po</option>
              <option value="smallDate">Datum: Prvi - Poslednji</option>
              <option value="highDate">Datum: Poslednji - Prvi</option>
              <option value="nightsMore">Broj noci: Veci - Manji</option>
              <option value="nightsSmall">Broj noci: Manji - Veci</option>
            </select>
            <Link to='/rezervisi-odmah' style={{ backgroundColor: '#132547', minWidth: 150 }} className='p-2 text-xs outline-none'>Dodaj rezervaciju</Link>
          </div>
        </div>
        <div className={`list flex flex-col gap-3 overflow-auto ${reservations.length >= 1 ? 'mt-3' : null}`} style={{ backgroundColor: '#132547', maxHeight: 500, overflow: 'auto' }}>
          {
            sortedReservations ? sortedReservations.map((reservation) => {
              return (
                <div className="reservation-card p-3 flex items-center justify-between" style={{ backgroundColor: '#132547', minWidth: '100%' }}>
                  <h1 style={{ width: 'calc(100% / 8)', minWidth: 230 }} className='p-2 text-sm uppercase font-semibold'>Rezervacija za: {moment(reservation.resStartDate).format('DD.MM.YYYY')}</h1>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 230 }} className='p-2 flex text-xs items-center gap-2'><CiCalendarDate size={21} /> {moment(reservation.resStartDate).format('DD.MM.YYYY')} - {moment(reservation.resEndDate).format('DD.MM.YYYY')}</h3>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 230 }} className='p-2 flex text-xs items-center gap-2'><AiOutlineUser size={21} /> {reservation.resName}</h3>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 230 }} className='p-2 flex text-xs items-center gap-2'><AiOutlineMail size={21} /> {reservation.resEmail}</h3>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 150 }} className='p-2 flex text-xs items-center gap-2'><AiOutlinePhone size={21} /> {reservation.resPhone}</h3>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 65 }} className='p-2 flex text-xs items-center gap-2'><IoManOutline size={21} /> {reservation.resAdults}</h3>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 65 }} className='p-2 flex text-xs items-center gap-2'><LiaChildSolid size={21} /> {reservation.resKids}</h3>|
                  <h3 style={{ width: 'calc(100% / 8)', minWidth: 150 }} className='p-2 flex text-xs items-center gap-2'><IoPricetagOutline size={21} /> {
                    (moment(reservation.resEndDate).diff(moment(reservation.resStartDate), 'days') * 250).toLocaleString(void 0, { maximumFractionDigits: 2 })
                  } EUR</h3>|
                  <a href={`https://api.sunsetapi.bio/upload/${reservation.advancePayment}`} target='_blank' className='p-2 rounded-full bg-white mx-3'><AiOutlineEye color='#132547' size={22} /></a>
                </div>
              )
            }) : null
          }
        </div>
      </div>
      <div className="homepage-details p-3  mt-3" style={{ backgroundColor: '#0f1e3d' }}>
        <div className="header-hd mb-3 flex items-center justify-between">
          <h1 className='text-sm'>Pocetna stranica detalji</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="main-details flex items-center gap-3 mb-3">
            <textarea style={{ backgroundColor: '#0B1832', height: 300 }} className='text-sm text-white outline-none p-3 w-5/6' name='aboutDescription' onChange={handleChange} defaultValue={homeDetails.map((m) => m.aboutDescription)} />
            <input
              type="file"
              name="aboutImage"
              id="fileInput"
              hidden
              onChange={handleHomeFileChange}
            />
            <img onClick={handleImageClick} style={{ height: 300, cursor: 'pointer', pointerEvents: 'auto', userSelect: 'auto' }} src={`https://api.sunsetapi.bio/upload/${homeDetails.map((m) => m.aboutImage)}`} alt="" />
          </div>
          <div className="links flex items-center mb-3 gap-3">
            <div style={{ backgroundColor: '#0B1832', width: 'calc(100% / 3)' }} className="link-card instaLink flex items-center gap-2 p-3">
              <AiOutlineInstagram size={25} />
              <input onChange={handleChange} name='instaLink' className='bg-transparent w-full outline-none' type="text" id="" defaultValue={homeDetails.map((m) => m.instaLink)} />
            </div>
            <div style={{ backgroundColor: '#0B1832', width: 'calc(100% / 3)' }} className="link-card instaLink flex items-center gap-2 p-3">
              <AiOutlineFacebook size={25} />
              <input onChange={handleChange} name='faceLink' className='bg-transparent w-full outline-none' type="text" id="" defaultValue={homeDetails.map((m) => m.faceLink)} />
            </div>
            <div style={{ backgroundColor: '#0B1832', width: 'calc(100% / 3)' }} className="link-card instaLink flex items-center gap-2 p-3">
              <LiaMapSolid size={25} />
              <input onChange={handleChange} name='googleLink' className='bg-transparent w-full outline-none' type="text" id="" defaultValue={homeDetails.map((m) => m.googleLink)} />
            </div>
          </div>
          <button type='submit' className='w-full bg-blue-400 font-semibold text-black p-3'>SACUVAJ</button>
        </form>

      </div>
      <div className="gallery p-3 mt-3 flex flex-col" style={{ backgroundColor: '#0f1e3d' }}>
        <div className="w-full header-hd mb-3 flex items-center justify-between">
          <h1 className='text-sm'>Galerija</h1>
        </div>
        <div style={{ gap: 5 }} className="list-of-images flex flex-wrap justify-center relative mb-3">
          {
            gallery.map((imgs) => {
              return (
                <div style={{ width: 'calc(100% / 5 - 5px)', maxHeight: 250, backgroundColor: '#132547' }} className='relative flex items-center justify-center'>
                  <img className='h-full' src={`https://api.sunsetapi.bio/upload/${imgs.url}`} alt="" />
                  <button onClick={() => deleteImage(imgs.id)} style={{ width: 30, height: 30 }} className='absolute top-2 right-2 bg-blue-900 text-white flex items-center justify-center'><MdDeleteOutline size={20} /></button>
                </div>
              )
            })
          }
        </div>
        <form action="" onSubmit={handleFormSubmit}>
          <input className='w-full p-3 bg-blue-900 mb-3' onChange={handleFileChange} type="file" name="" id="" />
          <button type='submit' className='w-full bg-blue-400 p-3'>Objavi sliku</button>
        </form>
      </div>
    </div>
  );
}

export default ModeratorRoute;
