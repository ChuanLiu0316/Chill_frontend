angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);

  };
})

.controller('LoginCtrl', function($scope, $stateParams, $state, $cordovaFacebook, $http){
  $scope.login = function() {
   $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      console.log(success);
    


      console.log('enter get request')
      /* register the user with all information and facebook token */
      $http.get("https://graph.facebook.com/v2.2/me", {
        timeout:3000,
        params: {
          access_token: success.authResponse.accessToken,
          fields: "first_name, last_name, email",
          format: "json"
        }
      })
      .then(function(fbInfoResult) {
        $state.go('tab.chats');
        console.log('alskdjlkjqwlekjlxczxc');
        console.log(fbInfoResult);
        /*$state.go('createAccount', {
          "email": fbInfoResult.data.email,
          "firstName": fbInfoResult.data.first_name,
          "lastName": fbInfoResult.data.last_name,
          "facebookAccessToken" : success.authResponse.accessToken
        });*/

      }, function(fbInfoError) {
        console.log('asdqwezxc');
        alert("There was a problem getting your Facebook Info. Please enter manually.");
        console.log(fbInfoError);
      });

      



    },function (error) {
        alert("There was a problem signing in.");
        console.log(error);
    });

  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
