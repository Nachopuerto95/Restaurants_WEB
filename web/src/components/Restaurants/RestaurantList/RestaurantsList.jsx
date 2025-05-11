import { useEffect, useState } from 'react';
import { getRestaurants } from '../../../services/api.services';
import RestaurantItem from "../RestaurantsItem/RestaurantItem";
import "./RestaurantList.css";

function RestaurantsList({ category, limit = 6, lat, lng, reloadEnabled, onUpdateRestaurants }) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    async function fetch() {
      setIsLoading(true); // Iniciar el estado de carga
      try {
        const query = {
          limit,
          page,
          lat,
          lng,
          category
        };
        
        const { data: restaurants } = await getRestaurants(query);
        setRestaurants(restaurants);
        onUpdateRestaurants(restaurants);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); 
      }
    }
    fetch();
  }, [category, limit, lat, lng, page, reload]);

  const handleReload = () => setReload(!reload);

  return (
    <div className='d-flex flex-column gap-2'>
      {isLoading ? ( 
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="list-container">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div key={restaurant.id} className="">
                <RestaurantItem restaurant={restaurant} />
              </div>
            ))
          ) : (
            <p>No more results</p>
          )}
        </div>
      )}
      
      {reloadEnabled && (
        <button className='btn btn-sm btn-outline-secondary fw-light align-self-end' onClick={handleReload}>
          Reload
        </button>
      )}

      <div className="pagination-buttons">
        <button
          className='button'
          disabled={page <= 0}
          onClick={() => setPage(prevPage => prevPage - 1)}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>

        <button
          className='button'
          disabled={restaurants.length < limit} 
          onClick={() => setPage(prevPage => prevPage + 1)}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

RestaurantsList.defaultProps = {
  reloadEnabled: true,
  onUpdateRestaurants: () => {}
};

export default RestaurantsList;
