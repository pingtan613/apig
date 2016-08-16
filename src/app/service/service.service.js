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
    	var categoriesList = [];

    	var service = {
    		getServiceDetails: getServiceDetails,
    		register: register,
    		getServices: getServices,
    		getServicesTrue: getServicesTrue,
    		setServicesTrue: setServicesTrue,
    		getServicesFalse: getServicesFalse,
    		setServicesFalse: setServicesFalse,
    		setServiceData: setServiceData,
    		getServiceData: getServiceData,
    		getSearchCategories: getSearchCategories,
    		getCategories: getCategories,
    		setCategories: setCategories,
    		getSearchNames: getSearchNames,
    		getNamesWithCat: getNamesWithCat,
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

	    function getSearchCategories()
	    {
	    	return $http({
	    		method: "GET",
	    		url: coreservice.getServerHost() + "/apig/v2/categories?apig_token=" + userservice.getApigToken()
	    	});
	    }

	    function getSearchNames()
	    {
	    		return $http({
	    			method:"GET",
	    		url: coreservice.getServerHost() + "/apig/v2/services?apig_token=" + userservice.getApigToken()
	    		});
	    	
	    }

	    function getNamesWithCat(cat)
	    {
	    	var and = encodeURI('&');
	    	console.log(and);
	    	var encode = encodeURI(cat.name);
	    	console.log(encode);
	    	return $http({
	    		method: "GET",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},

	    		url: coreservice.getServerHost() + "/apig/v2/services?apig_token=" + userservice.getApigToken() + "&category=" + encode

	    	});
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

	    function setCategories(data)
	    {
	    	categoriesList = data;
	    }

	    function getCategories()
	    {
	    	return categoriesList;
	    }
	}
})();