# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# FaceValidation-React

This project is a demonstration of communication between two different application running on the same server. This project contains a react application build inside a normal web application , the react application is build in such a way that it takes images as input(a filepicker). The images taken as input is sent to the web application via a URl, the images received by the web application can undergo any encoding or other functionality , in this case we are converting the images to base 64 and are sending that data via a request to a FaceMatch API (you must use your own api, api is not provided in the code). The web application waits for the response from the API and once it has received the response, it sends the response message to the react application/component to be displayed there, the react application is buit in such a way that it is already waiting for the responce from the web aplication.

In order for this to work, we must first create a react application which does whatever functionality is required, once this is done we create a production build of that application, we then use this build file in the web application, we use the script, link tags in the build file to display the UI of the react application in the web application.

This allows us to use a react application inside a normal web application created using html and css. The web application is built to work as specified above.

This flowcart illustrates the working flow of the application.
<img width="2113" alt="React Proj (1)" src="https://github.com/pawanrgowda/FaceValidation-React/assets/70716509/ffb7051b-7d83-4b29-b413-f51112ae6b8f">


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Results

Takes two file and responds with match results 
(the parameters an id depends on the api used)



## Installation
# Create React App [![Build & Test](https://github.com/facebook/create-react-app/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/facebook/create-react-app/actions/workflows/build-and-test.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md)

<img alt="Logo" align="right" src="https://create-react-app.dev/img/logo.svg" width="20%" />

Create React apps with no build configuration.

- [Creating an App](#creating-an-app) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

Create React App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/facebook/create-react-app/issues/new).<br>
If you have questions or need help, please ask in [GitHub Discussions](https://github.com/facebook/create-react-app/discussions).

## Quick Overview

```sh
npx create-react-app my-app
cd my-app
npm start
```

If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` or `yarn global remove create-react-app` to ensure that npx always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg' width='600' alt='npm start'>
</p>

### Get Started Immediately

You **don’t** need to install or configure tools like webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Create a project, and you’re good to go.

# Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please get in contact.

# Contact

For support or inquiries, please email at pawanrgowda7@gmail.com

