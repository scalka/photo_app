// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'base64', 'starter.controllers', 'starter.services', 'btford.socket-io','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
//setting up route
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive, template for tabs
    .state('tab', {
    url: '/tab', // to navigate from browser
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  //child template of tabs
  .state('tab.community', {
    url: '/community',
    views: {
      'tab-community': {
        templateUrl: 'templates/tab-community.html',
        controller: 'CommunityCtrl'
      }
    }
  })

  .state('tab.collection', {
      url: '/collection',
      views: {
        'tab-collection': {
          templateUrl: 'templates/tab-collection.html',
          controller: 'CollectionCtrl'
        }
      }
    })
    .state('tab.collection-detail', {
      url: '/collection-detail/:id',
      views: {
        'collection-detail': {
          templateUrl: 'templates/collection-detail.html',
          controller: 'CollectionDetailCtrl'
        }
      }
    })
/* 3rd tab
  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'templates/tab-camera.html',
        controller: 'CameraCtrl'
      }
    }
  })
*/
  .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/community');

})
.controller('PictureControl', function($scope, $cordovaCamera, $ionicPopup, $timeout, $state){
  // function which takes as a parameter source of the photo
   $scope.takeImage = function(source) {
     //var to hold the source of photo
    switch (source) {
      case 1:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 2:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      saveToPhotoAlbum: false,
    //  correctOrientation: true  //Corrects Android orientation quirks
    };
    $cordovaCamera.getPicture(options).then(function(imageData){
      $scope.srcImage = "data:image/jpeg;base64," + imageData;
      $scope.srcImage = imageData;
    }, function(err) {
      console.log(err);
    });
  }
  // showing popup with prompt for item name and price
  $scope.showPopup = function(){
      $scope.data = {};
            var popup = $ionicPopup.show({
              template: ' Item <input type="text" ng-model="data.itemName">   <br> Price <input type="price" ng-model="data.itemPrice" > ',
              title: 'Description',
              scope: $scope,
              buttons: [
                { text:'Cancel' },
                { text: 'Save',
                  type: 'button-positive',
                  onTap: function(e){
                    return $scope.data;
                  }}
              ]
              });
              popup.then(function(res){
                console.log("clicked", res)
                console.log("clicked", popup)
                console.log("clicked", res)
              })
          }
});
