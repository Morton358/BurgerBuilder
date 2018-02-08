import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';


class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.open !== this.props.open ||
            nextProps.children !== this.props.children
        );
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render() {

        return (
            <Dialog
                // title="Your order:"
                autoScrollBodyContent={true}
                actions={this.props.buttons}
                modal={false}
                onRequestClose={this.props.close}
                open={this.props.open}
            >
                {this.props.children}
            </Dialog>
        );
    }
}
export default Modal;
