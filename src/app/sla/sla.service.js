(function() {
	'use strict';

	angular
		.module('app.sla')
		.factory('slaservice', ['$http', 'coreservice', 'userservice', slaservice]);

	slaservice.$inject = [];

	function slaservice($http, coreservice, userservice) 
	{
		var revisions = [];
		var slaData = [];
		var tableData = {"Jan": {}, "Feb": {}, "Mar": {}, "Apr": {}, "May": {}, "Jun": {}, "Jul": {}, "Aug": {}, "Sep": {}, "Oct": {}, "Nov": {}, "Dec": {}};

		var service = {
			getClickeSlaData: getClickeSlaData,
			setRevisions: setRevisions,
			getRevisions: getRevisions,
			getSlaDetails: getSlaDetails,
			setSlaData: setSlaData,
			getSlaData: getSlaData,
			setTableData: setTableData,
			getTableData: getTableData,
			putSlaData: putSlaData,
			getCustDialog: getCustDialog,
			setAllTableData: setAllTableData,
		};

		return service;

		function getClickeSlaData()
		{
			var data = coreservice.getSlaClickedView();
			return $http({
				method: "GET",
				url: coreservice.getServerHost() + "/apig/v2/clients/" + data.client_eai + "/services/" + data.service_id + "/engagements?apig_token=" + userservice.getApigToken()
			});
		}

		function getSlaDetails(id)
		{
			return $http ({
				method: "GET",
				url: coreservice.getServerHost() + "/apig/v2/engagement/" + id + "?apig_token=" + userservice.getApigToken()
			});
		}

		function putSlaData(body)
		{
			return $http ({
				method: "PUT",
				headers: {'Content-Type': 'application/json'},
				data: body,
				url: coreservice.getServerHost() + "/apig/v2/engagement?apig_token=" + userservice.getApigToken()
			});
		}


		function setSlaData(data)
		{
			slaData = data;
		}

		function getSlaData()
		{
			return slaData;
		}

		function setRevisions(data)
		{
			revisions = data;
		}

		function getRevisions()
		{
			return revisions;
		}

		function setTableData(month,data)
		{
			tableData[month] = data;
		}

		function setAllTableData(data)
		{
			tableData = data;
		}

		function getTableData()
		{
			return tableData;
		}

		function getCustDialog(message, buttons, etc)
		{
			coreservice.custDialog(message, buttons, etc);
		}
	}		

})();