class Router {
    /**
     * Constructor
     */
    constructor() {
        this.routes = new Map();
    }
    /**
     * Initialise the route
     */
    init() {
        this.redefineLinks();
        window.addEventListener('popstate', () => this.onChange());
        this.onChange();
    }
    /**
     * Collects all the router links
     */
    redefineLinks() {
        let links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.hasAttribute('data-router')) {
                link.addEventListener('click', event => this.go(event));
            }
        });
    }
    /**
     * Function to run on that route
     * @param route string
     */
    on(route, cb) {
        this.routes.set(route, cb);
        return this;
    }
    /**
     * Go to url
     * @param event any
     */
    go(event) {
        event.preventDefault();
        window.history.pushState(null, null, event.target.href);
        this.onChange();
    }
    /**
     * On route change
     */
    onChange() {
        let url = window.location.pathname;
        let searchParams = new URLSearchParams(window.location.search);
        let query = {};
        for (let entry of searchParams.entries()) {
            let [key, val] = entry;
            query[key] = val;
        }
        let handler = this.routes.get(url);
        if (handler) {
            handler({}, query);
        }
        return;
    }
}

export { Router };
