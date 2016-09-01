/* global $ */

//################# 'FriendsController' '########################
order_app.controller('FriendsController', function($scope, $window, FriendsFactory, $location) {

    $scope.$on('$locationChangeSuccess', function($routeParams) {
        var path = $location.path();
        var product_id = $routeParams.product_id;
        // $scope.templateUrl = (path === '/ministore/') ? '/partials/miniStoreNav.html' : '/partials/normalNav.html';
        // $scope.templateUrl = (path === '/ministore/main'|| path === '/ministore/customers' || path === '/ministore/orders'|| path === '/ministore/products' || path === '/ministore/products/'+product_id )  ? '/partials/miniStoreNav.html' : '/partials/normalNav.html';
        $scope.templateUrl = (path === '/' || path === '/about' || path === '/projects' || path === '/contact' || path === '/resume' || path === '/math_programming') ? '/partials/normalNav.html' : '/partials/miniStoreNav.html';
    });

    FriendsFactory.index(function(data) {
        // set $scope.friends equal to the data we got from FriendsFactory
        $scope.user = data;
    });

    FriendsFactory.getAllUsers(function(customers) {
        $scope.customers = customers;
    });

    refreshUser = function() {
        FriendsFactory.index(function(data) {
            scope.user = data;
        });
    };

    refresh = function() {
        console.log('callback sends back data to the controller');
        FriendsFactory.getAllUsers(function(data) {
            console.log(data);
            $scope.customers = data; // set $scope.friends equal to the data we got from FriendsFactory
        });
        $scope.new_user = {}; //$scope.friends = FriendsFactory.index();
    };

    $scope.sendEmail = function() {
        console.log('ng-submit: sending email');
        console.log($scope.email);
        FriendsFactory.sendEmail($scope.email, function() {});
        $scope.email = {};
    };

    //ng-click addfriend 'Login function'
    $scope.addfriend = function() {
        console.log('ng-click addfriend');
        FriendsFactory.create($scope.new_user, function(data) {
            //console.log('error:', error)
            console.log('factory.create callback - success(function (friends) = ', friends);
            // refreshUser();
            scope.user = data;
        });
        $scope.new_user = {};
        // $location.url('/ministore/products');
        //the following code is the same as above
        $window.location.href = '/#/ministore/products';
        $window.location.reload();
    };

    $scope.userLogin = function(user) {
        console.log('Angular front-end controllers $scope.usrLogin activated');
        // console.log($scope.user);
        console.log('user: ', user);
        FriendsFactory.userLogin(user, function(data) {
            console.log(data);
            refreshUser();

        });
        $window.location.href = '/#/ministore/products';
        $window.location.reload();
    };
    $scope.adminLogin = function(admin) {
        console.log('Angular front-end controllers $scope.adminLogin activated');
        console.log('admin: ', admin);
        FriendsFactory.userLogin(admin, function() {
            refreshUser();
        });
        $window.location.href = '/#/ministore/products';
        $window.location.reload();
    };

    $scope.logout = function() {
        console.log('logout button clicked');
    };

    $scope.remove = function(customer) {
        console.log(customer);
        FriendsFactory.remove(customer, function() {
            refresh();
        });
    };
    //};// end of $scope.addfriend

    // // userlogin function
    // $scope.userlogin = function(){
    //   FriendsFactory.login($scope.user, function (){
    //     console.log('user loing using the follwoing information', $scope.user);
    //     })
    //     // .error(function (err){
    //     //   alert(err);
    //     // })
    //     .then(function (loginResponse){
    //       console.log('response from factory.login: ',loginResponse.data);
    //         $location.url('/main');
    //     });
    //
    // }; // end og userLogin function


    // userlogin function
    // $scope.userlogin = function(){
    //   FriendsFactory.login($scope.user, function (){
    //     console.log('user loing using the follwoing information', $scope.user);
    //     })
    //     .then(function (loginResponse){
    //       console.log('response from factory.login: ',loginResponse.data);
    //       if ( loginResponse.data.errorMsg == null){
    //         console.log('successfully logged in', loginResponse.data[0].firstName);
    //         $scope.user = loginResponse.data[0].firstName;
    //         $location.url('/ministore/home');
    //       }
    //       else{
    //         $scope.error = loginResponse.data.errorMsg;
    //         loginResponse.data.errorMsg = '';
    //         console.log('reset error');
    //       }
    //   });
    // }; // end og userLogin function

    // // ng-click addfriend
    // $scope.addfriend = function (){
    //   console.log('ng-click addfriend');
    //   FriendsFactory.create($scope.new_user, function (){
    //     console.log('error:', error)
    //   if(error === '')
    //   {  refresh();
    //     $location.url('/main');}
    //     else{
    //       $scope.error = error;
    //       error = '';
    //       console.log('reset error', error)
    //     }
    //   });
    // };
}); // end of FriendsController

//################# 'ProductsController' '########################
order_app.controller('ProductsController', function($scope, $location, $routeParams, ProductsFactory, FriendsFactory) {


    ProductsFactory.index(function(data) {
        $scope.products = data;
    });

    refresh = function() {
        console.log('callback sends back data to the controller');
        ProductsFactory.index(function(data) {
            $scope.products = data; // set $scope.friends equal to the data we got from FriendsFactory
        });
        $scope.new_product = {}; //$scope.friends = FriendsFactory.index();
    };
    // ng-click addfriend
    $scope.addproduct = function() {
        console.log('ng-click addproduct');
        ProductsFactory.create($scope.new_product, function() {
            refresh();
        });
        $location.url('/ministore/products');
    }; // end of $scope.addproduct

    $scope.editProduct = function(product) {
        console.log('ng-click editProduct');
        // console.log('$scope.editProduct', $scope.exsitingProduct);
        console.log("existing product information: ", product);
        ProductsFactory.editProduct(product, function() {
            refresh();
        });
        $location.url('/ministore/products');
    }; // end of $scope.editProduct

    $scope.remove = function(product) {
        console.log(product);
        ProductsFactory.remove(product, function() {
            refresh();
        });
    }; // end of $scope.remove
});
//################# End of 'ProductsController' '########################

//################# 'ProductsInfoController' '########################
order_app.controller('ProductsInfoController', function($scope, $location, $routeParams, ProductsFactory) {
    console.log('$routeParams: ', $routeParams);

    ProductsFactory.getInfo($routeParams.product_id, function(data) {
      console.log('ProductsFactory.getInfo', data);
        $scope.product = data;
    });

    refresh = function() {
        console.log('callback sends back data to the controller');
        ProductsFactory.getInfo(function(data) {
            $scope.products = data; // set $scope.friends equal to the data we got from FriendsFactory
        });
        $scope.new_product = {}; //$scope.friends = FriendsFactory.index();
    };
    // ng-click addfriend
});

//################# 'OrdersInfoController' '########################
order_app.controller('OrdersController', function($scope, ProductsFactory, FriendsFactory, OrdersFactory) {
    // console.log('$scope.product', $scope.product);
    ProductsFactory.index(function(data) {
        // console.log(data);
        $scope.products = data;
    });

    OrdersFactory.index(function(ordersData) {
        $scope.orders = ordersData;
    });

    FriendsFactory.index(function(data) {
        $scope.friends = data;
    });

    refresh = function() {
        // console.log('callback sends back data to the controller');
        OrdersFactory.index(function(data) {
            $scope.orders = data; // set $scope.friends equal to the data we got from FriendsFactory
        });
        $scope.new_order = {}; //$scope.friends = FriendsFactory.index();
    };
    reviewRefresh = function(product_id) {
      ProductsFactory.getInfo(product_id, function(data) {
        console.log('ProductsFactory.getInfo', data);
          $scope.product = data;
      });
      $scope.review = {};
    };
    $scope.order = function(customer, product, qty) {
        // console.log('ng-click order() ');
        // console.log(customer, product );
        orderInfo = {
            customerId:customer._id,
            customerName: [customer.firstName, customer.lastName],
            product: [product._id, product.name, product.price],
            qty: qty
        };
        console.log('orderInfo', orderInfo);
        OrdersFactory.order(orderInfo, function(data) {
            console.log(data);
            $scope.new_order = {};
            $scope.orderMsg = data.message;
            refresh();
            // console.log('successfully ordered');
        }); // end of $scope.oder
    };

    $scope.remove = function(order) {
        OrdersFactory.remove(order, function() {
            refresh();
        });
    }; // end of $scope.remove

    $scope.submitReview = function(customer, product, review) {
        console.log('$scope.submitReview activated');
        console.log('customer: ',customer,'prodcut: ', product, review);
        ProductsFactory.submitReview(customer, product, review, function() {
                    reviewRefresh(product._id);
                    $scope.review = {};
                // console.log(data);
                // $scope.product = data;
        });
    };
});

order_app.controller('dynamicWords', function($scope, $route) {
    $scope.load = function() {
        console.log('dynamicWords controller');
        jQuery('#but2').click(function (){
          console.log('btn2 clicked');
        });
        jQuery(document).on('click', '#btn2', function (){
          console.log('btn2 clicked');
        });
      };
      $scope.load();
}); // controller dynamicWords
// <ng-include src="$service('$route').current.template" scope="$service('$route').current.scope" onload="addjQueryToPartial()"></ng-include>
