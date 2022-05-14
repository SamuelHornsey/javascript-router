# Javascript Router
A vanilla js router implementation 🔗

![npm](https://img.shields.io/npm/v/javascript-router.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/javascript-router.svg) ![NPM](https://img.shields.io/npm/l/javascript-router.svg)

> Demo: [samuelhornsey.github.io/javascript-router/demo/](https://samuelhornsey.github.io/javascript-router/demo/)

A simple Javascript UI router. Written in typescript and bundled as a es6 module for use with Webpack or Rollup.

## Installation

Install using npm and webpack/rollup etc.
```
npm install javascript-router
```

Import as module.

```js
import { Router } from 'javascript-router';
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

Parameters and queries are passed into the .on() function.

```js
router.on('/blog', (query, params) => {
  // Perform action on router
  console.log(query, params);
});
```
