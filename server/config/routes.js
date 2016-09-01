var friends = require('./../controllers/friends.js');
var products = require('./../controllers/products.js');

module.exports = function (app){
  // ******************  customers  ******************
  app.get('/friends', function(req, res) {
      console.log(' **** app.get(/friends) ****** ');
       friends.index(req, res);
     });
  app.post('/login', function(req,res){
    console.log(' **** app.get(/login) ****** ');
    console.log('Received the login information');
    console.log(req.body);
    friends.login(req, res);
  });
  app.get('/customers', function (req, res){
    console.log(' **** app.get(/customers) ****** ');
     friends.getAllUsers(req, res);
  });
  app.post('/userLogin',  function (req, res){
      console.log(' **** routes.js *** app.get(/userLogin) ****** ');
      console.log('req.body: ', req.body);
      // req.body.email = 'admin@admin.com';
      friends.userLogin(req, res);
      // console.log('--------- friends.userLogin : res ---------');
      // console.log(res);
  });
  app.post('/addfriend', function(req, res){
    console.log(' **** routes.js *** app.post(/addfriends) ****** ');
    console.log(req.body);
    friends.addfriend(req, res);
  });
  app.get('/ministore/logout', function (req, res){
    console.log(' **** routes.js *** app.get(/ministore/logout) ****** ');
    friends.logout(req, res);
  });
  app.post('/remove', function (req, res){
    console.log(' **** routes.js *** app.post(/remove) ****** ');
    console.log(req.body);
    friends.removefriend(req, res);
  });

// ******************  products  ******************
  app.get('/products', function (req,res){
    console.log(' **** routes.js *** app.post(/products) ****** ');
    products.index(req, res);
  });

  app.post('/addproduct', function(req, res){
    console.log(' **** routes.js *** app.post(/addfriends) ****** ');
    console.log(req.body);
    products.addproduct(req, res);
  });

  app.post('/editProduct', function (req, res){
    console.log(' **** routes.js *** app.post(/editProduct) ****** ');
    console.log(req.body);
    products.editProduct(req, res);
  });

  app.post('/submitReview', function(req, res){
    console.log(' **** routes.js *** app.post(/submitReview) ****** ');
    console.log(req.body);
    products.submitReview(req, res);
  });
  app.post('/removeproduct', function (req, res){
    console.log(' **** routes.js *** app.post(/removeproduct) ****** ');
    console.log(req.body);
    products.removeproduct(req, res);
  });

  app.get('/product_info', function (req, res){
    console.log(' **** routes.js *** app.get(/product_info) ****** ');
    console.log('looking for the product with the product id: ', req.query.id);
    products.findproduct(req, res);

  });
  //****************** orders routes *************************
  app.get('/orders', function (req, res){
    console.log(' **** routes.js *** app.get(/orders) ****** ');
    console.log(req.body);
    products.order(req, res);
  });
  app.post('/orderproduct', function(req, res){
    console.log(' **** routes.js *** app.post(/orderproduct) ****** ');
    console.log(req.body);
    products.orderproduct(req, res);
  });
  app.post('/removeorder', function (req, res){
    console.log(' **** routes.js *** app.post(/removeorder) ****** ');
    console.log(req.body);
    products.removeorder(req, res);
  });

  app.get('/shopping', function (req, res){
    console.log(' **** routes.js *** app.get(/shopping) ****** ');
    console.log(req.body);
    //products.removeorder(req, res);
  });
  app.post('/sending', function (req, res){
    console.log(" *** backend routes process the following requests to back-end controller ***");
    console.log(req.body);
    friends.sendEmail(req, res);
  });
  };
