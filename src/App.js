import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
    state = {};

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Layout>
                        <BurgerBuilder />
                    </Layout>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
