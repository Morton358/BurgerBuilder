import React, { Component } from 'react';

import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FlatButton from 'material-ui/FlatButton';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
            city: ''
        },
        loading: false
    };

    handleOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ivan Zakolupenko',
                address: {
                    street: 'Barska 6',
                    zipCode: '27096',
                    city: 'Wrocław'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios
            .post('/orders.json', data)
            .then(response => {
                this.setState({ loading: false });
                console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    render() {
        let form = (
            <React.Fragment>
                <h4>Enter your Contact Data:</h4>
                <form>
                    <input
                        className={classes.Input}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                    />
                    <input
                        className={classes.Input}
                        type="email"
                        name="email"
                        placeholder="Your Email"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="street"
                        placeholder="Your Street"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="zipCode"
                        placeholder="Your ZipCode"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="city"
                        placeholder="Your City"
                    />
                    <FlatButton
                        label="Order"
                        primary={true}
                        onClick={this.handleOrder}
                    />
                </form>
            </React.Fragment>
    );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;
