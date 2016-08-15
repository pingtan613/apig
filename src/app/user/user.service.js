(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('userservice', ['$http', 'coreservice', userservice]);

    userservice.$inject = [];

    function userservice($http, coreservice) {

    	var apig_token = "";
        var service = {
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout,
            getApigToken: getApigToken,
        };

        return service;

        function login(data) {
        	return $http({
		        method : "POST",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        url : coreservice.getServerHost() + "/apig/v2/user/authn",
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
        	return true;
        }

		function getApigToken(){
			return apig_token;
		}      
    }
})();
