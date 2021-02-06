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

  getName() {
    return this.name
  }

  abstract configureRoutes(): void
}
