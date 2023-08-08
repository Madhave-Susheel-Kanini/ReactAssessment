import React from 'react'

import footerBg from './assets/images/footer-bg.png';
import navlogo from './assets/images/MajesticTourism.png'

import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin, IoLogoGoogle } from 'react-icons/io5';


function Footer() {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${footerBg})` }}>
        <div className="container">

          <div className="footer-top">

            <ul className="footer-list">

              <li>
                <p className="footer-list-title">Top destination</p>
              </li>

              <li>
                <a href="#" className="footer-link">Indonesia, Jakarta</a>
              </li>

              <li>
                <a href="#" className="footer-link">Maldives, Malé</a>
              </li>

              <li>
                <a href="#" className="footer-link">Australia, Canberra</a>
              </li>

              <li>
                <a href="#" className="footer-link">Thailand, Bangkok</a>
              </li>

              <li>
                <a href="#" className="footer-link">Morocco, Rabat</a>
              </li>

            </ul>

            <ul className="footer-list">

              <li>
                <p className="footer-list-title">Categories</p>
              </li>

              <li>
                <a href="#" className="footer-link">Travel</a>
              </li>

              <li>
                <a href="#" className="footer-link">Lifestyle</a>
              </li>

              <li>
                <a href="#" className="footer-link">Fashion</a>
              </li>

              <li>
                <a href="#" className="footer-link">Education</a>
              </li>

              <li>
                <a href="#" className="footer-link">Food & Drink</a>
              </li>

            </ul>

            <ul className="footer-list">

              <li>
                <p className="footer-list-title">Quick links</p>
              </li>

              <li>
                <a href="#" className="footer-link">About</a>
              </li>

              <li>
                <a href="#" className="footer-link">Contact</a>
              </li>

              <li>
                <a href="#" className="footer-link">Tours</a>
              </li>

              <li>
                <a href="#" className="footer-link">Booking</a>
              </li>

              <li>
                <a href="#" className="footer-link">Terms & Conditions</a>
              </li>

            </ul>

            <div className="footer-list">

              <p className="footer-list-title">Get a newsletter</p>

              <p className="newsletter-text">
                For the latest deals and tips, travel no further than your inbox
              </p>


            </div>

          </div>

          <div className="footer-bottom">

          <img style={{width: '15%'}} src={navlogo}></img>

            <p className="copyright">
              &copy; 2023 <a href="#" className="copyright-link">KANINI</a>. All Rights Reserved
            </p>

            <ul className="social-list">

              <li>
                <a href="#" className="social-link">
                  <IoLogoFacebook />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <IoLogoTwitter />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <IoLogoInstagram />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <IoLogoLinkedin />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <IoLogoGoogle />
                </a>
              </li>

            </ul>

          </div>

        </div>
      </footer>
  )
}

export default Footer