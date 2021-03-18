import express, { Request, Response } from 'express'
import { Routes } from '..'
const Cart = require('../../models/ShoppingCart')

class CartRoutes extends Routes {
  constructor(router = express.Router) {
    super(router, 'CartRoutes')
  }
  configureRoutes() {
    this.router
      .route(`/shopping_Cart`)
      .get((req, res) => {
        Cart
          .findOne({ user: req.user })
          .populate('items.product')
          .then((result) => {
            res.send(result)
          })
          .catch((err) => {
            res.send('Error getting shopping card products: ' + err)
          })
      })
      .post((req, res) => {
        const item = {
          product: req.body.product,
          quantity: req.body.quantity,
        }
        Cart
          .findOne({ user: req.user })
          .then((result) => {
            if (res) {
              let products = res.items.map((items) => {
                product == item.product
              })
              if (products.findOne(item.product)) {
                Cart
                  .findOne({ user: req.user })
                  .items.map((x) => {
                    x.product == item.product ? (x = item) : el
                  })
                  .exec()
                  .then(() => res.end())
              } else {
                result.items.push(item)
                result.save().then(() => res.end())
              }
            } else {
              Cart.create({ user: req.user, itmes: [item] }).then(() => res.end)
            }
          })
          .catch((err) => {
            res.send(err)
          });
        res.status(200).json({ msg: 'post itmes' })
      })
  }
}
module.exports = CartRoutes
