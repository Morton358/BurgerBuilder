import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        signUp: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    handleInput = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        };
        let formIsValid = true;
        for (let inputField in updatedControls) {
            formIsValid = updatedControls[inputField].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.signUp
        );
    };

    handleTabChange = () => {
        this.setState(prevState => {
            return { signUp: !prevState.signUp };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form onSubmit={this.handleSubmit}>
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
                    label={this.state.signUp ? 'sign up' : 'sign in'}
                    primary={true}
                    fullWidth={true}
                    disabled={!this.state.formIsValid}
                />
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            const textOfError = this.props.error.message
                .split('_')
                .join(' ')
                .toLowerCase();
            errorMessage = (
                <div className={classes.ErrorMessage}>{textOfError}</div>
            );
        }

        let redirectState = null;
        if (this.props.isAuthenticated) {
            redirectState = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <div className={classes.Auth}>
                {redirectState}
                <Tabs
                    value={this.state.signUp}
                    onChange={this.handleTabChange}
                    tabItemContainerStyle={{ backgroundColor: '#703B09' }}
                    inkBarStyle={{ backgroundColor: '#40a4c8' }}
                >
                    <Tab label="SIGN UP" value={true}>
                        <h4>For Sign Up Enter Your Email And Password:</h4>
                        {errorMessage}
                        {form}
                    </Tab>
                    <Tab label="SIGN IN" value={false}>
                        <h4>For Sign In Enter Your Email And Password:</h4>
                        {errorMessage}
                        {form}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
