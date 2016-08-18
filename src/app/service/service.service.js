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
    	var search = [];
    	var names = [];

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
    		setSearchParam: setSearchParam,
    		getSearchParam: getSearchParam,
    		setFullServiceArray: setFullServiceArray,
    		getFullServiceArray: getFullServiceArray,
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
	    		url: coreservice.getServerHost() + "/apig/v2/services?apig_token=" + userservice.getApigToken() + "&state=active"
	    		});
	    	
	    }

	    function getNamesWithCat(cat)
	    {
	    	console.log(cat);
	    	var encode = encodeURI(cat);
	    	return $http({
	    		method: "GET",
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},

	    		url: coreservice.getServerHost() + "/apig/v2/services?apig_token=" + userservice.getApigToken() + "&category=" + encode  + "&state=active"

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

	    function setSearchParam(catPicked, searchText)
	    {
	    	search.splice(0,search.length);
	    	search.categoryPicked = catPicked;
	    	search.textSearch = searchText;
	    }

	    function getSearchParam()
	    {
	    	return search; 
	    }

	    function setFullServiceArray(arrayJson)
	    {
	    	var searchCat = getSearchParam();
	    	names = undefined;
	    	names = [];
	    	var fullServiceArray = undefined;
	    	var fullServiceArray = [];
	    	var cat = undefined;
	    	var title = "";
	    	var item = [];
	    	item.splice(0, item.length);

	    	for(var i = 0; i < arrayJson.length; i++)
	    	{
	    		title = arrayJson[i].eai_application_name + "(" + arrayJson[i].eai_number + ")";

	    		if(title !== cat && arrayJson[i].category === searchCat.categoryPicked)
	    		{
	    			fullServiceArray[title] = [];
	    			for(var j = 0; j < arrayJson.length; j++)
	    			{
	    				if(arrayJson[i].eai_application_name === arrayJson[j].eai_application_name)
	    				{
	    					fullServiceArray[title].push(arrayJson[j]);
	    				}


	    			}
	    			cat = title;
	    		}
	    		else if( title !== cat && searchCat.categoryPicked === "")
	    		{
	    			fullServiceArray[title] = [];
	    			for(var j = 0; j < arrayJson.length; j++)
	    			{
	    				if(arrayJson[i].eai_application_name === arrayJson[j].eai_application_name)
	    				{
	    					fullServiceArray[title].push(arrayJson[j]);
	    				}


	    			}
	    			cat = title;
	    		}
	    	}

	   		for(var i in fullServiceArray)
          	{
            	var item = [];
            	item.title = i;
           		item.data = fullServiceArray[i];
            	names.push(item);
          	}
	    }

	    function getFullServiceArray()
	    {
	    	return names;
	    }
	}
})();