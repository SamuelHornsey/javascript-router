export default class Router {
    private routes: Map<string, (params?: any, query?: any) => any> = new Map();
    /**
     * Constructor
     */
    constructor () {

    }

    /**
     * Initialise the route
     */
    public init (): void {
        this.redefineLinks();
        window.addEventListener('popstate', () => this.onChange());

        this.onChange();
    }

    /**
     * Collects all the router links
     */
    public redefineLinks (): void {
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
    public on (route: string, cb: (param?: any, query?: any) => any) : Router {
        this.routes.set(route, cb);
        return this;
    }

    /**
     * Go to url
     * @param event any
     */
    private go (event: any) : void {
        event.preventDefault();
        window.history.pushState(null, null, event.target.href);
        this.onChange();
    }

    /**
     * On route change
     */
    private onChange () : void {
        let url = window.location.pathname;
        let searchParams = new URLSearchParams(window.location.search);
        let query: any = {};

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