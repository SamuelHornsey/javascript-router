# Javascript Router
A vanilla js router implementation 🔗

### Currently *WIP*

A simple Javascript UI router. Written in typescript and bundled as a es6 module for use with Webpack or Rollup.

## Installation

Install using npm and webpack/rollup etc.
```
npm install scorm-promised
```

Import as module.

```js
import { Router } from 'js-router';
```

## Usage

## Init

```js
const prefix = '/hello';
const router = new Router(prefix);
```

Add routes to the router.

```js
router.on('/', () => {
    // Perform action on route
});
```

On functions can be chained.

```js
router.on('/blog', () => {
    // Perform action on router
}).on('/posts', () => {
    // Perform action on router
});
```

When all routes are added call init().

```js
router.on('/blog', () => {
    // Perform action on router
}).on('/posts', () => {
    // Perform action on router
});

router.init();
```

To create router links use the data-router attribute on link elements.

```html

<a href="/blog" data-router>Link</a>
```

If the DOM is re-rendered or more links are added to the page the redefineLinks function must be called again.

```js
router.redefineLinks();
```