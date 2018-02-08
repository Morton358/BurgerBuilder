import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.Spinner}>
        <CircularProgress size={120} thickness={7} />
    </div>
);

export default spinner;
