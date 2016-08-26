(function () {
	'use strict';

	angular
		.module('app.wsdl')
		.factory('wsdlservice', ['$http', 'coreservice', 'userservice', 'serviceservice', wsdlservice]);

	wsdlservice.$inject= [];

	function wsdlservice($http, coreservice, userservice, serviceservice) {
		var wsdlList = [];
		var wsdlSubList = [];
		var wsdlOperationArray = [];
		var newWsdlOperations = [];

		var service = {
			getServiceEAI: getServiceEAI,
			getWsdlList: getWsdlList,
			setWsdlList: setWsdlList,
			getWsdlListArray: getWsdlListArray,
			getWsdlOpertations: getWsdlOpertations,
			setWsdlOperationsArray: setWsdlOperationsArray,
			getWsdlOperationsArray: getWsdlOperationsArray,
			setWsdlSubList: setWsdlSubList,
			getWsdlSubList: getWsdlSubList,
			postNewXMLWsdlOperations: postNewXMLWsdlOperations,
			postNewUrlWsdlOperations: postNewUrlWsdlOperations,
			setNewWsdlOperations: setNewWsdlOperations,
			getNewWsdlOperations: getNewWsdlOperations,
			postNewWsdl: postNewWsdl,
			custPopUp: custPopUp,

		};

		return service;

		function getWsdlList(id)
		{
			return $http({
				method: "GET",
				url: coreservice.getServerHost() + "/apig/v2/wsdl/" + id + "?apig_token=" + userservice.getApigToken()
			});
		}

		function getWsdlOpertations(id)
		{
			return $http({
				method: "GET",
				url: coreservice.getServerHost() + "/apig/v2/services/" + id + "/operations?apig_token=" + userservice.getApigToken()
			});
		}

		function postNewXMLWsdlOperations(data)
		{
			return $http({
				method: "POST",
				headers: {'Content-Type': "text/xml"},
				data: btoa(data),
				url: coreservice.getServerHost() + "/apig/v2/wsdl?apig_token=" + userservice.getApigToken()
			});
		}

		function postNewUrlWsdlOperations(data)
		{

			return $http({
				method: "POST",
				headers: {'Content-Type': "application/json"},
				data: data,
				url: coreservice.getServerHost() + "/apig/v2/wsdl?apig_token=" + userservice.getApigToken()
			});
		}

		function postNewWsdl(data, eai)
		{
			return $http({
				method: "POST",
				headers: {'Content-Type': "application/json"},
				data: data,
				url: coreservice.getServerHost() + "/apig/v2/services/" + eai + "/operations?apig_token=" + userservice.getApigToken()
			});
		}


		function setNewWsdlOperations(data)
		{
			newWsdlOperations = data;
		}

		function getNewWsdlOperations()
		{
			return newWsdlOperations;
		}

		function getServiceEAI()
		{		
			return serviceservice.getServiceData();
		}

		function setWsdlList(data)
		{
			wsdlList = data;
		}

		function getWsdlListArray()
		{
			return wsdlList;
		}

		function setWsdlOperationsArray(data)
		{
			wsdlOperationArray = data;
		}

		function getWsdlOperationsArray()
		{
			return wsdlOperationArray;
		}

		function setWsdlSubList(list)
		{
			wsdlSubList = list;
		}

		function getWsdlSubList()
		{
			return wsdlSubList;
		}

		function custPopUp(message, buttons, esc)
		{
			coreservice.custDialog(message, buttons, esc);
		}

	}
})();

