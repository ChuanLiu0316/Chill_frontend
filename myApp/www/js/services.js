var CHILL_JSON_API_ADDR = "https://chill-chill.herokuapp.com";



angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
    var chats = [{
    id: 0,
    name: 'Chris',
    lastText: 'food',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Chuan',
    lastText: 'Movie',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Hannah',
    lastText: 'Hang out',
    face: 'img/adam.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('ChillApi', function(){

    var cache = {};
    var authToken = window.localStorage['authToken'];
    function deleteCache(){
      cache = {};
    }

    function updateAuthToken(token){
      authToken = token;
      if (token){
        window.localStorage['authToken'] = token;
      } else {
        localStorage.removeItem('authToken');
      }
    } 
    function updateCache(key, value){
      cache[key] = value;
    }
    

    var chats = [{
      id: 0,
      name: 'Chris',
      lastText: 'food',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Chuan',
      lastText: 'Movie',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Hannah',
      lastText: 'Hang out',
      face: 'img/adam.jpg'
    }];

    var API = {

     "registerWithFacebook": function(email, firstName, lastName, facebookToken, callback){
      // HTTP REQ
      var req = {
        method : 'POST',
        url: CHILL_JSON_API_ADDR + '/register',
        timeout: 3000,
        data: {
          "email": email,
          "firstName": firstName,
          "lastName": lastName,
          "facebookAccessToken": facebookToken
        }
      };
      $http(req).
      success(function(data, status, headers, config){
        console.log('Register OK');
        updateAuthToken(data.authToken);
        callbackProcessor(callback, true, {});
      }).
      error(function(data, status, headers, config){
        console.log(data);
      });
      //HTTP REQ END
    },

    "getAllChill": function(email){
      var req = {
        method : 'POST',
        url : CHILL_JSON_API_ADDR + '/getAllChill',
        timeout: 3000,
        data: {
          'email': email
       
       } 
      } 

      $http(req).
      success(function(data, status, headers, config){
        console.log('get all chilled OK');
 
      }).
      error(function(data, status, headers, config){
        console.log('get all chiled failed');

      });

    },


    };

    return API


});
