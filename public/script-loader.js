(function () {
    var DEFAULT_PATH = './apps';
    var elements = [{
        name: 'vue',
        scriptName: 'vue-bundle.min.js',
        template: '<div id="app"></div>',
        cssPath: null
    }, {
        name: 'angular',
        scriptName: 'ng-bundle.min.js',
        template: '<app-root id="app"></app-root>',
        cssPath: null
    }];

    elements.forEach(function (el) {
        var node = Object.create(HTMLElement.prototype);

        node.attachedCallback = function () {
            var remote = DEFAULT_PATH;

            this.appendChild(document.createRange().createContextualFragment(el.template));

            window.store.dispatch({
                type: 'LOAD_STARTED',
                name: el.name
            });

            if (window[el.name]) {
                window.store.dispatch({
                    type: 'LOAD_FINISHED',
                    name: el.name
                });
            } else {
                $.getScript(remote + '/' + el.scriptName)
                    .done(function () {
                        window[el.name] = true;

                        window.store.dispatch({
                            type: 'LOAD_FINISHED',
                            name: el.name
                        });
                    });
            }


        };

        document.registerElement(el.name + '-app', {
            prototype: node
        });
    });

})();
