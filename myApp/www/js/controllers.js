angular.module('starter.controllers', [])

.controller('ChatCtrl', function($scope, $interval, $http, $ionicScrollDelegate) {
  $scope.data = {};
  $scope.data.message = "";
  $scope.messages = {};
  $scope.data.username = "";
  $scope.data.group = "chill";

  var stop;
  var scrollBottom = function(){
    $ionicScrollDelegate.resize();
    $ionicScrollDelegate.scrollBottom(true);
  };

  $scope.getMessages = function(){
    if (angular.isDefined(stop)) return;
    data = {'group': $scope.data.group};
    url = "chill-chill.herokuapp.com/receive";
    stop = $interval(function(){
      $http.post(url, data).then(function(messages){
        $scope.messages = messages;
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

  $scope.sendMessage = function(msg){
    data = {"sender": $scope.data.username, "group": $scope.data.group, "content": msg};
    url = "chill-chill.herokuapp.com/send";
    $http.post('/', data, function(data){
      scrollBottom();

    });
    $scope.data.message = "";
  };

  $scope.getMessages();
})

.controller('ChillCtrl', function($scope, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.get = function(){
    var req = {
        method : 'POST',
        url : CHILL_JSON_API_ADDR + '/getAllChill',
        timeout: 3000,
        data: {
          'email': window.localStorage['email']
       
       } 
      } 

      $http(req).
      success(function(data, status, headers, config){
        console.log('get all chilled OK');
 
      }).
      error(function(data, status, headers, config){
        console.log('get all chiled failed');

      });

    
  }
  $scope.join = function(chat){

  }
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
                          window.localStorage['email'] = fbInfoResult.data.email
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

.controller('AccountCtrl', function($scope, $http) {

  $scope.isChill = false
  $scope.type = ""
  $scope.time = ""
  $scope.people = ""
  $scope.description = ""


  $scope.data = {
   
    'type' : '',
    'time' : '',
    'people' : '',
    'description': ''
  }
  $scope.setchill = function(){
    document.getElementById('chill').className = 'button button-balanced'
    document.getElementById('unchill').className += ' inactive'
    $scope.isChill = true;
  };

  $scope.setunchill = function(){
    document.getElementById('unchill').className = 'button button-balanced'
    document.getElementById('chill').className += ' inactive'
    $scope.isChill = false;
  };

  $scope.updatechill = function(){
    console.log($scope.isChill)
    console.log($scope.data.type);
    console.log($scope.data.people);
    console.log($scope.data.time);
    console.log($scope.data.description);




   var req = {
      method : 'POST',
      url : CHILL_JSON_API_ADDR + '/getAllChill',
      timeout: 3000,
      data : {
        'isChill': $scope.isChill,
        'type' : $scope.data.tyle,
        'email': window.localStorage['email']
       }
    }

    $http(req).
      success(function(){

      }).
      error(function(){

     }) 

  };

});
