(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('userservice', ['$http', userservice]);

    userservice.$inject = [];

    function userservice($http) {

    	var apig_token = "";
    	var session_token = "";
        var service = {
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

        return service;

        function login(data) {
        	var server = "https://gateway84a.l7tech.com:8443";
        	server = "https://ec2-54-164-123-94.compute-1.amazonaws.com:8443";

        	return $http({
		        method : "POST",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        url : server + "/apig/v1/authn",
		        data : encodeURI("username=" + data.username + "&password=" + data.password)
        	});
        }

        function isLoggedIn(data) {
        	if (data !== {} && data.success && data.apig_token.length > 0) {
        		apig_token = data.apig_token;
        		return true;
        	} else if(apig_token.length > 0) {
        		return true;
        	}
        	return false;
        }

        function logout() {
        	apig_token = "";
        	session_token = "";
        	return true;
        }
    }
})();
