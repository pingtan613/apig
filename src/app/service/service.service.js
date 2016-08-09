(function() {
    'use strict';

    angular
        .module('app.service')
        .factory('serviceservice',  ['$http', 'userservice', 'coreservice', serviceservice]);

    serviceservice.$inject = [];

    function serviceservice($http, userservice, coreservice){
    	var service = {
    		getServiceDetail: getServiceDetail,
    		register: register,
    		getServices: getServices,
    		saveServiceDetails: saveServiceDetails

    	};

    	return service;

    	function getServiceDetail(serviceId)
    	{
    		return $http({
	        method : "GET",
	        url : coreservice.getServerHost() + "/apig/v2/services?apig_token=" + userservice.getApigToken() + "&eai=" + serviceId
    		});
    	}

    	function register(data) 
    	{
 			return $http({
 				method : "POST",
	        	headers: {'Content-Type': 'application/json'},
	        	data: data,
	        	url : coreservice.getServerHost() + "/apig/v2/services?apig_token=" + userservice.getApigToken() 
	    	});
	    }

	    function getServices(bool)
	    {
	    	return $http({
	    		method: "GET",
	    		url: coreservice.getServerHost() + "/apig/v2/user/current/services?apig_token=" + userservice.getApigToken() + "&service_registration=true&registered=" + bool
	    	});
	    }

	    function saveServiceDetails(data) 
	    {
	    	//TODO send all service details back to the APIG server for storage
	    }
	}
})();