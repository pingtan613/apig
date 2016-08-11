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
        vm.getDataById = "";
        vm.category = {};
		vm.category.list = [
			{id: 1, name: 'firstfasd'},
	        {id: 2, name: 'second'},
	        {id: 3, name: 'third'},
	        {id: 4, name: 'fourth'},
	        {id: 5, name: 'fifth'},
		];
		vm.category.selected = { value: vm.category.list[0] };

		var list = [];

		//unique on eai number
		vm.getServices = function(bool) {
			if(bool)
			{
				serviceservice.getServices(bool).then(function(response) {					
					serviceservice.setServicesTrue(response.data.Services);
				});
			}
			else
			{
				serviceservice.getServices(bool).then(function(response){
					serviceservice.setServicesFalse(response.data.Services);

				})
			}
			
		}

		vm.getServicesForRegistration = function() {
			//TODO work out getting data from array with false

		}

		vm.saveServiceDetails = function() {
			// TODO send the data and ID to the backend to save details 
		}

		vm.getPublishedServices = function() {
			//TODO get all published services data for display. 
		}

		vm.getServiceDetails = function() {
			serviceservice.getServiceDetails(vm.getDataById.eai_number).then(function(response){
				serviceservice.setServiceData(response);
				console.log(response)
			});
			vm.list = vm.getServiceData();
			console.log(vm.list);
			vm.displayForm = true;
		}

		vm.getConsumedServices = function(){
			//TODO get all consumed services
		}


		// SET AND GET
		// for local page data

		vm.getDisplayForm = function(){
			return vm.displayForm; 
		}

		vm.getPublishedData = function(){
			return serviceservice.getServicesTrue();
		}

		vm.getUnpublishedData = function(){
			return serviceservice.getServicesFalse();
		}

		vm.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		}

		vm.getServiceData = function() {
			return serviceservice.getServiceData();
		}

    }




})();
