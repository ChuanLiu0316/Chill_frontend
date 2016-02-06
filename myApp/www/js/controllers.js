angular.module('starter.controllers', [])

.controller('ChatCtrl', function($scope, $interval, $http) {
  $scope.data = {};
  $scope.data.message = "";
  $scope.messages = {};

  var stop;
  $scope.getMessages = function(){
    if (angular.isDefined(stop)) return;
    data = {'group': "hi"};
    stop = $interval(function(){
      $http.post('/', data).then(function(data){
        $scope.messages = data;
      })
    }, 1000);
  };

  $scope.getBubbleClass = function(username){
    var classname = 'from-them';
    if($scope.messageIsMine(username)){
      classname = 'from-me';
    }
    return classname;
  };

  $scope.messageIsMine = function(username){
    return $scope.data.username === username;
  };

  $scope.getMessages();
})

.controller('ChillCtrl', function($scope, Chats) {
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

.controller('LoginCtrl', function($scope, $stateParams, $state, $cordovaFacebook, $http, ChillApi){
  $scope.login = function() {
   $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      console.log(success);
    


      console.log('enter get request');
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

        ChillApi.registerWithFacebook(fbInfoResult.data.email,
                        fbInfoResult.data.first_name,
                        fbInfoResult.data.last_name,
                        success.authResponse.accessToken, function(){
                          $state.go('tab.chats');
                        });   


        
       
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
