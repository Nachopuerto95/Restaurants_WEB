import React, { useEffect, useRef, useState } from 'react';
import './autocomplete.css';
import { useLocation } from '../../../contexts/location.context';
import { getFormattedAddress } from '../../../services/api.services'


function AutoComplete({ className, onPlaceChange }) {

    const [restaurants, setRestaurants] = useState(null); 
    const [latitude, setLatitude] = useState(null);  
    const [longitude, setLongitude] = useState(null); 
    const [location, setLocation] = useState(null); 
    const { initialAddress, setInitialAddress } = useLocation(); 

    const autocompleteService = useRef(null); 
    const autocompleteInputRef = useRef(null);
    const containerRef = useRef(null); 
    const [value, setValue] = useState(initialAddress ? initialAddress?.address : "");
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    
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
            setInitialAddress({ address, lat, lng });
        } catch (error) {
          console.error('Error al obtener la dirección formateada:', error);
        }
      };

    useEffect(() => {
        if (!autocompleteService?.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }

        // Manejar clics fuera del componente para cerrar el dropdown
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
    if (initialAddress?.address) {
        setValue(initialAddress.address);
    }
}, [initialAddress]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        if (inputValue && autocompleteService.current) {
            autocompleteService.current.getPlacePredictions(
                {
                    input: inputValue,
                    location: new window.google.maps.LatLng(40.4168, -3.7038), 
                    radius: 10000, 
                    componentRestrictions: { country: 'es' },
                    types: ['address'], 
                },
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setSuggestions(predictions);
                    } else {
                        setSuggestions([]);
                    }
                }
            );
        } else {
            setSuggestions([]);
        }
        setDropdownVisible(true);
    };

    const handleLocationClick = (suggestion) => {
      setDropdownVisible(false);
              onPlaceChange(suggestion);
  
  };


    const handleSuggestionClick = (suggestion) => {
        
        setDropdownVisible(false);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: suggestion.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                    address: results[0].formatted_address,
                };
                setValue(location.address); 
                onPlaceChange(location);
            }
        });
    };

    return (
        <div ref={containerRef} className={`form-floating mb-3 ${className} search-bar-container`}>
            <input
                ref={autocompleteInputRef}
                type="text"
                className="search-bar "
                value={value}
                onChange={handleInputChange}
                onFocus={() => setDropdownVisible(true)}
                placeholder="Introduce a location"
            />
            
            <button
                    className="rounded-btn"
                    type="button"
                    disabled={!value} // Deshabilita el botón si no hay valor en el input
                    onClick={() => handleLocationClick(initialAddress)}
                >   <i className="fa-solid fa-magnifying-glass"></i>
                    Search
                </button>
         
            {isDropdownVisible &&  (
              <div className='results-dropdown'>
              

              {initialAddress?.address && (
                <>
                  <h5>Your location:</h5>
                    <div
                    className="pac-item ubi-item"
                    onClick={() => handleLocationClick(initialAddress)} >
                    {initialAddress.address}
                  </div>
                </>

              )}
                          
              {suggestions.length > 0 && (
                <>
                  <h5>Adress search:</h5>
                  <div className="pac-container">
                      {suggestions.map((suggestion) => (
                          <div
                              key={suggestion.place_id}
                              className="pac-item"
                              onClick={() => handleSuggestionClick(suggestion)}
                          >
                              {suggestion.description}
                          </div>
                      ))}
                  </div>
                  </>
              )}
                
                </div>
            )}
        </div>
    );
}



export default AutoComplete;
