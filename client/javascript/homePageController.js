order_app.controller('homePageController', function($scope, $window, $timeout, FriendsFactory, $location) {
  // $scope.$on('$viewContentLoaded', function ()
  // {
  //   // javascript code here
  // });

  $scope.$on = ('$viewContentLoaded', function (){
    console.log('homePageController is activated');


  });
  $scope.$on('$viewContentLoaded', function(event) {
      $timeout(function() {
        console.log('homePageController is activated with $timeout');
      },0);
    });
  // $scope.load();
});
