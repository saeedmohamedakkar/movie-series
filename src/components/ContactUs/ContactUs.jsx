import React from "react"
import { Link } from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import { FiInstagram } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";


function ContactUs({isDark}) {

  return (<>
    
    

<footer className={isDark? " my-5 " :" bg-light my-5  "}>
  <div className="container">
    <div className="footer-cta pt-5 pb-5">
      <div className="row">
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
            <i className="fas fa-map-marker-alt" />
            <div>
              <h4>Find us</h4>
              <span>54321, Cairo</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
            <i className="fas fa-phone" />
            <div >
              <h4>Call us</h4>
              <a className="text-decoration-none text-white" href="tel:+201095617424">+201095617424</a>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
            <i className="far fa-envelope-open" />
            <div >
              <h4>Mail us</h4>
              <a className="text-decoration-none text-white" href="mailto:saeed96mohamed@gmail.com" >saeed96mohamed@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-content pt-5 pb-5">
      <div className="row">
        <div className="col-xl-4 col-lg-4 mb-50">
          <div className="footer-widget">
            <div className="footer-logo">
           
            </div>
            <div className="footer-text">
              <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                elit,Lorem ipsum dolor sit amet.</p>
            </div>
            <div>
              <span className="mx-3">Follow us</span>
              <p className="fs-1 text-info d-inline" >< BsFacebook/></p>
              <p className="fs-1 text-danger mx-2 d-inline "> < FiInstagram/>  </p>
              <p className={isDark? "fs-1 text-light d-inline" : "fs-1 text-dark"} ><RiTwitterXFill/></p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
          <div className="footer-widget">
            <div className="">
              <h4>Useful Links</h4>
            </div>
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="#">about</Link></li>
              <li><Link to="#">services</Link></li>
              <li><Link to="https://portfolio-lac-three-15.vercel.app/" target="blanck">portfolio</Link></li>
              <li><Link to="#">Contact</Link></li>
              <li><Link to="#">About us</Link></li>
              
           
            </ul>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
          <div className="footer-widget">
         
          </div>
        </div>
      </div>
    </div>
  </div>
 
</footer>



    
  
    
    
    
    
    </>
  );
}

export default ContactUs
