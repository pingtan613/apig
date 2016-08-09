(function() {
    'use strict';

    angular
        .module('app.service')
        .controller('Service', Service);

    Service.$inject = ['serviceservice', '$location'];

    function Service(serviceservice, $location) {
        var vm = this;
        vm.bool = false;
        vm.displayForm = false;
        vm.category = {};
		vm.category.list = [
			{id: 1, name: 'firstfasd'},
	        {id: 2, name: 'second'},
	        {id: 3, name: 'third'},
	        {id: 4, name: 'fourth'},
	        {id: 5, name: 'fifth'},
		];
		vm.category.selected = { value: vm.category.list[0] };

		vm.servicestrue = []; //list of all services from list 
		vm.servicesfalse = []; //list of all services from list 
		vm.servicesData = []; //data for serivce picked for registration

		vm.getServices = function(bool) {
			if(bool)
			{
				console.log(bool)
				serviceservice.getServices(bool).then(function(response) {
				console.log(response.data);
				console.log(response.status);

					//TODO put all in array
				
					//TODO display all true services
				});
			}
			else
			{
				console.log(bool)
				serviceservice.getServices(bool).then(function(response) {
				console.log(response.data);
				console.log(response.status);

					//TODO put all in array
				
					//TODO display all true services
				});
			}
			
		}

		vm.getServicesForRegistration = function() {
			//TODO work out getting data from array with false

		}

		vm.saveServiceDetails = function() {
			// TODO send the data and ID to the backend to save details 
		}


		vm.publishedData = [{
			eai_number:"4321",
			title:"AddressService (SOAP)",
			edit:"#/service/edit/0000001234",
			view_client:"#/service/viewClients/0000001234",
			id:"1234-5678-9876-5432"
		},
		{
			eai_number:"1944",
			title:"PSALMSSRS (SOAP)",
			edit:"#/service/edit/1944",
			view_client:"#/service/viewClients/1944",
			id:"2345-6789-8765-4321"
		}];

		vm.getPublishedServices = function() {
			//TODO get all published services data for display. 
		}

		vm.getServiceDetails = function() {
			vm.displayForm = true;

			//TODO once the serivce is picked send ID to get details
		}

		vm.getDisplayForm = function(){
			return vm.displayForm; 
		}


		vm.isActive = function(viewLocation) {
			console.log(viewLocation === $location.path());
			return viewLocation === $location.path();
		}

		vm.consumedServices = [];

		vm.getConsumedServices = function(){
			//TODO get all consumed services
		}

    }




})();
