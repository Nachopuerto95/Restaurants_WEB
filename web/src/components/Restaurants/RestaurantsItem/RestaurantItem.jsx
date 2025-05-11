import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RestaurantItem.css"
import logoProfile from "../../../assets/beetitlogoprofile.svg"

function RestaurantItem({ restaurant }) {
    const now = new Date();
    const roundedRating = Math.round(restaurant.rating);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = daysOfWeek[now.getDay()];
    const todayHoursText = restaurant.opening_hours?.weekday_text?.find((text) => text.includes(today)) || "No hours available";
    const [isExpanded, setIsExpanded] = useState(false);


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    
    const isOpen = (restaurant) => {
        
        const currentDay = now.getDay();
        const currentTime = now.getHours() * 100 + now.getMinutes();

        const periodsForToday = restaurant.opening_hours?.periods?.filter(period => period.open.day === currentDay) || [];

        // Verificamos si periodsForToday es un array
        if (!Array.isArray(periodsForToday) || periodsForToday.length === 0) {
            return false; 
        }

        for (let period of periodsForToday) {
            const openTime = parseInt(period.open.time, 10);
            const closeTime = parseInt(period.close.time, 10);

            if ((openTime <= currentTime && currentTime < closeTime) ||
                (openTime <= currentTime || currentTime < closeTime && closeTime < openTime)) {
                return true;
            }
        }

        return false;
    };

    const isCurrentlyOpen = isOpen(restaurant);
    const openStatus = isCurrentlyOpen ? "Open" : "Closed";

    return (
        <div className="rest-item">
            <div className="rest-info">
                <div className="rest-title">
                    <img
                        src={restaurant.icon ? restaurant.icon : logoProfile}
                        style={{
                            filter: "grayscale(100%) brightness(190%)"
                        }}
                    />
                    <h5 className="card-title mb-2">{restaurant.name}</h5>
                </div>

                <div className="rest-ratings-div">
                    <p>{restaurant.rating}</p>
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => (
                            <i
                                className="fa-solid fa-star"
                                key={index}
                                style={{ color: index < roundedRating ? "rgb(241, 188, 42)" : "rgb(204, 204, 204)" }}
                            />
                        ))}
                    </div>
                    <p>{`(${restaurant.user_ratings_total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")})`}</p>
                    <div className="star-rating">
                        {[...Array(3)].map((_, index) => (
                            <i
                                className="fa-solid fa-euro-sign"
                                key={index}
                                style={{ color: index < restaurant?.price_level ? "rgb(110, 110, 110)" : "rgb(204, 204, 204)" }}
                            />
                        ))}
                    </div>
                </div>
                <div className="rest-schedule">
                    <p 
                        className="isOpen" style={{ 
                        display: todayHoursText === "No hours available" ? 'none' : '',
                        color: isCurrentlyOpen ? "rgb(79, 143, 19)" : "#FA5843", 
                        fontWeight: '600' 
                    }}>{ openStatus}</p>
                    <p>{todayHoursText}</p>
                </div>
                <p>{restaurant.vicinity}</p>

                

            </div>
            
            <div className="img-container">
                <img 
                    src={restaurant.photos && restaurant.photos[0] ? restaurant.photos[0] : logoProfile} 
                    className="rest-img" 
                    alt={restaurant.name} 
                />
            </div>
            <div className="review-prev">
                {restaurant.reviews[0] && (
                    <>
                        
                        <div className="review-user">
                            <img src={restaurant.reviews[0].profile_photo_url ? (restaurant.reviews[0].profile_photo_url ) : (logoProfile)} alt="" />
                            <p>{restaurant.reviews[0].author_name}</p>
                            <p><strong>Rating: </strong> {restaurant.reviews[0].rating} 
                            <i
                                className="fa-solid fa-star"
                                style={{ color: "rgb(241, 188, 42)", marginLeft: "3px"}}
                            /></p>
                        </div>
                        <p className="review-prev-text">
                {isExpanded 
                    ? restaurant.reviews[0].text 
                    : `${restaurant.reviews[0].text.slice(0, 90)} ${restaurant.reviews[0].text.length > 80 ? '...' : ''} `}
                    
                                            

                
                {restaurant.reviews[0].text.length > 90 && !isExpanded && (
                    <button
                        className="readmore-btn"
                        onClick={toggleExpand} 
                    >
                        Read more
                    </button>
                )}
                {restaurant.reviews[0].text.length > 90 && isExpanded && (
                    <button
                        className="readmore-btn"
                        onClick={toggleExpand} 
                    >
                        Show less
                    </button>
                )}
            </p>

                    </>
                    
                )}
            </div>
            <div className="rest-links">
                    {restaurant.website && (
                        <Link to={restaurant.website} title="Place Website"> <i className="fa-solid fa-link"></i></Link>
                    )}
                        <Link to={`/restaurants/${restaurant.id}`} title="More info" className=""><i className="fa-regular fa-question"></i></Link>
            </div>
        </div>
    );
}

export default RestaurantItem;
