import React from 'react'
import './footer.css'
import logo from '../../../assets/beetitlogo2.svg'

function Footer() {
  return (
    <div className='footer'>
        <div>
            <p>© 2024 Beet it, by Nacho Puerto</p>
        </div>
        <div className='footer-div'>
        <div className="footer-logo-div" >
            <div>
                <img src={logo} alt=""/>
            </div>
            <p>Just a restaurants locations and reviewsweb as a personal project.</p>
        </div>
        
        <div className="footer-social">
            <h3>follow me</h3>
            <div>

                <a href=""><i className="fa-brands fa-linkedin"></i></a>
                <a href=""><i className="fa-brands fa-github"></i></a>
                <a href="" title="Personal web"><i className="fa-brands fa-square-web-awesome"></i></a>
            </div>
        </div>
        </div>
        

    </div>
  )
}

export default Footer