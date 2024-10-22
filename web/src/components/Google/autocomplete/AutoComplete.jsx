import React, { useEffect } from 'react';
import { useRef } from 'react';

function AutoComplete({className, onPlaceChange, initialAddress}) {
    const autocompleteInputRef = useRef();
    const madridBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.312, -3.888), 
        new google.maps.LatLng(40.641, -3.517)  
      );
    const autocompleteOptions = {
        bounds: madridBounds,
        componentRestrictions: { country: "es" },
        type: ['address'],
        strictBounds: true, // Para que solo muestre resultados dentro de los límites de Madrid

      };

    useEffect(() => {

          const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, autocompleteOptions);
          window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.geometry?.location) {
                const location = {
                    lat: place.geometry.location.lat(), 
                    lng: place.geometry.location.lng(), 
                    address: place.formatted_address 
                };
                onPlaceChange(location);
            };
          });

          return () => {
            window.google.maps.event.clearListeners(autocomplete, 'place_changed');
          }

    }, [])


 const handleSearch = () => {
    onPlaceChange(initialAddress)
 }

  return (
    <div className={`form-floating mb-3 ${className}`}>
        <input ref={autocompleteInputRef} type="text" className="form-control" id="autocompleteInput" placeholder='' />
        <label htmlFor="autocompleteInput">
        {initialAddress ? `${initialAddress.address}` : 'Enter an address here'}
        
        
        
        </label>
        {initialAddress && (
        <>
           <button onClick={handleSearch}>Search</button>
        </>
        )}
        
    </div>
  )
}

AutoComplete.defaultProps = {
    classname: '',
    onPlaceChange: (location) => console.debug(location)
}

export default AutoComplete