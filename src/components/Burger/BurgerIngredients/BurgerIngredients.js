import React, { Component } from 'react';
import classes from './BurgerIngredients.css';
import PropTypes from 'prop-types';
/*eslint indent: ["error", 4, { "SwitchCase": 1 }]*/

class BurgerIngredients extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case 'Bread-bottom':
                ingredient = <div className={classes.BreadBottom}> </div>;
                break;
            case 'Bread-top':
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1} />
                        <div className={classes.Seeds2} />
                    </div>
                );
                break;
            case 'Meat':
                ingredient = <div className={classes.Meat}> </div>;
                break;
            case 'Cheese':
                ingredient = <div className={classes.Cheese}>
                    <div className={classes.Melt}></div>
                </div>;
                break;
            case 'Salad':
                ingredient = <div className={classes.Salad}> </div>;
                break;
            case 'Bacon':
                ingredient = <div className={classes.Bacon}> </div>;
                break;
            case 'Tomato':
                ingredient = <div className={classes.Tomato}> </div>;
                break;
            case 'Onion':
                ingredient = <div className={classes.Onion}> </div>;
                break;
            default:
                ingredient = null;

        }
        return ingredient;
    }
}


export default BurgerIngredients;

BurgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
};
