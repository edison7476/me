//################# 'FriendsFactory' ########################
    order_app.factory('FriendsFactory', function($http){
      var friends = [];
      var customers = [];
      var factory = {};
      var error = '';
      // var user = null;
      var sentMessage = "Successfully sent!";

// callback = function (data){ $scope.friends = data;};
      factory.index = function (callback){
        $http.get('/friends')
        .success(function(friends){
          callback(friends); //passing friends bacl to the angular controller using callback
        });
      };

      factory.getAllUsers = function (callback){
        $http.get('/customers')
        .then(function(customers){
          callback(customers);
        });
      };
      // factory.login = function (info, callback){
      //   console.log('----- factory.login ------');
      //   console.log('----- login information ------');
      //   console.log(info);
      //   return $http.post('/login', info)
      //   .then(function(loginResponse){
      //     console.log('index.html - facotry.login - response', loginResponse);
      //     return loginResponse;
      //   });
      // };
        // factory.getFamily2 = function() {
        //   $http.get('/family.json').then(function(result) {
        //   family = result.data;
        //   console.log(family); // I see the objects!
        //   return family; // this doesn't return the data like getFamily() does - why???
        //     });
        //   }

      factory.sendEmail = function (info, callback){
        console.log('----- factory.sendEmail ------');
        console.log('------ front-end factory received the following information ----');
        console.log(info);
        $http.post('/sending', info).success(function(){
          callback(sentMessage);
        });
      };
      factory.userLogin = function (info, callback){
        console.log('------ Angular front-end factory.userLogin received the following information ----');
        console.log(info);
        var UserInfo = {
          email: info.email
        };
        $http.post('/userLogin', UserInfo)
        .success(function(){
          console.log('----- Angular front-end factory.userLogin successfully got response from server---');
          console.log('--- Running callback function ---');
          callback();
        });
      };

      factory.create = function (info, callback){
        console.log('----- factory.create ------');
        $http.post('/addfriend', info)
        .success(function (){
          console.log('----- factory.create ---receiving the following info---');
          // console.log('success(function (friends) = ', friends);
          callback();
        });
        // .error(function (response){
        //   console.error('index.html - register error -  response', response);
        //   error = response.errors.firstName.message;
        //   console.log('return error:', error)
        //   callback( error)
        // });
      };
      factory.remove = function (info, callback){
        console.log('Removing the following user: ',info);
        $http.post('/remove', info)
        .success(function (customer){
          callback(customer);
        });
      };
      return factory;
    });

//################# 'ProductsFactory' ########################
    order_app.factory('ProductsFactory', function ($http){
      products = [];
      factory = {};

      factory.index = function (callback){
        console.log('** ProductsFactory -- factory.index **');
        $http.get('/products').success(function (products){
          callback(products);
        });
      };
      factory.getInfo = function (info, callback){
        console.log('** ProductsFactory -- factory.getInfo **');
        //console.log(/products/:product_id);
        console.log("factory.getInfo:", info);
        $http.get('/product_info', {params: {id: info}})
        .success(function(product){
          callback(product);
        });
      };

      factory.create = function (info, callback){
        // var jsonData = { 'name':info.name, 'price':info.price ,'qty':info.qty}
        // console.log(jsonData);
        console.log(info);
        console.log('----- factory.create ------');
        $http.post('/addproduct', info)
        .success(function (products){
          callback(products);
        });
      };
      factory.editProduct = function (product, callback){
        console.log('** ProductsFactory -- factory.editProduct **');
        console.log('editProduct: ', product );
        // reorganize the input information
        // if editingProduct.name == null {
        //   editingProduct.name = exsitingProduct.name
        // }
        // if editingProduct.price == null {
        //   editingProduct.price = exsitingProduct.price
        // }
        // if editingProduct.qty == null {
        //   editingProduct.qty = existingProduct.qty
        // }
        // if editingProduct.url == nul {
        //   editingProduct.url = existingProduct.url
        // }

        $http.post('/editProduct', product)
        // .success(function (productInfo){
        //   callback(productInfo);
        // });
      };
      factory.submitReview = function(customer, product, review, callback){
        console.log(" ** ProdcutsFactory: factory.submitReview **");
        // console.log(customer, product, review);
        var reviewInfo = {
          customerId: customer._id,
          customerName: customer.firstName,
          productId:product._id,
          productName: product.name,
          reviewText: review
        };
          console.log("reviewInfo", reviewInfo);
        $http.post('/submitReview', reviewInfo)
        .success(function (productReviews){
          callback(productReviews);
        });
      };

      factory.remove = function (info, callback){
        console.log('Removing the following user: ',info);
        $http.post('/removeproduct', info)
        .success(function (product){
          callback(product);
        });
      };

      return factory;
    });
//################# End of 'ProductsFactory' ########################

//################# 'OrdersFactory' ########################
order_app.factory('OrdersFactory', function($http){
    factory = {};
    orders = [];
    factory.index = function (callback){
      console.log('** OrdersFactory -- factory.index **');
      $http.get('/orders')
      .success(function (orders){
        callback(orders);
      });
    };

    factory.order = function (info, callback){
      console.log('order information', info);
      // var jsonData = {'customer':info.customer, 'product':info.product, 'qty':info.qty};
      console.log('*** factory.order info: ', info);
      $http.post('/orderproduct', info)
      .success(function (order){
        callback(order);
      });
    };
    factory.remove = function (info, callback){
      $http.post('/removeorder', info).success(function (order){
        callback(order);
      });
    };
    return factory;
});
//################# End of 'OrdersFactory' ########################
