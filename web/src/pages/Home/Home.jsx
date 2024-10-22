import React, { useState, useEffect } from 'react';
import AutoComplete from '../../components/Google/autocomplete/AutoComplete';
import { useNavigate } from 'react-router-dom';
import { getFormattedAddress } from '../../services/api.services';

function Home() {
  const [restaurants, setRestaurants] = useState(null); 
  const [latitude, setLatitude] = useState(null);  
  const [longitude, setLongitude] = useState(null); 
  const [location, setLocation] = useState(null); 

  const navigate = useNavigate();
  


  const handlePlaceChange = ({ lat, lng, address }) => {
    navigate({
      pathname: '/restaurants',
      search: `?lat=${lat}&lng=${lng}&address=${address}`,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLatitude(lat);
          setLongitude(lng);
          handleAddress(lat, lng)
          
          
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
    }
  }, []); 

  const handleAddress = async (lat, lng) => {
    try {
      const data = await getFormattedAddress(lat, lng);  
      const newAddress = data.results[0]
      const address = `${
          newAddress.address_components[1].long_name + ', ' +
          newAddress.address_components[0].long_name + ', ' +
          newAddress.address_components[3].long_name + ', ' +
          newAddress.address_components[7].long_name
        }`
        setLocation({
          address,
          lat,      
          lng       
        });

    } catch (error) {
      console.error('Error al obtener la dirección formateada:', error);
    }
  };

  return (
    <div>
      <h1>Find your Restaurant</h1>
      <h3>You can check locations, schedules, reviews, menus and much more!</h3>
      <AutoComplete onPlaceChange={handlePlaceChange} initialAddress={location}/>

      
    </div>
  );
}

export default Home;

// http://localhost:5173/restaurants?lat=40.4429407&lng=-3.66945&address=C.%20de%20Clara%20del%20Rey,%20Chamart%C3%ADn,%2028002%20Madrid,%20Espa%C3%B1ab
// http://localhost:5173/restaurants?lat=40.4422656&lng=-3.670016&address=Calle%20de%20Clara%20del%20Rey,%2022,%20Madrid,%2028002