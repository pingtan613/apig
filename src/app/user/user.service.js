(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('userservice', ['$http', userservice]);

    userservice.$inject = [];

    function userservice($http, $scope) {
        var service = {
            login: login
        };

        return service;

        function login(data) {
        	console.log(data);
        	var server = "https://gateway84a.l7tech.com:8443";
        	server = "https://ec2-54-164-123-94.compute-1.amazonaws.com:8443";

        	$http({
		        method : "POST",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        url : server + "/apig/v1/authn",
		        data : encodeURI("username=" + data.username + "&password=" + data.password)
        	});
        }
    }
})();
