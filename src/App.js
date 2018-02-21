import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
    state = {};

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/" exact component={BurgerBuilder} />
                        </Switch>
                    </Layout>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
