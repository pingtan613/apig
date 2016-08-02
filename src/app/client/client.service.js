(function() {
    'use strict';

    angular
        .module('app.client')
        .factory('clientservice', ['$http', clientservice]);

    clientservice.$inject = [];

    function clientservice($http) {
        var service = {
            getRegisteredClient: getRegisteredClient
        };

        return service;

        function getRegisteredClient() {

        	var server = "https://gateway84a.l7tech.com:8443";
        	var apigTk = "";
        	var sessionTk = "";
        	var clientId = "";
        	var data = "";

        	return $http({
		        method : "GET",
		        url : server + "/apig/v1/px/eai/details?apig_token=" + apigTk + "&apig_session=" + sessionTk + "&eai=" + clientId
        	});
        }
    }
})();
