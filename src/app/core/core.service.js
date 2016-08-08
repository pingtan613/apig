(function() {
    'use strict';

    angular
    	.module('app.core')
    	.factory('coreservice', [coreservice]);

    coreservice.$inject = [];

    function coreservice(){

    	var serverHost = "https://ec2-54-164-123-94.compute-1.amazonaws.com:8443";    	
    	var service = {
    		getServerHost: getServerHost
    	};

    	return service;
 
    	function getServerHost(){
    		return serverHost;
    	}
    }

 })();