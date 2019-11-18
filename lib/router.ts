// Route interface
interface Route {
  path: string;
  handler: Function;
  params: Array<string>;
}

// Params interface
interface Params {
  [key: string]: string;
}

// Match interface
interface Match {
  match: Array<string>;
  route: Route;
  params: Params;
}

// Regex constants
const PARAMS_REGEX = /[:*](\w+)/g;
const REPLACE_VARIABLE_REGEXP = "([^/]+)";
const FOLLOWED_BY_SLASH = "(?:/$|$)";

export default class Router {
  // Properties
  private root: string;
  private routes: Array<Route> = [];
  private _notFound: Function;

  // Constructor
  constructor(root: string) {
    this.root = root ? root : window.location.origin;
  }

  /**
   * Initialize the router
   */
  public init() {
    this.redefineLinks();
    window.addEventListener("popstate", () => this.onChange());

    this.onChange();
  }

  /**
   * Collect links and
   * add event listeners
   */
  public redefineLinks() {
    let links = document.querySelectorAll("a[data-router]");

    for (let link of links) {
      link.addEventListener("click", event => this.go(event));
    }
  }

  /**
   * When that route is called
   * @param path string
   * @param func any
   */
  public on(path: string, handler: any): Router {
    let params = path.match(PARAMS_REGEX);

    if (params) {
      params = params.map(param => param.replace(":", ""));
    }

    this.routes.push({
      path,
      handler,
      params
    });

    return this;
  }

  /**
   * Set not found handler
   * @param handler function
   */
  public notFound(handler: Function): Router {
    this._notFound = handler;
    return this;
  }

  /**
   * Replace parameters regex
   * @param route Route
   */
  private replace(route: Route) {
    const names: string[] = [];

    const regex = new RegExp(
      route.path.replace(PARAMS_REGEX, (full, name) => {
        names.push(name);
        return REPLACE_VARIABLE_REGEXP;
      }) + FOLLOWED_BY_SLASH
    );

    return { regex, names };
  }

  /**
   * Get the parameters from the URL
   * @param match any
   * @param names Array<string>
   */
  private getParams(match: any, names: Array<string>) {
    if (names.length === 0) return null;
    if (!match) return null;

    return match
      .splice(1, names.length)
      .reduce((params: Params, value: string, index: number) => {
        if (params === null) params = {};

        params[names[index]] = value;
        return params;
      }, null);
  }

  /**
   * Find the matching routes
   * @param path string
   */
  private findRoutes(path: string): Array<Match> {
    return this.routes
      .map(route => {
        const { regex, names } = this.replace(route);
        const match = path.replace(/^\/+/, "/").match(regex);
        const params = this.getParams(match, names);

        return match ? { match, route, params } : null;
      })
      .filter(m => m);
  }

  /**
   * Get the match URL
   * @param path string
   */
  private match(path: string): Match {
    return this.findRoutes(path)[0];
  }

  /**
   * On route change
   */
  private onChange(): Function {
    let url = window.location.pathname;
    let query = window.location.search;

    if (this.root) {
      url = url.replace(this.root, "");
    }

    const m = this.match(url);

    if (!m) {
      return this._notFound(query);
    }

    const { route, params } = m;

    return route.handler(query, params);
  }

  /**
   * Go to URL
   * @param event any
   */
  private go(event: any) {
    event.preventDefault();
    const query = event.target.search;

    const url = query
      ? `${this.root}${event.target.pathname}${query}`
      : `${this.root}${event.target.pathname}`;

    window.history.pushState(null, null, url);
    this.onChange();
  }
}
