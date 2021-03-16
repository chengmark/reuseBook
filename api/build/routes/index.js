"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
// super class of all routes
class Routes {
    constructor(router, name) {
        this.router = router;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.Routes = Routes;
