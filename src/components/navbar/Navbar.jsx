import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from "/logo.png";

let Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src={logo} alt="Peacock Logo" />
                <Link to="/"><strong>My Contacts, My Way <sub style={{fontSize:16}}>~ Powered by ReactJS</sub></strong></Link>
            </div>
            <div className={styles.navLinks}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/add" className={styles.link}>Add Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
