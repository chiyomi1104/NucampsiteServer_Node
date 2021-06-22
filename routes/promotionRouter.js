const express = require('express')
const Promotion = require('../models/promotion')
const authenticate = require('../authenticate')
const promotionRouter = express.Router()
const cors = require('./cors')

promotionRouter
  .route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotions)
      })
      .catch((err) => next(err))
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log('Promotion Created ', promotion)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotion)
      })
      .catch((err) => next(err))
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /promotions')
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Promotion.deleteMany()
      .then((response) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(response)
      })
      .catch((err) => next(err))
  })

promotionRouter
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((campsite) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotion)
      })
      .catch((err) => next(err))
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`)
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((promotion) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotion)
      })
      .catch((err) => next(err))
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.prromotionId)
      .then((response) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(response)
      })
      .catch((err) => next(err))
  })

  module.exports = promotionRouter
