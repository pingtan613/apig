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
		vm.names =[];

		vm.category.selected = { };

		vm.categoryPicked = "";

		vm.requiredField = false;


		var unique = function(origArr) {
    		var newArr = [],
       		origLen = origArr.length,
       		found, x, y;

		    for (x = 0; x < origLen; x++) {
  		      found = undefined;
    		    for (y = 0; y < newArr.length; y++) {
    		        if (origArr[x].eai_number === newArr[y].eai_number) {
      		          found = true;
        	        break;
         	   		 }
       			}
        		if (!found) {
           		 newArr.push(origArr[x]);
       		 	}
    		}
   			 return newArr;
		}

		//unique on eai number
		vm.getServices = function(bool) {
			if(bool)
			{
				serviceservice.getServices(bool).then(function(response) {	
					console.log(response);	
					if(response.status < 400)
					{
						vm.showError = false;

						var arrUnique = unique(response.data.Services);
						serviceservice.setServicesTrue(arrUnique);
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

						var arrUnique = unique(response.data.Services);
						serviceservice.setServicesFalse(arrUnique);
					}
					else
					{
						serviceservice.setServicesFalse('');	
						vm.showError = true;
					}

				})
			}
			
		}



		var custDialog = function(text, buttonOptions, esc) {
			if (esc != true) esc = false;
    		jQuery("#dialog-confirm p").html(text);
    		jQuery( "#dialog-confirm" ).dialog({
    			title: "Notification",
    			closeOnEscape: esc,
	    		draggabe: false,
				resizable: false,
				width: 500,
				height:200,
				modal: true,
				buttons: buttonOptions
    		});
		}


		vm.saveServiceDetails = function() {
			console.log(vm.list.data);
			//serviceservice.register(vm.list.data).then(function(response){
			console.log(vm.requiredField);
				//if(response.status < 400)
				//{

					/*custDialog("Service registration completed Successfuly.", {
					"Edit Registered Service": function() {
						jQuery(this).dialog( "destroy" );
						$location.path("#/service/edit" + vm.list.data.eai_number);
					},
					"My Published Services": function() {
						jQuery(this).dialog( "destroy" );
						$location.path("#/service/published");
					}
					}, true);
					*/
					console.log("does this happen")
					var r = confirm("Service Registation Successful\nPlease click 'OK' to view the Service or click 'Cancel' to return to My Published Services")
					if(r)
					{
						$location.path("/service/edit/" + vm.list.data.eai_number);
					}
					else
					{
						$location.path("/service/published");
					}
				//}
				//else
				//{
					//Make Proper Diolog box
					//mark which fields are required.
					alert("please fill in required fields")
				//}
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

		var uniqueSearch = function(origArr) {
    		var newArr = [],
       		origLen = origArr.length,
       		found, x, y;

       		newArr.splice(0, newArr.length);

		    for (x = 0; x < origLen; x++) {
  		      found = undefined;
    		    for (y = 0; y < newArr.length; y++) {
    		        if (origArr[x] === newArr[y]) {
      		          found = true;
        	        break;
         	   		 }
       			}
        		if (!found) {
           		 newArr.push(origArr[x]);
       		 	}
    		}
   			 return newArr;
		}


		vm.getNameAndCat = function()
		{
			serviceservice.getSearchCategories().then(function(response){
				console.log(response.data);
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

			serviceservice.getSearchNames().then(function(response){
				console.log(response.data.result)
				if(response.status < 400)
				{
					for(var i = 0; i < response.data.result.length; i++){
						var item = [];
						
						item = response.data.result[i].eai_application_name;
						vm.names.push(item);

						item = response.data.result[i].operation_name + '(' + response.data.result[i].eai_application_name + ')';
						vm.names.push(item);
					}

					var arrUnique = uniqueSearch(vm.names);
					console.log(arrUnique);


				}
				else
				{
					//TODO error
				}
			});

		}

		vm.getNewNames = function(){
			vm.names.splice(0,vm.names.length);	
			console.log(vm.names);
			serviceservice.getNamesWithCat(vm.categoryPicked[0].name).then(function(response){
				console.log(response.data);
				if(response.status < 400)
				{
					for(var i = 0; i < response.data.result.length; i++){
						var item = [];
						
						item = response.data.result[i].eai_application_name;
						vm.names.push(item);

						item = response.data.result[i].operation_name + '(' + response.data.result[i].eai_application_name + ')';
						vm.names.push(item);
					}

					var arrUnique1 = uniqueSearch(vm.names);
					console.log(arrUnique1);


				}
				else
				{
					//TODO error
				}
			});
		}

		vm.seachServices = function() {
			console.log(vm.categoryPicked);
		}

		var fakeConsumed = [
			
			{
				serviceNameID: "AddressService (4321) - validateAddress",
				linkSLA: "#/sla/view/4321",
			},
			{
				serviceNameID: "Platinum Exchange (6514) - pxOperation",
				linkSLA: "#/sla/view/6514",
			}
		];


		vm.consumedService = function(){
			console.log(fakeConsumed);
			return fakeConsumed;
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
