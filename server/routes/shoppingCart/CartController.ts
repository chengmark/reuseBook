import { Request, Response } from 'express'
import Cart from '../../models/ShoppingCart'
import { ListUserProduct, AddProduct } from './params'

const CartController = {
  // get all products of a user
  listUserProduct: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <ListUserProduct>(<unknown>req.body)
    Cart.findOne({ userId: userId })
      .populate('items.product')
      .exec((err: any, data: any) => {
        if (err) return res.status(500).send(err)
        res.status(200).send(data)
      })
  },
  // add product by userId, since Cart and User is 1 to 1 relation
  // userId is sufficient to identify the Cart
  // not sure error handling is done or not...
  addProduct: async (req: Request, res: Response): Promise<void> => {
    const { userId, productId, quantity } = <AddProduct>(<unknown>req.body)
    const item = <any>{ productId: productId, quantity: quantity }
    Cart.updateOne({ userId: userId }, { $push: { items: item } }, { upsert: false }, (err, result) => {
      if (err) return res.status(500).send(err)
      res.status(200).send(result)
    })
  },
}

export default CartController
