import React, { Component } from 'react';
import Container from '../Container/Container';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        let hash = window.location.hash.substr(1);

        this.state = {
            route: hash.split('/')[1],
            errorData: {},
            spinner: false
        };
    }

    render() {
        let Child = Container;
        let app;

        return (
            <div>
                {/* {this.state.errorData.type && <ErrorPage error={this.state.errorData.type} config={this.state.errorData.config} />} */}
                {
                    <div>
                        <div className="wrap-nav-container-back"></div>
                        <div className="wrap-nav-container">
                            <nav id="wrap-navigation">
                                <div id="wrap-portal-navigation">
                                    <a href="" >
                                        <div className="dd__icon dd__icon-list-th-lg"></div>
                                        <div className="title nav-label">AngularJS</div>
                                    </a>

                                    <a href="" >
                                        <div className="title nav-label">Angular</div>
                                    </a>

                                    <a href="" >
                                        <div className="title nav-label">VueJS</div>
                                    </a>

                                    <a href="" >
                                        <div className="title nav-label">React</div>
                                    </a>

                                </div>
                            </nav>
                        </div>
                        <Child app={app} />
                        {
                            this.state.spinner && <div className="spin__box-wrapper"><div className="spin__box"></div></div>
                        }
                    </div>}
            </div>
        );
    }
}

export default App;
