# API

This folder contains the api server

## How to run it?

use `nodemon index.ts` or `ts-node index.ts` to run it directly without precompilation

## Technologies

- **typescript** (.ts extension)

### Packages used

- **express**
- **mongoose**
- **express-session**
- **passport**( for authentication )
  - **passport-google-oauth2**

### File structure

```
CSCI3100_project/
.                        # root
├── middlewares          # store middlewares e.g. 'passport', 'express-session' (you can also put express here)
├── models               # database models e.g. userModel, bookModel. (Like SQL table definition)
├── node_modules         # packages
├── routes               # modulize the APIs into different routes
│   └── auth             # for oauth services (leave it alone first)
│   └── user             # store the user route (all the user related APIs e.g. login, signup, list_users, etc. )
│   └── index.ts         # general Route class. Whenever you want to add a new route, use this class
│   └── ...
├── types                # self defined types if necessary
│   └── ...
├── utils                # put all common functions here e.g. parseDate, checkEmail
├── .gitignore           # folders to be ignored
├── authentication       # for oauth services (leave it alone first)
├── index.ts            # the entry of the server, you can register routes here by creating a Route class
├── package-lock.json    # package management
├── package.json         # package management
├── README.md            # description
└── tsconfig.json        # typescript config
```

### Add new APIs

- Q: How to build the handlers?
- A: Refer to the ./routes/user/index.ts

- Q: How to register the handlers?
- A: Refer to ./index.ts
