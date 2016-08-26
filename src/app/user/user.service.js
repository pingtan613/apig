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

        /**
         * @param  {data} -- stores the username and password
         * @return returns the https call to the login api
         */
        function login(data) {
        	return $http({
		        method : "POST",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        url : coreservice.getServerHost() + "/apig/v2/user/authn",
		        data : encodeURI("username=" + data.username + "&password=" + data.password)
        	});
        }

        /**
         * @param  {data} -- checking if the login was successful by checking the data returned from the login call
         * @return return ture or false depending if the login was a success or failure
         */
        function isLoggedIn(data) {
        	if (data !== {} && data.success && data.apig_token.length > 0) {
        		apig_token = data.apig_token;
        		return true;
        	} else if(apig_token.length > 0) {
        		return true;
        	}
        	return false;
        }

        /**
         * @return emptys the apig token so an api call cannot be made. 
         * returns true saying log out successful.
         */
        function logout() {
        	apig_token = "";
        	return true;
        }

        /**
         * @return returns the apig token for use with every api call. 
         */
		function getApigToken(){
			return apig_token;
		}      
    }
})();
