import React from 'react'
import Navbar from '../../components/UI/Navbar/Navbar'

function Layout({children}) {
  return (
    <>
        <div className='page-layout'>
            
            <div>{children}</div>
        
        </div>
    </>
    
  )
}

export default Layout