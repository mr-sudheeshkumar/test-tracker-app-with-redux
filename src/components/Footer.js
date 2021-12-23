import React from 'react';
import {Link} from 'react-router-dom'
const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021 </p>
            <p>Email me :<a href="https://mail.google.com/mail/?view=cm&fs=1&to=sudhikumar8055@gmail.com"> SUDHI</a></p>
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer;
