
const express = require('express');
const Stripe = require('stripe');
const { Order } = require('../models/order');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router();


router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId.toString(),
      cart: JSON.stringify(req.body.cartItems.toString())
    }
  })


  const line_itemsValues = req.body.cartItems.map(item => {
    return {
      price_data: {
        currency: 'USD',
        product_data: {
          name: item.name,
          images: [item.imageUrl]
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({

    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true
    },

    customer: customer.id,
    line_items: line_itemsValues,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});


module.exports = router;