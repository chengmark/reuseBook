import express from 'express'

// super class of all routes
export abstract class Routes {
  router: express.Router
  name: string // name of the group of routes

  constructor(router: express.Router, name: string) {
    this.router = router
    this.name = name
    this.configureRoutes()
  }

  /**
   * return name of this route
   *
   */
  getName(): string {
    return this.name
  }

  abstract configureRoutes(): void
}
