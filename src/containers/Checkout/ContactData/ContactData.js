import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FlatButton from 'material-ui/FlatButton';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    autoFocus: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            preferedPhone: {
                elementType: 'input',
                elementConfig: {
                    type: 'radio',
                    name: 'preferContact'
                    // checked: true
                },
                value: 'phone',
                label: 'Prefer Phone For Contact',
                validation: {},
                valid: true,
                touched: false
            },
            preferedEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'radio',
                    name: 'preferContact'
                },
                value: 'email',
                label: 'Prefer Email For Contact',
                validation: {},
                valid: true,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 9,
                    maxLength: 9
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        activeInputs: [
            'name',
            'street',
            'zipCode',
            'city',
            'deliveryMethod',
            'preferedPhone',
            'preferedEmail'
        ],
        loading: false
    };

    handleOrder = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElemIndentifier in this.state.orderForm) {
            formData[formElemIndentifier] = this.state.orderForm[
                formElemIndentifier
            ].value;
        }
        const data = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
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
    };

    handleInput = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElem = { ...updatedOrderForm[inputIdentifier] };
        let updatedActiveInputs = [...this.state.activeInputs];

        if (event.target.value === 'email') {
            updatedActiveInputs = updatedActiveInputs.filter(inp => {
                return inp !== 'phone';
            });
            updatedActiveInputs.push('email');
            updatedFormElem.touched = true;
        } else if (event.target.value === 'phone') {
            updatedActiveInputs = updatedActiveInputs.filter(inp => {
                return inp !== 'email';
            });
            updatedActiveInputs.push('phone');
            updatedFormElem.touched = true;
        } else {
            updatedFormElem.value = event.target.value;
            updatedFormElem.valid = this.checkValidity(
                updatedFormElem.value,
                updatedFormElem.validation
            );
            updatedFormElem.touched = true;
        }
        updatedOrderForm[inputIdentifier] = updatedFormElem;

        let formIsValid = true;
        for (let inputIdentifier of updatedActiveInputs) {
            formIsValid =
                updatedOrderForm[inputIdentifier].valid &&
                formIsValid &&
                (updatedOrderForm.preferedPhone.touched ||
                    updatedOrderForm.preferedEmail.touched);
        }

        this.setState({
            orderForm: updatedOrderForm,
            activeInputs: updatedActiveInputs,
            formIsValid: formIsValid
        });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key of this.state.activeInputs) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <React.Fragment>
                <h4>Enter your Contact Data:</h4>
                <form onSubmit={this.handleOrder}>
                    {formElementsArray.map(formElem => {
                        return (
                            <Input
                                key={formElem.id}
                                elementType={formElem.config.elementType}
                                elementConfig={formElem.config.elementConfig}
                                value={formElem.config.value}
                                invalid={!formElem.config.valid}
                                shouldValidate={formElem.config.validation}
                                touched={formElem.config.touched}
                                label={formElem.config.label}
                                // activate={
                                //     this.state.activeInputs.includes(formElem.id)
                                // }
                                changed={event =>
                                    this.handleInput(event, formElem.id)
                                }
                            />
                        );
                    })}
                    <FlatButton
                        type="submit"
                        label="Order"
                        primary={true}
                        fullWidth={true}
                        disabled={!this.state.formIsValid}
                    />
                </form>
            </React.Fragment>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return <div className={classes.ContactData}>{form}</div>;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
