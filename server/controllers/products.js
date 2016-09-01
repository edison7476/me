// this is our product.js file located at /server/controllers/product.js
// note the immediate function and the object that is returned
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');
module.exports = (function() {
    return {
        // notice how index in the factory(client side) is calling the index method(server side)
        index: function(req, res) {
            console.log('----------- controller index method -----------');

            Product.find({}, function(err, products) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(products);
                }
            });
            //res.json([{name: "Andrew", age: 24}, {name: "Michael", age: 35}]);
        },
        findproduct: function(req, res) {
            console.log('----------- controller findproduct method -----------');
            console.log(' controller -- looking for the follwoing product in the database');
            Product.find({
                _id: req.query.id
            }, function(err, product) {
                console.log(req.query.id);
                console.log(product);
                if (err) {
                    console.log(err);
                } else {
                    res.json(product[0]);
                }
            });
        },
        order: function(req, res) {
            console.log('----------- controller orderstatus method -----------');
            console.log("*@*@*@*  Checking user's session data \n ", req.session);
            if(req.session.userLevel === 'admin'){
              Order.find({}, function(err, orders) {
                  if (err) {
                      console.log(err);
                  } else {
                      res.json(orders);
                  }
              });
            }
            else if(req.session.userLevel === 'user'){
              Order.find({customerId: req.session.userId}, function(err, orders) {
                  if (err) {
                      console.log(err);
                  } else {
                      res.json(orders);
                  }
              });
            }
        },
        addproduct: function(req, res) {
            console.log('---product.js ----- controller addproduct method -----------');
            console.log(req.body);
            var product = new Product({
                'name': req.body.name,
                'price': req.body.price,
                'qty': req.body.qty,
                'url': req.body.url
            });

            product.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        },
        submitReview: function(req, res) {
            console.log('---product.js ----- Back-end controller submitReview method -----------');
            console.log(req.body);
            Product.update({
                _id: req.body.productId
            }, {
                $push: {
                    reviews: {
                        customerName: req.body.customerName,
                        reviewText: req.body.reviewText
                    }
                }
            }, function(err, reviews) {
                if (err) {
                    console.log(err);
                } else {
                  console.log('updated the following data');
                  console.log(reviews);
                  res.json(reviews);
                }
            });
        },

        removeproduct: function(req, res) {
            console.log('---product.js ----- controller removeproduct method -----------');
            console.log(req.body);
            Product.remove({
                _id: req.body._id
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/#/ministore/products');
                }
            });
        },

        editProduct: function(req, res) {
            console.log('--- Back-end controller product.js - editProduct method -----------');
            console.log(req.body);
            Product.update({_id: req.body._id},
              {
                $set:{
                  'name': req.body.name,
                  'price': req.body.price,
                  'qty': req.body.qty,
                  'url': req.body.url
                }
              },
              function(err) {
                if (err) {
                    console.log(err);
                  }
                   else {
                    res.redirect('/');
                  }
            });
        },

        orderproduct: function(req, res) {
            console.log('---product.js ----- Back-end controller orderproduct method -----------');
            console.log('req.body =  ', req.body);
            var order = new Order({
                'customerId': req.body.customerId,
                'firstName': req.body.customerName[0],
                'lastName': req.body.customerName[1],
                'productId': req.body.product[0],
                'productName': req.body.product[1],
                'productPrice': req.body.product[2],
                'qty': req.body.qty
            });
            console.log('Back-end controller orderproduct inserted the following data into order database', order);
            // order.productId = req.body.product[0]
            Product.find({
                _id: order.productId
            }, function(err, result) {
                console.log(result);
                console.log('order qty:', req.body.qty);
                console.log('inventory qty:', result[0].qty);
                if (result[0].qty < req.body.qty) {
                    console.log('Order quantity exceeds the inventory');
                    res.send({
                        status:500, message: 'Order quantity exceeds qunatity available in stock.',type:'internal'
                    });
                } else {
                    Product.update({
                        _id: order.productId
                    }, {
                        '$inc': {
                            qty: -req.body.qty
                        }
                    }, function(err, result) {
                        console.log(' *** Found the following product', result);
                        if (err) {
                            console.log(err);
                        } else {
                            order.save(function(err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                  res.send({
                                      status:200, message: 'Your order has been successfully placed.',type:'internal'
                                  });
                                    // res.redirect('/');
                                }
                            });
                        }
                    }); // end of Product.update
                } // end of else statement
            }); // end og Product.find

        },
        removeorder: function(req, res) {
            console.log('---product.js ----- controller removeorder method -----------');
            console.log(req.body);
            Order.remove({
                _id: req.body._id
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        },

    }; // end of return
})(); // end of module.exports = function ()
