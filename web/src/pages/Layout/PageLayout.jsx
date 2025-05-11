
import React from 'react'
import Jumbotron from '../../components/UI/jumbotron/jumbotron';
import "./PageLayout.css"
import Footer from '../../components/UI/Footer/Footer';

function PageLayout({ children, withJumbo, jumboTitle, jumboBackground }) {
  return (
    <div className="page-layout">
      {withJumbo && (<Jumbotron title={jumboTitle} backgroundImage={jumboBackground} />)}
      <div >{children}</div>
      <Footer></Footer>
    </div>
  )
}

export default PageLayout;