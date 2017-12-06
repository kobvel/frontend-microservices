import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container';
import AppResourcesManager from '../app-resources.manager';

import './App.css';

const apps = { angular: 'angular', angularjs: 'angularjs', vue: 'vue', react: 'react' };

class App extends Component {
    get _hashArr() {
        return window.location.hash.substr(1).split('/');
    }

    constructor(props) {
        super(props);
        this.appResourcesManager = new AppResourcesManager();

        let hash = window.location.hash.substr(1);

        this.state = {
            route: hash.split('/')[1],
            errorData: {},
            spinner: false
        };

        this._analyzeLocation();
    }

    componentWillMount() {
        const { store } = this.context;

        this.unsubscribe = store.subscribe(() => {
            const errorsState = store.getState().errors;

            this.setState({ errorData: errorsState });

            const loadState = store.getState().load;

            if (loadState.completed) {
                this.setState({
                    spinner: false
                });
            } else if (loadState.loading) {
                this.setState({
                    spinner: true
                });
            } else if (loadState.error) {
                console.log('Error occured');
            }
        });

        window.addEventListener('hashchange', () => {
            const app = this._hashArr[1];

            if (app) {
                this.setState({ errorData: {}, route: app });
                this.appResourcesManager.currentApp = app;
            }
        });
        this.appResourcesManager.currentApp = this.state.route;
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _analyzeLocation() {
        const defaultURL = `${window.location.origin}/#/angularjs`;

        if (!this._hashArr[1]) {
            window.location.href = defaultURL;
        }
    }


    render() {
        let Child = Container;
        let app = 'default';

        for (const nestedApp in apps) {
            if (this.state.route === nestedApp) {
                app = nestedApp;
            }
        }

        const classSelected = (route) => this.state.route === route ? 'selected' : null;

        return (
            <div>
                {/* {this.state.errorData.type && <ErrorPage error={this.state.errorData.type} config={this.state.errorData.config} />} */}
                {
                    <div>
                        <div className="wrap-nav-container-back"></div>
                        <div className="wrap-nav-container">
                            <nav id="wrap-navigation">
                                <div id="wrap-portal-navigation">
                                    <a href={'/#/' + apps.angular} className={classSelected(apps.angular)}>
                                        <div className="title nav-label">Angular</div>
                                    </a>

                                    <a href={'/#/' + apps.vue} className={classSelected(apps.vue)}>
                                        <div className="title nav-label">VueJS</div>
                                    </a>

                                    {/* <a href={'/#/' + apps.react} className={classSelected(apps.react)}>
                                        <div className="title nav-label">React</div>
                                    </a> */}

                                </div>
                            </nav>
                        </div>
                        <Child app={app} />
                        {this.state.spinner && <div className="loader">Loading...</div>}
                    </div>}
            </div>
        );
    }
}

App.contextTypes = {
    store: PropTypes.object
};

export default App;
