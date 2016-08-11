(function() {
    'use strict';

    angular
        .module('app.service')
        .factory('serviceservice',  ['$http', 'userservice', 'coreservice', serviceservice]);

    serviceservice.$inject = [];

    function serviceservice($http, userservice, coreservice){
    	var servicesTrue = [];
    	var servicesFalse = [];
    	var serviceDetails = [];

    	var service = {
    		getServiceDetails: getServiceDetails,
    		register: register,
    		getServices: getServices,
    		saveServiceDetails: saveServiceDetails,
    		getServicesTrue: getServicesTrue,
    		setServicesTrue: setServicesTrue,
    		getServicesFalse: getServicesFalse,
    		setServicesFalse: setServicesFalse,
    		setServiceData: setServiceData,
    		getServiceData: getServiceData,
    	};

    	return service;

    	function getServiceDetails(serviceId)
    	{
    		return $http({
	        method : "GET",
	        url : coreservice.getServerHost() + "/apig/v2/services/" + serviceId + "?apig_token=" + userservice.getApigToken()
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



	    //GET AND SET METHODS
	    function setServicesTrue(data)
	    {
	    	servicesTrue = data;
	    }

	    function getServicesTrue()
	    {
	    	return servicesTrue;
	    }

	    function setServicesFalse(data)
	    {
	    	servicesFalse = data;
	    }

	    function getServicesFalse()
	    {
	    	return servicesFalse;
	    }

	    function setServiceData(data)
	    {
	    	serviceDetails = data;
	    }

	    function getServiceData()
	    {
	    	return serviceDetails;
	    }
	}
})();