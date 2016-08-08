(function() {
    'use strict';

    angular
        .module('app.service')
        .controller('Service', Service);

    Service.$inject = ['serviceservice', '$location'];

    function Service(serviceservice, $location) {
        var vm = this;
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

		vm.services = []; //list of all services from list 
		vm.servicesData = []; //data for serivce picked for registration

		vm.getServices = function() {
			serviceservice.getServices().then(function(response) {
				console.log(response.data);
				console.log(response.status);

				//TODO put all in array
				
				//TODO display all true services
			});
		}

		vm.getServicesForRegistration = function() {
			//TODO work out getting data from array with false

		}

		vm.saveServiceDetails = function() {
			// TODO send the data and ID to the backend to save details 
		}


		vm.getServiceDetails = function() {
			vm.displayForm = true;

			//TODO once the serivce is picked send ID to get details
		}

		vm.getDisplayForm = function(){
			return vm.displayForm; 
		}






    }




})();
