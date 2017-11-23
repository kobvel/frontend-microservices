import React, { Component } from 'react';

function createMarkup(app) {
    return { __html: `<${app}-app></${app}-app>` };
}

class Container extends Component {
    render() {
        const app = this.props.app;

        return (
            <div>
                <div dangerouslySetInnerHTML={createMarkup(app)} />
            </div>
        );
    }
}

export default Container;
