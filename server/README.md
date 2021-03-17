# Server

This folder contains the integrated server, serving both APIs and Website

## Development

prerequisite refer to `README.md` in the root of this repo

use `npm start` to run it directly without precompilation

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

### Add new APIs

- Q: How to build the handlers?
- A: Refer to the ./routes/user/index.ts

- Q: How to register the handlers?
- A: Refer to ./index.ts