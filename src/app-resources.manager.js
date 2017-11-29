export default class AppResourcesManager {
    selectedApp;

    constructor() {
        this.init();
    }

    init() {
        this.jsResources(window);
        this.styleSheetResources();
    }

    styleSheetResources() {
        this.styles = [...document.getElementsByTagName('style')];
    }

    jsResources(w) {
        const originalAdd = w.addEventListener;
        const self = this;
        w.listenersList = {};
        w.addEventListener = function () {
            const listener = {
                type: arguments[0],
                listener: arguments[1]
            };
            let app = !!self.selectedApp && self.selectedApp.length > 0 ? self.selectedApp : 'wrapper';

            // To fix black magic bug with history
            app = listener.type === 'popstate' ? 'wrapper' : app;

            if (w.listenersList[app]) {
                w.listenersList[app].push(listener);
            } else {
                w.listenersList[app] = [listener];
            }

            return originalAdd.apply(this, arguments);
        };


        const originalRemove = w.removeEventListener;
        w.removeEventListener = function () {
            const property = !!self.selectedApp && self.selectedApp.length > 0 ? self.selectedApp : 'wrapper';
            const type = arguments[0];
            if (w.listenersList[property]) {
                w.listenersList[property].forEach((el, index, arr) => {
                    if (el.type === type) {
                        arr.splice(index, 1);
                    }
                });
            }

            return originalRemove.apply(this, arguments);
        };
    }

    _releaseResources() {
        this._releaseJsResources();
        this._releaseStyleSheetResources();
    }

    _releaseStyleSheetResources() {
        const styles = document.getElementsByTagName('style');
        let stylesArr = [...styles].filter(e => !e.classList.length && e.className !== 'walkme-to-remove');

        stylesArr
            .concat(this.styles)
            .filter((style, index, array) => array.indexOf(style) === array.lastIndexOf(style))
            .filter(e => !e.classList.length && e.className !== 'walkme-to-remove')
            .forEach(node => node.parentNode && node.parentNode.removeChild(node));
    }

    _releaseJsResources() {
        const app = this.selectedApp;
        const listenersList = window.listenersList[app];
        if (!app || !listenersList) {
            return;
        }
        while (!!listenersList.length) {
            window.removeEventListener(listenersList[0].type, listenersList[0].listener);
            listenersList.pop();
        }
    }

    set currentApp(value) {
        if (this.selectedApp && this.selectedApp !== value) {
            this._releaseResources();
        }
        this.selectedApp = value;
    }
}