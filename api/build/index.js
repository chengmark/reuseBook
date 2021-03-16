"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const user_1 = require("./routes/user");
// import { AuthRoutes } from './routes/auth'
// import initPassport from './authentication'
// import middlewares from './middlewares'
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const app = express_1.default();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT ? process.env.PORT : 3001;
const BUILD_PATH = process.env.BUILD_PATH ? process.env.BUILD_PATH : '../build';
const routes = [];
// initPassport()
app.use(body_parser_1.default.json());
const router = express_1.default.Router();
// create user routes to the router
routes.push(new user_1.UserRoutes(router));
// create auth routes to the router
// routes.push(new AuthRoutes(router))
// use middlewares
// app.use(middlewares)
// all routes start with '/api'
app.use('/api', router);
// app.get('/', (req: Request, res: Response) => {
//   if(!req.session.logedin)
// })
console.log(BUILD_PATH);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../build')));
}
else {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
}
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`end point at /api`);
    routes.forEach((routes) => {
        console.log(`Routes configured for ${routes.getName()}`);
    });
});
