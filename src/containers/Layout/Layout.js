import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    handleCloseSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    };

    handleOpenSideDrawer = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar openSideDrawer={this.handleOpenSideDrawer}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.handleCloseSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}
export default Layout;
