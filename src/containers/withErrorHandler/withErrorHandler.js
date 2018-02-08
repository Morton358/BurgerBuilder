import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponents, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <React.Fragment>
                    <Modal
                        open={this.state.error}
                        close={this.errorConfirmedHandler}
                        buttons={null}
                    >
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponents {...this.props} />
                </React.Fragment>
            )
        }
    }
}


export default withErrorHandler;
