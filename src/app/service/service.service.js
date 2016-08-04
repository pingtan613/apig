(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('userservice', ['$http', serviceservice]);

    serviceservice.$inject = [];

    function serviceservice($http){
    	

    	function getServiceDetail(serviceId)
    	{
    		var server = "https://ec2-54-164-123-94.compute-1.amazonaws.com:8443";

    		return $http({
	        method : "GET",
	        url : server + "/apig/v1/px/eai/details?apig_token=" + $rootScope.apigTk + "&apig_session=" + $rootScope.sessionTk + "&eai=" + serviceId
    		});
    	}

    	function register(data) 
    	{
    		var server = "https://ec2-54-164-123-94.compute-1.amazonaws.com:8443";
 			
 			return $http({
 				method : "POST",
	        	headers: {'Content-Type': 'application/json'},
	        	data: data,
	        	url : server + "/apig/v1/eai/register/service?apig_token=" + $rootScope.apigTk + "&apig_session=" + $rootScope.sessionTk
	    	});
	    }
	}
})();