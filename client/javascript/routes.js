var order_app = angular.module('order_app', ['ngRoute', 'ngMessages']);
order_app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html'
        })
        .when('/about', {
            templateUrl: 'partials/aboutMe2.html'
        })
        .when('/projects', {
            templateUrl: 'partials/projects.html'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html'
        })
        .when('/resume', {
            templateUrl: 'partials/myResume.html'
        })
        .when('/math_programming', {
            templateUrl: 'partials//math_programming.html'
        })

        // Mini Store front-end routes
        .when('/ministore/home', {
            templateUrl: 'partials/main.html'
        })
        .when('/ministore/customers', {
            templateUrl: 'partials/customers.html'
        })
        .when('/ministore/orders', {
            templateUrl: 'partials/orders.html'
        })
        .when('/ministore/products', {
            templateUrl: 'partials/products.html'
        })
        .when('/ministore/viewProducts', {
            templateUrl: 'partials/products_customer.html'
        })
        .when('/ministore/products/:product_id', {
            templateUrl: 'partials/showProduct.html'
        })
        .when('/ministore/loginMethod',{
          templateUrl: 'partials/ministoreLogin.html'
        })
        .when('/ministore/shopping', {
            templateUrl: 'partials/googleapi.html'
        })

        // End of Mini Store front-end routes
        .when('/booking_demo',{
          templateUrl: 'partials/bookingDemo.html'
        })
        .otherwise({
            redirectTo: '/'
        });

});
