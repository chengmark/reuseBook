"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const __1 = require("..");
// routes for user related operations
class UserRoutes extends __1.Routes {
    constructor(router) {
        super(router, 'UserRoutes');
    }
    configureRoutes() {
        this.router
            .route(`/users`)
            .get((req, res) => {
            res.status(200).json({ msg: 'list users' });
        })
            .post((req, res) => {
            res.status(200).json({ msg: 'post users' });
        });
        this.router
            .route(`/users/:userId`)
            .all((req, res) => {
            // authentication, if any
        })
            .get((req, res) => {
            res.status(200).json({ msg: `user ${req.params.userId}` });
        })
            .post((req, res) => { })
            .patch((req, res) => { })
            .delete((req, res) => { });
        this.router
            .route(`/users/:userId/settings`)
            .get((req, res) => {
            res.status(200).json({ msg: 'list user settings' });
        })
            .post((req, res) => {
            res.status(200).json({ msg: 'post user settings' });
        });
    }
}
exports.UserRoutes = UserRoutes;
