import React from 'react';
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ({ title , onAdd ,showAdd}) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1 className='title'>{title}</h1>
            {location.pathname === '/' && (<Button color={showAdd ? 'red' :'#4E9F3D'} text={showAdd? 'Close' : 'Add'} onClick={onAdd} />)}
        </header>
    )};
Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
