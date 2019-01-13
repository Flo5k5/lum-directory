## TLDR;

LumDirectory uses React, TypeScript, Styled Component (CSS in JS), Leaflet, FontAwesome icons, Prettier, TsLint, JSDoc / TypeDoc.
It's a responsive progressive web app using localStorage to cache network calls to randomuser.me API. It preloads all images, so service worker automatically caches them.
Responsive design is achieved using only flexbox.
An online version is available here: [https://lumdirectory.firebaseapp.com](https://lumdirectory.firebaseapp.com/).

## How to run this project

- Download or clone this project
- Execute `npm install` or `yarn` to install the third party tools and libraries required to run this project
- Execute `npm run start` or `yarn start` to runs the app in development mode
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

- `npm run typedoc`
  or `yarn typedoc`

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
The current configuration use those rules:

```json
{
  "printWidth": 80,
  "trailingComma": "es5",
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "always",
  "endOfLine": "auto"
}
```

## Progressive Web App

This project is a Progressive Web App. It can be added to the home screen of your smartphone. You can launch it like a traditional application. It will be updated automatically by the service worker.

- All static site assets are cached so that the page loads fast on subsequent visits. Updates are downloaded in the background.
- This app will work regardless of network state, even if offline.
- On mobile devices, this app can be added directly to the user's home screen.

## Deployment

`npm run build` creates a `build` directory with a production build of your app.
