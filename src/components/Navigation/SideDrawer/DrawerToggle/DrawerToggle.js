import React from 'react';
import classes from './DrawerToggle.css';
import menuIcon from '../../../../assets/images/ic_menu_white_24px.svg'

const drawerToggle = (props) => (
    <button className={classes.Menu} onClick={props.clicked}>
        <img src={menuIcon} alt="Menu" /> <p>MENU</p>
    </button>
);

export default drawerToggle;
