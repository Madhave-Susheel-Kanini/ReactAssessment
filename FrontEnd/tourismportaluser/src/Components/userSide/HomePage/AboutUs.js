import React from 'react'
import { IoCompass, IoBriefcase, IoUmbrella } from 'react-icons/io5';
import aboutimg from './assets/images/TourismImage.png'

function AboutUs() {
  return (
    <section className="section about">
            <div className="container">

              <div className="about-content">

                <p className="section-subtitle">About Us</p>

                <h2 className="h2 section-title">Explore all tour of the world with us.</h2>

                <p className="about-text">
                Embark on Global Adventures with Us.
                </p>

                <ul className="about-list">

                  <li className="about-item">

                    <div className="about-item-icon">
                      <IoCompass />
                    </div>

                    <div className="about-item-content">
                      <h3 className="h3 about-item-title">Tour guide</h3>

                      <p className="about-item-text">
                      Embark on journeys led by our seasoned tour guides, Feel free to contact us!
                      </p>
                    </div>

                  </li>

                  <li className="about-item">

                    <div className="about-item-icon">
                      <IoBriefcase />
                    </div>

                    <div className="about-item-content">
                      <h3 className="h3 about-item-title">Friendly price</h3>

                      <p className="about-item-text">
                        Our adventures offer exceptional value without altering quality.
                      </p>
                    </div>

                  </li>

                  <li className="about-item">

                    <div className="about-item-icon">
                      <IoUmbrella />
                    </div>

                    <div className="about-item-content">
                      <h3 className="h3 about-item-title">Reliable tour</h3>

                      <p className="about-item-text">
                        Our unwavering commitment to dependable tours ensures authentic and memorable experiences.
                      </p>
                    </div>

                  </li>

                </ul>

                <a href="/tour" className="btn btn-primary">Book Now</a>

              </div>

              <figure className="about-banner">
                <img src={aboutimg} width="756" height="842" loading="lazy" alt="" className="w-100" />
              </figure>

            </div>
          </section>
  )
}

export default AboutUs