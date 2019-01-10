This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run this project

- Download this project
- Execute `npm install` or `yarn` to install the third party tools and libraries required to run this project
- Execute `npm run start` or `yarn start` to runs the app in the development mode
- Open [http://localhost:3000](http://localhost:3000) in your browser

## Folder Structure

The project's folder structure look like this:

```
/
  build/ Contains files that will be used for deployment
  docs/ Contains the documentation in HTML format
  node_modules/ - 3rd party libraries and tools used in this project
  public/ - Public files served to the browser
  src/ - Sources of the project, contains all the logic and templating
```

## Available Scripts

In the project directory, you can run:

- `npm start`
  or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

- `npm test`
  or `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

- `npm run build`
  or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

See the section about [deployment](#deployment) for more information.

- `npm run tslint-check`
  or `yarn tslint-check`

Run linting rules and indentation rules over all the project.
It will output errors if some rules are broken.

- `npm run type-doc`
  or `yarn type-doc`

Generates a documentation in HTML format based on JSDoc comments found in the project's source using `Type-doc` package.
The generated documentation is located in the folder /docs.

## Linting and indentation rules

You can find rulesets in the `tslint.json` file. Four rulesests are used:

- tslint:recommended
- tslint-react
- tslint-config-prettier
- tslint-plugin-prettier

And some custome rules for type inference on pretty much everything. It's a bit too much verbose
but at least, you know with accuracy what type you will get or use.

Other rules are directly handled in the `tsconfig.json` file:

- forceConsistentCasingInFileNames
- noImplicitReturns
- noImplicitThis
- noImplicitAny
- importHelpers
- strictNullChecks
- suppressImplicitAnyIndexErrors
- noUnusedLocals

For the indentation, this project use prettier and formatting rules located in the `.prettierrc` file at the root of the project.
It enforces rules about:

```sh
npm install --save node-sass-chokidar
```

## Progressive Web App

This project is a Progressive Web App. It can be installed
By default, the production build is a fully functional, offline-first
[Progressive Web App](https://developers.google.com/web/progressive-web-apps/).

- All static site assets are cached so that the page loads fast on subsequent visits. Updates are downloaded in the background.
-
- This app will work regardless of network state, even if offline.
- On mobile devices, this app can be added directly to the user's home screen.

The [`sw-precache-webpack-plugin`](https://github.com/goldhand/sw-precache-webpack-plugin)
is integrated into production configuration,
and it will take care of generating a service worker file that will automatically
precache all of your local assets and keep them up to date as you deploy updates.
The service worker will use a [cache-first strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
for handling all requests for local assets, including the initial HTML, ensuring
that your web app is reliably fast, even on a slow or unreliable network.

### Opting Out of Caching

If you would prefer not to enable service workers prior to your initial
production deployment, then remove the call to `serviceWorkerRegistration.register()`
from [`src/index.js`](src/index.js).

If you had previously enabled service workers in your production deployment and
have decided that you would like to disable them for all your existing users,
you can swap out the call to `serviceWorkerRegistration.register()` in
[`src/index.js`](src/index.js) with a call to `serviceWorkerRegistration.unregister()`.
After the user visits a page that has `serviceWorkerRegistration.unregister()`,
the service worker will be uninstalled. Note that depending on how `/service-worker.js` is served,
it may take up to 24 hours for the cache to be invalidated.

### Offline-First Considerations

1. Service workers [require HTTPS](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https),
   although to facilitate local testing, that policy
   [does not apply to `localhost`](http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385).
   If your production web server does not support HTTPS, then the service worker
   registration will fail, but the rest of your web app will remain functional.

1. Service workers are [not currently supported](https://jakearchibald.github.io/isserviceworkerready/)
   in all web browsers. Service worker registration [won't be attempted](src/registerServiceWorker.js)
   on browsers that lack support.

1. The service worker is only enabled in the [production environment](#deployment),
   e.g. the output of `npm run build`. It's recommended that you do not enable an
   offline-first service worker in a development environment, as it can lead to
   frustration when previously cached assets are used and do not include the latest
   changes you've made locally.

1. If you _need_ to test your offline-first service worker locally, build
   the application (using `npm run build`) and run a simple http server from your
   build directory. After running the build script, `create-react-app` will give
   instructions for one way to test your production build locally and the [deployment instructions](#deployment) have
   instructions for using other methods. _Be sure to always use an
   incognito window to avoid complications with your browser cache._

1. If possible, configure your production environment to serve the generated
   `service-worker.js` [with HTTP caching disabled](http://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours).
   If that's not possible—[GitHub Pages](#github-pages), for instance, does not
   allow you to change the default 10 minute HTTP cache lifetime—then be aware
   that if you visit your production site, and then revisit again before
   `service-worker.js` has expired from your HTTP cache, you'll continue to get
   the previously cached assets from the service worker. If you have an immediate
   need to view your updated production deployment, performing a shift-refresh
   will temporarily disable the service worker and retrieve all assets from the
   network.

1. Users aren't always familiar with offline-first web apps. It can be useful to
   [let the user know](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption)
   when the service worker has finished populating your caches (showing a "This web
   app works offline!" message) and also let them know when the service worker has
   fetched the latest updates that will be available the next time they load the
   page (showing a "New content is available; please refresh." message). Showing
   this messages is currently left as an exercise to the developer, but as a
   starting point, you can make use of the logic included in [`src/registerServiceWorker.js`](src/registerServiceWorker.js), which
   demonstrates which service worker lifecycle events to listen for to detect each
   scenario, and which as a default, just logs appropriate messages to the
   JavaScript console.

1. By default, the generated service worker file will not intercept or cache any
   cross-origin traffic, like HTTP [API requests](#integrating-with-an-api-backend),
   images, or embeds loaded from a different domain. If you would like to use a
   runtime caching strategy for those requests, you can [`eject`](#npm-run-eject)
   and then configure the
   [`runtimeCaching`](https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject)
   option in the `SWPrecacheWebpackPlugin` section of
   [`webpack.config.prod.js`](../config/webpack.config.prod.js).

### Progressive Web App Metadata

The default configuration includes a web app manifest located at
[`public/manifest.json`](public/manifest.json).

When a user adds a web app to their homescreen using Chrome or Firefox on
Android, the metadata in [`manifest.json`](public/manifest.json) determines what
icons, names, and branding colors to use when the web app is displayed.

## Deployment

`npm run build` creates a `build` directory with a production build of your app.
