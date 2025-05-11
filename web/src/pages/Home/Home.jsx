import React, { useState, useEffect } from 'react';
import AutoComplete from '../../components/Google/autocomplete/AutoComplete';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../contexts/location.context';
import heroImage from '../../assets/javier-molina-L99H7JKYPVY-unsplash.jpg'
import './home.css'
import logo from '../../assets/beetitlogo2.svg';
import PageLayout from '../Layout/PageLayout';



function Home() {
  const navigate = useNavigate();
  


  const handlePlaceChange = ({ lat, lng, address }) => {
    navigate({
      pathname: '/restaurants',
      search: `?lat=${lat}&lng=${lng}&address=${address}`,
    });
  };


  

  return (
    <>
      <PageLayout>
        <div className="container-fluid hero-section">
          <div className="row align-items-center hero">
              <div className="col-md-6">
                <div className="home-text">
                    <span className='home-brand'><img src={logo}/> Beet it</span>
                    <h1 className='h1-cs'>Find your Restaurant</h1>
                    <h3>You can check locations, schedules, reviews, menus and much more!</h3>
                    <AutoComplete onPlaceChange={handlePlaceChange}/>
                </div>
              </div>
              <div className="col-md-6">
                  <div className="image-container">
                      <img src={heroImage} alt="Imagen con borde diagonal" className="img-fluid"/>
                  </div>
              </div>
          </div>

          <section className='container-fluid how-section'>
                <div className='section-title'>
                  <p>How to use Beet it</p>
                  <h4>It's that simple</h4>
                </div>
                
                <div className="how-use">
                  <div className="use-item">
                      <i className="fa-solid fa-map-location-dot"></i>
                      <div>
                        <h5>Step 1</h5>
                        <p>We will show you restaurants near you or in the area where you want to find them.</p>
                      </div>
                      
                  </div>
                  <div className="use-item">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <div>
                      <h5>Find your establishment</h5>
                    <p>Find it in our long list of establishments, know their opening hours, menus etc.</p>
                    </div>
                    
                  </div>
                  <div className="use-item">
                    <i className="fa-regular fa-star-half-stroke"></i>
                    <div>
                      <h5>Ratings and reviews</h5>
                    <p>A little description bllablabla description bllablabla</p>
                    </div>
                    
                  </div>
                </div>
          </section>
      </div>
      </PageLayout>
    </>
  );
}

export default Home;

// http://localhost:5173/restaurants?lat=40.4429407&lng=-3.66945&address=C.%20de%20Clara%20del%20Rey,%20Chamart%C3%ADn,%2028002%20Madrid,%20Espa%C3%B1ab
// http://localhost:5173/restaurants?lat=40.4422656&lng=-3.670016&address=Calle%20de%20Clara%20del%20Rey,%2022,%20Madrid,%2028002