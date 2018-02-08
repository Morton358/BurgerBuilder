import React from 'react';
import classes from './Logo.css';
import logoImage from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoImage} alt="MyBurger"/>
    </div>
);

export default logo;
