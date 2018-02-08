import React from 'react';
import IconButton from 'material-ui/IconButton';
import classes from './BuildControl.css';
const buildControl = props => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <IconButton
            className={classes.More}
            onClick={props.addClick}
        >
            <i className="material-icons">add_circle</i>
        </IconButton>
        <IconButton
            className={classes.Less}
            onClick={props.removeClick}
            disabled={props.disableButton}
        >
            <i className="material-icons">delete</i>
        </IconButton>
    </div>
);

export default buildControl;
