angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, $state, TruckService){
  // Set default to user mode
  $scope.vendorMode= false;
  $scope.vendorLoggedIn= false;

  $scope.logoutVendor = function() {
    TruckService.logoutVendor();
  };

  // Toggles between user and vendor modes on click
  $scope.toggleVendorView = function() {
    // IF toggle clicked from vendor mode, switch to user mode
    if ($scope.vendorMode){
      $scope.logoutVendor();
        $scope.vendorLoggedIn = false;
        $scope.vendorMode = false;
        $state.go('tab.map');
    }
    // IF toggle clicked from user mode, switch to vendor mode
    else {
      $state.go('tab.vendorlogin');
      $scope.vendorMode = true;
    }
  };

  // Return current mode
  $scope.isVendor = function() {
      if ($scope.vendorMode) {
        return true;
      }
      return false;
    };

  // Return current mode
  $scope.isLoggedIn = function() {
      if (localStorage.vendorLoggedIn === "true") {
        return true;
      }
      return false;
    };
})

.controller('VendorLoginCtrl', function($scope, $q, $rootScope, $state, TruckService){
  $scope.loginVendor = function(login){

    console.log("LOGGING IN");
    TruckService.loginVendor(login).then(function(vendor){
      $state.go('tab.vendordashboard');

      // $rootScope.vendorLoggedIn = true;
      console.log("VENDOR logged in", vendor);
    });
  };
})

.controller('VendorsignupCtrl', function($scope, TruckService){
  $scope.signup = function(vendor){
    console.log("SIGN UP");
    TruckService.signup(vendor);
  };
})


.controller('VendordashboardCtrl', function($scope, $cordovaFileTransfer, TruckService, $q){

  $scope.currentVendor = JSON.parse(localStorage.currentVendor);
  $scope.dropPin = function(post, vendorId){
    $cordovaGeolocation.getCurrentPosition().then(function(position){
      console.log("RELOG POS", position);
      var id = $scope.vendorData.id
      console.log("SHOW",post);
        post.lat = position.coords.latitude,
        post.lng = position.coords.longitude
      TruckService.dropPin(post, id)
      .success(function(data) {
        console.log("YAY", data)
      })
      .error(function(err) {
        console.log('err', err);
      })
    });
  };
})

.controller('ListviewCtrl', function($scope, TruckService){
  $scope.trucks = TruckService.all();
  $scope.remove = function(truck) {
    TruckService.remove(truck);
  };
})

.controller('HomeCtrl', function($scope){

})

.controller('EditCtrl', function($scope){

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, TruckService) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  console.log("INITIALIZING MAP");
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    console.log("RELOG POS");
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      title: 'You are here',
      icon: 'http://www.euroheat.co.uk/images/you-are-here-icon.png'
    });

    marker.setMap($scope.map);

    $scope.trucks = TruckService.all();
    $scope.trucks.forEach(function(truck) {
      var marker = new google.maps.Marker({
        position: truck.location,
        map: $scope.map,
        title: truck.name,
      });

      marker.setMap($scope.map);
    });
  }, function(error){
    console.log("Could not get location");
  });
})

.controller('FavMapCtrl', function($scope, $state, $cordovaGeolocation, TruckService) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  console.log("INITIALIZING MAP");
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    console.log("RELOG POS");
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("fav-map"), mapOptions);
    console.log('map',$scope.map);
    var marker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      title: 'You are here',
      icon: 'http://www.euroheat.co.uk/images/you-are-here-icon.png'
    });

    marker.setMap($scope.map);

    // $scope.trucks = TruckService.all();
    TruckService.getTrucks().then(function(trucks) {
      $scope.trucks = trucks;
      $scope.trucks.forEach(function(truck) {
        var marker = new google.maps.Marker({
          position: truck.location,
          map: $scope.map,
          title: truck.name,
          // icon: 'image4388.png',
        });

        marker.setMap($scope.map);
      });
    });

    }, function(error){
    console.log("Could not get location");
  });
})

.controller('SearchMapCtrl', function($scope, $state, $cordovaGeolocation, TruckService) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  console.log("INITIALIZING MAP");
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    console.log("RELOG POS");
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("search-map"), mapOptions);
    console.log('map',$scope.map);
    var marker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      title: 'You are here',
      icon: 'http://www.euroheat.co.uk/images/you-are-here-icon.png'
    });

    marker.setMap($scope.map);

    // $scope.trucks = TruckService.all();
    TruckService.getTrucks().then(function(trucks) {
      $scope.trucks = trucks;
      $scope.trucks.forEach(function(truck) {
        var marker = new google.maps.Marker({
          position: truck.location,
          map: $scope.map,
          title: truck.name,
          // icon: 'image4388.png',
        });

        marker.setMap($scope.map);
      });
    });

    }, function(error){
    console.log("Could not get location");
  });
})



.controller('SearchCtrl', function($scope, TruckService) {
  $scope.trucks = TruckService.all();
  $scope.remove = function(truck) {
    TruckService.remove(truck);
  };
})

.controller('DetailviewCtrl', function($scope, $stateParams, TruckService) {
  // $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  //   viewData.enableBack = true;
  // });
  $scope.truck = TruckService.get($stateParams.truckId);

  var mapOptions = {
    // center: {lat: -34.397, lng: 150.644},
    center: $scope.truck.location,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.map = new google.maps.Map(document.getElementById("map-detail"), mapOptions);

  var marker = new google.maps.Marker({
    position: $scope.truck.location,
    // position: {lat: -34.397, lng: 150.644},
    map: $scope.map,
    title: 'Truck name'
  });

  marker.setMap($scope.map);
})

.controller('FavoritesCtrl', function($scope) {

});
