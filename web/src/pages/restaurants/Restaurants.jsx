import { useSearchParams } from 'react-router-dom';
import RestaurantsList from '../../components/Restaurants/RestaurantList/RestaurantsList';
import AutocompleteInput from '../../components/Google/autocomplete/AutoComplete';
import Map from '../../components/Google/map/map';
import { useState } from 'react';
import PageLayout from '../Layout/PageLayout';
import "./Restaurants.css"

function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');


  const handlePlaceChange = ({ lat, lng, address }) => {
    setSearchParams({
      lat,
      lng,
      address
    });
    setPage(0);
  }

  const handleRestaurantsUpdate = (restaurants) => {
    const locations = restaurants.map(({ name, location }) => ({
      title: name,
      lat: location[0],
      lng: location[1]
    }))
    setLocations(locations);
  }

  return (
    <PageLayout withJumbo={true} jumboTitle={address}>
      <div className='page-container'>
          
          <div className='restaurants-container'>
              <AutocompleteInput className="mb-3" onPlaceChange={handlePlaceChange} />
              <RestaurantsList  limit={6} page={0} lat={lat} lng={lng} reloadEnabled={false} onUpdateRestaurants={handleRestaurantsUpdate}/>
            
          </div>
        
        <Map className="res-map" center={{ lat: parseFloat(lat), lng: parseFloat(lng) }} markers={locations} />

      </div>
    </PageLayout>
  )
}

export default Restaurants