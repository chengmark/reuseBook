# CSCI3100 project

This is CSCI3100 project

## Collaboration

- Main branch is for deployment.
- Work on the respective branch according to work division.
- Create pull request when ever you want to merge things to the main branch.
- Commit your code only after you have tested it.
- Prettier will be run in the pre-commit stage
- Cite code reference in the "References" section below.

## UI libraries used

- [styled-components](https://github.com/styled-components/styled-components) for creating highly customized css-in-js componenets
- [material ui](https://material-ui.com/) for creating material-styled components

## Main packages used

- **react-router-dom**( component routing )
- **react-hot-loader**( enables hot reload which facilitate development )
- **react-app-rewired/react-app-rewire-hot-reloader**( tweak webpack config without ejecting )
- **react-loadable**( dynamic import which enalbes code-spliting in route level )

## Before development

1. clone this repo
2. install node.js
3. cd to this project, and install modules by typing: `npm install`
4. start the dev server by typing: `npm start`
5. start editing!

## Setup with VScode

1. Install Prettier extension
2. Set prettier as default formatter (ctrl + shift + p ">format document" and choose prettier as default fomatter)

## File structure

```
react-template/
├── api        # API server
├── public     # Public files used on the frontend
└── src        # Frontend SPA
```

## References

- [Spectrum](https://github.com/withspectrum/spectrum) a nice-written react project
- [toptal-rest-series](https://github.com/makinhs/toptal-rest-series) an example of express API with typescript
- [passport-react](https://github.com/rmbh4211995/passport-react) an example of [passport](http://www.passportjs.org/) authentication
