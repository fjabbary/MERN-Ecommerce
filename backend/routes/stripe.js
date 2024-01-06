
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
      cart: JSON.stringify(req.body.cartItems)
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



// Create Order
const createOrder = async (customer, data) => {
  const Items = JSON.parse((customer.metadata.cart));

  console.log(Items);

  // const newOrder = new Order({
  //   userId: customer.metadata.userId,
  //   customerId: data.customer,
  //   payment_IntentId: data.payment_Intent,
  //   products: Items,
  //   subtotal: data.amount_subtotal,
  //   total: data.amount_total,
  //   shipping: data.customer_details,
  //   payment_status: data.payment_status
  // })

  // try {
  //   const savedOrder = await newOrder.save();
  //   console.log("Processed order", savedOrder);

  // } catch (error) {
  //   console.log(error);
  // }
}




// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = "whsec_6c73ec7eac822fb9898232404e7f163c63ac4a2b9eaa61e240aece3690607aed";

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('Webhook Verified');
    } catch (err) {
      console.log('Webhook Failed', err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;


  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }


  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then(customer => {

      createOrder(customer, data);

    })
      .catch(e => {
        console.log(e.message);
      })
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});


module.exports = router;