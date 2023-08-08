import { Dialog, DialogContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import UserSignIn from '../SignIn-SignUp Module/UserSignIn';
import navlogo from './assets/images/MajesticTourism.png'

function NavBar() {

    const [navActive, setNavActive] = useState(false);
    const [showGoTop, setShowGoTop] = useState(false);
    const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false); // State to manage the dialog visibility
    const [usernamestate, setUserNameState] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setShowGoTop(window.scrollY >= 500);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        try {
            const userid = localStorage.getItem("user_id")
            const userName = localStorage.getItem("userName")
            setUserNameState(userName)
        }
        catch {

        }
    }, []);

    const handleNavToggle = () => {
        setNavActive((prevNavActive) => !prevNavActive);
    };

    const handleSignInButtonClick = () => {
        setIsSignInDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsSignInDialogOpen(false);
    };


    return (
        <>
            <header className={`header ${navActive ? 'active' : ''}`} data-header>
                <div className="container">
                <img style={{width: '15%'}} src={navlogo}></img>
                    <a href="#">
                        {/* <h1 className="logo"><span>Rag</span><span>Tour</span></h1> */}
                        
                    </a>
                    <button
                        className="nav-toggle-btn"
                        data-nav-toggle-btn
                        aria-label="Toggle Menu"
                        onClick={handleNavToggle}
                    >
                        <IoMenuOutline className="open" style={{color: 'white', fontSize: '30px'}} />
                        <IoCloseOutline className="close" style={{color: 'white', fontSize: '30px'}}/>
                    </button>
                    <nav className="navbar">
                        <ul className="navbar-list">
                            <li>
                                <a href="/home" className="navbar-link">Home</a>
                            </li>
                            {/* <li>
                                <a href="#" className="navbar-link">About Us</a>
                            </li> */}
                            <li>
                                <a href="/tour" className="navbar-link">Tours</a>
                            </li>
                            <li>
                                <a href="/restaurant" className="navbar-link">Restaurants</a>
                            </li>
                            <li>
                                <a href="/hotel" className="navbar-link">Hotels</a>
                            </li>
                            <li>
                                <a href="/your-bookings" className="navbar-link">Your Bookings</a>
                            </li>
                            <li>
                                <a href="/gallery" className="navbar-link">Gallery</a>
                            </li>
                        </ul>
                        {usernamestate ? (
                            <Typography variant="body1" className="user-greeting" sx={{color: 'white', fontSize: '20px'}}>
                                Hi {usernamestate}
                            </Typography>
                        ) : (
                            <a href="#" className="btn btn-secondary" onClick={handleSignInButtonClick}>
                                SignIn/SignUp
                            </a>
                        )}
                    </nav>
                </div>
            </header>
            <a href="#top" className={`back-to-top ${showGoTop ? 'active' : ''}`}>
                <ion-icon name="arrow-up-outline"></ion-icon>
            </a>
            <Dialog open={isSignInDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
                <DialogContent style={{ width: '100%', height: '100%', padding: 0 }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserSignIn />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NavBar