import React from 'react'
import popular1 from './assets/images/popular-1.jpg';

import blog2 from './assets/images/blog-2.jpg';
import blog3 from './assets/images/blog-3.jpg';
import authoravathar from './assets/images/author-avatar.png'

import { IoArrowForwardOutline } from 'react-icons/io5';


function Blog() {
    return (
        <section className="section blog">
            <div className="container">

                <p className="section-subtitle">Our Testimonials</p>

                <h2 className="h2 section-title">and Feedback</h2>

                <ul className="blog-list">

                    <li>
                        <div className="blog-card">

                            <figure className="card-banner">

                                <a href="#">
                                    <img src={popular1} width="740" height="518" loading="lazy"
                                        alt="A good traveler has no fixed plans and is not intent on arriving." className="img-cover" />
                                </a>

                                <span className="card-badge">
                                    <ion-icon name="time-outline"></ion-icon>

                                    <time dateTime="12-04">04 Dec</time>
                                </span>

                            </figure>

                            <div className="card-content">

                                <div className="card-wrapper">

                                    <div className="author-wrapper">
                                        <figure className="author-avatar">
                                            <img src={authoravathar} width="30" height="30" alt="Jony bristow" />
                                        </figure>

                                        <div>
                                            <a href="#" className="author-name">Miles Oliver</a>

                                            <p className="author-title">Admin</p>
                                        </div>
                                    </div>

                                    <time className="publish-time" dateTime="10:30">10:30 AM</time>

                                </div>

                                <h3 className="card-title">
                                    <a href="#">
                                        A good traveler has no fixed plans and is not intent on arriving.
                                    </a>
                                </h3>

                                {/* <a href="#" className="btn-link">
                                    <span>Read More</span>

                                    <IoArrowForwardOutline aria-hidden="true" />
                                </a> */}

                            </div>

                        </div>
                    </li>

                    <li>
                        <div className="blog-card">

                            <figure className="card-banner">

                                <a href="#">
                                    <img src={blog2} width="740" height="518" loading="lazy"
                                        alt="A good traveler has no fixed plans and is not intent on arriving." className="img-cover" />
                                </a>

                                <span className="card-badge">
                                    <ion-icon name="time-outline"></ion-icon>

                                    <time dateTime="12-04">04 Dec</time>
                                </span>

                            </figure>

                            <div className="card-content">

                                <div className="card-wrapper">

                                    <div className="author-wrapper">
                                        <figure className="author-avatar">
                                            <img src={authoravathar} width="30" height="30" alt="Jony bristow" />
                                        </figure>

                                        <div>
                                            <a href="#" className="author-name">John Briston</a>

                                            <p className="author-title">Admin</p>
                                        </div>
                                    </div>

                                    <time className="publish-time" dateTime="10:30">10:30 AM</time>

                                </div>

                                <h3 className="card-title">
                                    <a href="#">
                                        A good traveler has no fixed plans and is not intent on arriving.
                                    </a>
                                </h3>

                                {/* <a href="#" className="btn-link">
                                    <span>Read More</span>

                                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                                </a> */}

                            </div>

                        </div>
                    </li>

                    <li>
                        <div className="blog-card">

                            <figure className="card-banner">

                                <a href="#">
                                    <img src={blog3} width="740" height="518" loading="lazy"
                                        alt="A good traveler has no fixed plans and is not intent on arriving." className="img-cover" />
                                </a>

                                <span className="card-badge">
                                    <ion-icon name="time-outline"></ion-icon>

                                    <time dateTime="12-04">04 Dec</time>
                                </span>

                            </figure>

                            <div className="card-content">

                                <div className="card-wrapper">

                                    <div className="author-wrapper">
                                        <figure className="author-avatar">
                                            <img src={authoravathar} width="30" height="30" alt="Jony bristow" />
                                        </figure>

                                        <div>
                                            <a href="#" className="author-name">Marco Gonzalez</a>

                                            <p className="author-title">Admin</p>
                                        </div>
                                    </div>

                                    <time className="publish-time" dateTime="10:30">10:30 AM</time>

                                </div>

                                <h3 className="card-title">
                                    <a href="#">
                                        A good traveler has no fixed plans and is not intent on arriving.
                                    </a>
                                </h3>

                                {/* <a href="#" className="btn-link">
                                    <span>Read More</span>

                                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                                </a> */}

                            </div>

                        </div>
                    </li>

                </ul>

            </div>
        </section>
    )
}

export default Blog