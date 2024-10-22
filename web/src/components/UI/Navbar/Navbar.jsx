import React, { useContext } from 'react';
import AuthContext from '../../../contexts/auth.context';
import { NavLink, useLocation } from 'react-router-dom';
import "./Navbar.css";
import beetitlogo from '../../../assets/beetitlogo1.svg'

const renderNavLinkActive = ({isActive}) => isActive ? 'nav-link active' : 'nav-link';

function Navbar() {

  const {user, doLogout} = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo / Brand */}
        
        <NavLink className={renderNavLinkActive} to="/"> 
         <span className='navbar-brand'> 
         {location.pathname !== '/' && (
          <i className="fa-solid fa-chevron-left"></i>
          )}
          
          <img src={beetitlogo} alt="" /> Beet it</span></NavLink>
        
        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li>
              <NavLink className={renderNavLinkActive} to="/">
                <i className="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink className={renderNavLinkActive} to="/community">
                <i className="fa-solid fa-comments"></i> Community
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav secondary-nav-btns ms-auto">
            {!user && (
              <>
                <li>
                  <NavLink className={`button base-btn button-type2 ${renderNavLinkActive}`} to="/Login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className={`button base-btn button-type1 ${renderNavLinkActive}`} to="/Register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <button onClick={doLogout} className="btn btn-link">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>  
    </nav>
  );
}

export default Navbar;