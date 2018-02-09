import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponents, axios) => {
    return class extends Component {

        state = {
            error: null,
            errorOccured: false
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null, errorOccured: false})
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error, errorOccured: true})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

        }

        errorConfirmedHandler = () => {
            this.setState({error: null, errorOccured: false})
        }

        render () {
            return (
                <React.Fragment>
                    <Modal
                        open={this.state.errorOccured}
                        close={this.errorConfirmedHandler}
                        buttons={null}
                    >
                        {this.state.errorOccured ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponents {...this.props} />
                </React.Fragment>
            )
        }
    }
}


export default withErrorHandler;
