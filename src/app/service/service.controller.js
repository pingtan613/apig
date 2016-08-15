(function() {
    'use strict';

    angular
        .module('app.service')
        .controller('Service', Service);

    Service.$inject = ['serviceservice', '$location'];

    function Service(serviceservice, $location, $window) {
        var vm = this;
        vm.bool = false;
        vm.displayForm = false;
        vm.showError = false;
        var list = [];
        vm.getDataById = "";
        vm.category = {};
		vm.category.list = [];

		vm.category.selected = { };

		vm.categoryPicked = "";

		vm.requiredField = true;

		//unique on eai number
		vm.getServices = function(bool) {
			if(bool)
			{
				serviceservice.getServices(bool).then(function(response) {	
					console.log(response);	
					if(response.status < 400)
					{
						vm.showError = false;
						serviceservice.setServicesTrue(response.data.Services);
					}
					else
					{
						serviceservice.setServicesTrue('');
						vm.showError = true;
					}	
				});
			}
			else
			{
				serviceservice.getServices(bool).then(function(response){
					console.log(response);				
					if(response.status < 400)
					{
						vm.showError = false;
						serviceservice.setServicesFalse(response.data.Services);
					}
					else
					{
						serviceservice.setServicesFalse('');	
						vm.showError = true;
					}

				})
			}
			
		}

		vm.saveServiceDetails = function() {
			//serviceservice.register(vm.list.data).then(function(response){
				if(!vm.requiredField) //&& response.status < 400)
				{
					var r = confirm("Service Registation Successful\nPlease click 'OK' to view the Service or click 'Cancel' to return to My Published Services")
					if(r)
					{
						$location.path("/service/edit/" + vm.list.data.eai_number);
					}
					else
					{
						$location.path("/service/published");
					}
				}
				else
				{
					//Make Proper Diolog box
					//mark which fields are required.
					alert("please fill in required fields")
				}
			//});

		}

		vm.getServiceDetails = function() {

			serviceservice.getServiceDetails(vm.getDataById.eai_number).then(function(response){
				if(response.status < 400 )
				{
					vm.showError = false;
					serviceservice.setServiceData(response);
					vm.list = serviceservice.getServiceData();
					vm.displayForm = true;
				}
				else
				{
					vm.displayForm = false;
					vm.showError = true;
				}

			});
			
		}



		vm.getNameAndCat = function(){
			serviceservice.getSearchCategories().then(function(response){
				if(response.status < 400)
				{
					serviceservice.setCategories(response.data.tlc);

					for (var i = 0; i < response.data.tlc.length; i++) {
						for(var j = 0; j < response.data.tlc[i].categories.length; j++){
							var item = {};
							item.id = response.data.tlc[i].categories[j]
							item.name = response.data.tlc[i].categories[j]

							vm.category.list.push(item)
						}
					}
				}
				else
				{
					//TODO work error flow
				}
			});
		}

		vm.seachServices = function() {
			console.log(vm.categoryPicked);
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

		vm.getCategories = function() {
			return serviceservice.getCategories();
		}

    }




})();
