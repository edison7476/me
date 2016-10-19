order_app.controller('roomController', function($scope, $http) {

    $scope.today = new Date();
    $scope.rates= {};
    $scope.currency = "USD";
    $http.get('http://api.fixer.io/latest?base=USD')
    .then(function(res){
    $scope.rates= res.data.rates;
  });
    $scope.forExConvert = function (value){
      console.log(value);
      console.log($scope.rates);
      for(var currencyKey in $scope.rates){
        if(value === $scope.rates[currencyKey]){
        console.log("key = ", currencyKey, "value = ", value);
        $scope.currency = currencyKey;
        console.log("$scope.currency", $scope.currency);
        }
      }
    };

// setting the check out date to be at lease one day after the check In date
    $scope.checkOut = function (guest){
      console.log("guest.checkInDate = ", guest.checkInDate);
      var checkOutMin = new Date();
      var checkOutDate = guest.checkInDate;
      // console.log("checkOutDate = ", checkOutDate.getDate()+1);
      // $scope.checkOutMin =
      console.log("guest.checkOutMin= ", checkOutMin.setDate(checkOutDate.getDate()+1));
      $scope.guest.checkOutMinDate = checkOutMin;
      console.log("$scope.guest.checkOutMinDate = ", $scope.guest.checkOutMinDate);
    };
    console.log("$socpe.today =", $scope.today);
    // console.log("checkOutdate = ", checkOutdate);


    $scope.roomData = [

        {
            "image_url": "https://www.norone.com/nor1images/h-008/000153/small/00001717.jpg",
            "short_desc": "Queen Bed with Lanai Access",
            "long_desc": "Enjoy floor to ceiling windows with sliding glass door opening directly to a Sun Deck furnished with patio furniture and located on the 5th floor for your comfort and convenience during your stay.",
            "item_id": 100,
            "room_code": "QUEEN",
            "price": "$20 extra per night",
            "room_price": 80
        },

        {
            "image_url": "https://www.norone.com/nor1images/h-008/000153/small/00001701.jpg",
            "short_desc": "King Bed with Lanai Access",
            "long_desc": "King Bed with Lanai Access. Enjoy floor to ceiling windows with sliding glass door opening directly to a Sun Deck furnished with patio furniture for relaxing on the 5th floor during your stay.",
            "item_id": 101,
            "room_code": "KING",
            "price": "$25 extra per night",
            "room_price": 105
        },

        {
            "image_url": "https://www.norone.com/nor1images/h-008/000153/small/00001728.jpg",
            "short_desc": "Premier Suite with Lanai Access",
            "long_desc": "Enjoy this large open floor plan with dining area, living area including pullout sleeper sofa with attached King bedroom, wet bar, and refrigerator, featuring floor to ceiling windows with sliding glass door opening directly to a Sun Deck, ideal for meeting planners, executives or families looking for extra space.",
            "item_id": 102,
            "room_code": "SUITE",
            "price": "$30 extra per night",
            "room_price": 135
        },

        {
            "image_url": "https://www.norone.com/nor1images/h-026/000892/small/00011999.jpg",
            "short_desc": "Champagne and Strawberries",
            "long_desc": "Upon arrival, enjoy a combination of fresh strawberries and a bottle of chilled champagne from the comfort of your own guestroom.",
            "item_id": 103,
            "price": "$100 extra",
            "room_price": 100
        }
    ];



    $scope.bookRoom = function (room){
      $scope.bookingInfo = {};
      console.log('room = ', room);
      $scope.bookingInfo.roomInfo = room;
      console.log('bookingInfo adding roomInfo', $scope.bookingInfo);
    };

    $scope.confirmRoom = function (guest){
      $scope.bookingInfo.guestInfo = guest;
      // $scope.bookingInfo.total_price = $scope.bookingInfo.roomInfo.room_price * ( ($scope.bookingInfo.guestInfo.checkOutDate - $scope.bookingInfo.guestInfo.checkInDate)/86400000 );
      console.log('bookingInfo adding guestInfo', $scope.bookingInfo.guestInfo);
      $scope.guest = {};
      $scope.room = {};
      console.log('After cleaning guest and room scope - book room info', $scope.bookingInfo);

      console.log("$scope.guest = ", $scope.guest);
      console.log("scope.room = ", $scope.room);
    };

    $scope.upgrade = function (upgradeOption){
      console.log('upgradeInfo = ', upgradeOption);
      $scope.bookingInfo.roomInfo = upgradeOption;
    };

    $scope.add = function (upgradeOption){
      console.log('upgradeInfo = ', upgradeOption);
      $scope.bookingInfo.ChampagneStrawberries= upgradeOption;
      console.log('After adding ChampagneStrawberries - book room info', $scope.bookingInfo);
    };

    $scope.remove = function (){
      // console.log('removeThis = ', removeThis);
      $scope.bookingInfo.ChampagneStrawberries= {};
      console.log('After removing ChampagneStrawberries - book room info', $scope.bookingInfo);
    };

    $scope.finalConfirm= function (bookingInfo){
      console.log('final confirmation', bookingInfo);
      var bookedRoomInfo = {
          first_name: bookingInfo.guestInfo.first_name,
          last_name: bookingInfo.guestInfo.last_name,
          email: bookingInfo.guestInfo.email,
          room_code: bookingInfo.roomInfo.room_code,
          item_id: bookingInfo.roomInfo.item_id,
          total: ($scope.bookingInfo.roomInfo.room_price * ( ($scope.bookingInfo.guestInfo.checkOutDate - $scope.bookingInfo.guestInfo.checkInDate)/86400000 ))+ bookingInfo.ChampagneStrawberries.room_price
      };
      console.log("bookedRoomInfo = ", bookedRoomInfo);
      //then pass bookedRoomInfo to factory
      /*
        bookRoomFactory.bookRoom(bookedRoomInfo, function (info){
          $scope.message = info;
        })*/
    };
    /*
      //in bookRoomFactory pass the data to backend throught route using $http

        myApp.factory('bookRoomFactory', function($http){
          var factory = {}
            factory.bookRoom = function (bookedRoomInfo, callback){
              $http.post('/bookingRoom', bookedRoomInfo)
              .then(function (info){
                callback(info);
              })
            })
          }
          return factory
      }

    */

    /*
      in our route we may have something like

      var bookRoomController = require('../controllers/bookRoom.js')
      module.exports = function(app){
     	app.post('/booking', function(req, res){
     		bookRoomController.book(req, res);
     	})

    */

});

// order_app.filter('capitalize', function() {
//   return function(input, scope) {
//     console.log(input);
//     console.log(typeof(input));
//     if (typeof(input) !== "undefined")
//     input = input.toLowerCase();
//     return input.substring(0,1).toUpperCase()+input.substring(1);
//   };
// });
