# Server

This folder contains the integrated server, serving both APIs and Website

## Development

prerequisite refer to `README.md` in the root of this repo

MongoDB config is in `./DB.ts` database name is `csci3100`

`cd` to this folder first, then use `npm start` to run it directly without precompilation

**prettier will run in pre commit stage, for coding style consistency**

### Add new APIs ( 20/3/2021 updated )(MUST READ)

- Naming convention:

  1. camel case
  2. capitalize first letter for files having default exports (except `index.ts`)

- `./routes` contains all API routes, each subfolder is a new route

- `./model` contians all DB models, each file represents a collection in MongoDB

- each route has 3 files:

  1. `index.ts` contains the API routing, entry of the route
  2. `RouteController.ts` continas the all controller logics
  3. `Params.ts` contains a list of params used in controller

  you will have to mainly focus on these three files

- after coding all the handlers, you can add the route in `./index.ts`

### Packages used

- **express** ( popular web framework )
- **mongoose** ( mongodb manipulation library )
- **express-session** ( session manipulation library )
- **passport** ( oauth services library )
  - **passport-google-oauth2** ( google oauth support )

### File structure

```
CSCI3100_project/
.                        # Root
├── middlewares          # Middlewares e.g. 'passport', 'express-session' (you can also put express here)
├── models               # Database models in form of mongoose schema e.g. userModel, bookModel. (Like SQL table definition)
├── node_modules         # Packages
├── routes               # Modulize the APIs into different routes
│   └── auth             # Oauth API route (leave it alone first)
│   └── user             # User API route (all the user related APIs e.g. login, signup, list_users, etc. )
│   └── index.ts         # General Route class. Whenever you want to add a new route, use this class
│   └── ...
├── types                # Self defined types if necessary
│   └── ...
├── utils                # Put all common functions here e.g. parseDate, checkEmail
├── .gitignore           # Files to be ignored
├── authentication       # Oauth services settings (leave it alone first)
├── index.ts             # Entry of the server, you can register routes here by creating a Route class
├── package.json         # Node project configs
├── tsconfig.json        # Typescript configs
└── ...
```
