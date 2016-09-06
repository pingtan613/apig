(function() {
    'use strict';

    angular
        .module('app.service')
        .controller('Service', Service);

    Service.$inject = ['serviceservice', '$location', '$scope'];

    function Service(serviceservice, $location, $scope) {
        var vm = this;
        vm.bool = false;
        vm.displayForm = false;
        vm.display_error = false;
        vm.requiredError = false;
        vm.errorInfo = {};
        var list = [];
        vm.getDataById = "";
        vm.category = {};
		vm.category.list = [""];
		vm.names =[];
        vm.editList = [];

		vm.getClientListArrData = [];
        vm.newConsumedArr = {};

		vm.category.selected = { };

		vm.categoryPicked = "";
		vm.searchText = "";


		vm.requiredField = false;
		vm.showLink = false;


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
					if(response.status < 400)
					{
						vm.display_error = false;

						var arrUnique = unique(response.data.Services);
						serviceservice.setServicesTrue(arrUnique);
					}	
				},
		        function(data)
		        {
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
		        });
			}
			else
			{
				serviceservice.getServices(bool).then(function(response){			
					if(response.status < 400)
					{
						vm.display_error = false;

						var arrUnique = unique(response.data.Services);
						serviceservice.setServicesFalse(arrUnique);
					}

				},
		        function(data)
		        {
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
		        });
			}
		}

		vm.saveServiceDetails = function() {

			var numberData = 0;

			if(vm.list.data.services[0].eai_profile_name === "" || vm.list.data.services[0].interface === "" || vm.list.data.services[0].state === "")
			{
				vm.requiredError = true;
		        window.scrollTo(0, 0);

			}
			else
			{
				vm.requiredError = false;
				console.log(vm.list.data.services[0]);
				serviceservice.register(vm.list.data.services[0]).then(function(response){
					if(response.status < 400)
					{
						console.log(response.data)
						vm.display_error = false;
						vm.getCustDialog("Service Registation Successful<br>", {
	                		"Register Another Service": function() {
	                    		jQuery(this).dialog( "destroy" );
								numberData = 1; 
								vm.callback(1);                   		  
	                   		}, 
	                		"View Service": function() {
	                  			jQuery(this).dialog( "destroy" );
								numberData = 2;  
								vm.callback(2);                  		  
	                    		
	                		},
	                		"My Published Services": function() {
	                    		jQuery(this).dialog( "destroy" );
								numberData = 3;
								vm.callback(3);                    		  
	                    		
	                    	}
	                	});
					}
				
				console.log(numberData);

				},function(data)
		        {
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
		        });
			}
		}

		vm.callback = function(num)
		{
			console.log("callback" + num);
			switch(num) 
			{
				case 1: 
					vm.displayForm = false;
	            	$location.path("/service/register").replace();
	            	$scope.$apply();
	            	break;
	            case 2: 
	               	$location.path("/service/edit/" + vm.list.data.services[0].eai_number).replace();
	            	$scope.$apply();

	               	break;
	            case 3:
	              	$location.path("/service/published").replace();   
	            	$scope.$apply();

	              	break;
	            default:
	            	$location.path("/service/overview").replace();     
	            	$scope.$apply();


			}
		}

		vm.getServiceDetails = function() {

			serviceservice.getServiceDetails(vm.getDataById.eai_number).then(function(response){
				console.log(response.data.services);
				if(response.status < 400 )
				{
					vm.display_error = false;
					serviceservice.setServiceData(response);
					vm.list = serviceservice.getServiceData();
					vm.displayForm = true;
				}
			},
	        function(data)
	        {
	        	vm.displayForm = false;
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
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
				if(response.status < 400)
				{
					vm.display_error = false;
					serviceservice.setCategories(response.data.tlc);

					for (var i = 0; i < response.data.tlc.length; i++) {
						for(var j = 0; j < response.data.tlc[i].categories.length; j++){
							var item = "";
							item = response.data.tlc[i].categories[j]

							vm.category.list.push(item)
						}
					}
				}
			},
	        function(data)
	        {
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
	        });

			serviceservice.getSearchNames().then(function(response){
				if(response.status < 400)
				{
					vm.display_error = false;
					for(var i = 0; i < response.data.result.length; i++){
						var item = [];
						
						item = response.data.result[i].eai_application_name;
						vm.names.push(item);

						item = response.data.result[i].operation_name + '(' + response.data.result[i].eai_application_name + ')';
						vm.names.push(item);
					}

					var arrUnique = uniqueSearch(vm.names);

					serviceservice.setFullServiceArray(response.data.result);
				}
			},
	        function(data)
	        {
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
	        });
		}

		vm.getNewNames = function(){
			serviceservice.setSearchParam(vm.categoryPicked, vm.searchText);

			vm.names.splice(0,vm.names.length);	
			serviceservice.getNamesWithCat(vm.categoryPicked).then(function(response){
				display_error = false;
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
					serviceservice.setFullServiceArray(response.data.result);
				}
			},
	        function(data)
	        {
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
	        });
		}


		vm.editServiceDetails = function(serviceID) {
			serviceservice.getServiceDetails(serviceID).then(function(response) {
				if(response.status < 400)
				{
					vm.display_error = false;
					serviceservice.setServiceData(response);
					vm.list = serviceservice.getServiceData();
					vm.list = vm.list.data.services[0];

					if(vm.list.interface === "SOAP")
					{
						vm.showLink = true;
					}

					$location.path("/service/edit/" + vm.list.eai_number);
				}
			},
	        function(data)
	        {
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
	        });
		}

		var uniquePending = function(origArr) {
    		var newArr = [],
       		origLen = origArr.length,
       		found, x, y;

		    for (x = 0; x < origLen; x++) {
  		      found = undefined;
    		    for (y = 0; y < newArr.length; y++) {
    		        if (origArr[x].client === newArr[y].client) {
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

		vm.getPendingSLA = function()
		{
			serviceservice.getPendingSLA().then(function(response) {
				if(response.status < 400)
				{
					vm.display_error = false;
					var newArr = uniquePending(response.data.engagements);
					serviceservice.setPendingRequests(newArr);
				}
			},
			function(data)
	        {
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
	        });

		}





		vm.saveSearchParam = function() {
			serviceservice.setSearchParam(vm.categoryPicked, vm.searchText);
		}

		var uniqueConsumed = function(origArr) {
    		var newArr = [],
       		origLen = origArr.length,
       		found, x, y;

		    for (x = 0; x < origLen; x++) {
  		      found = undefined;
    		    for (y = 0; y < newArr.length; y++) {
    		        if (origArr[x].client === newArr[y].client) {
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

		vm.consumedService = function(){
			serviceservice.getConsumedServices().then(function(response) {
				if(response.status < 400)
				{
					vm.display_error = false;

					vm.newConsumedArr = uniqueConsumed(response.data.engagements);
				}
			},
			function(data)
	        {
	            vm.errorInfo = data.data;
	            vm.display_error = true;
	            window.scrollTo(0, 0);
	        });


		}

		vm.getClientList = function(eai_num, eai_app_name) 
		{
			serviceservice.setViewClientDisplayName(eai_num, eai_app_name);
			serviceservice.getClientList(eai_num).then(function(response){
				if(response.status < 400)
				{
					var opArray = [];
					var listArr = response.data.clients;
					var found = undefined;

					for(var i in listArr)
					{
						var item = []
						item.service = [];

						found = undefined;
						for(var j in opArray)
						{
							if(opArray[j].operation === listArr[i].operation)
							{
								found = true;



								break;
							}
						}
						if(!found)
						{
							item.operation = listArr[i].operation;
							item.service.push(listArr[i]);
							opArray.push(listArr[i].operation);
							vm.getClientListArrData.push(item);
						}
					}
					serviceservice.setClientListArr(vm.getClientListArrData);
				}

			},function(data)
			{
				console.log(data);
			});
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

			return serviceservice.getServiceData().data.services[0];
		}

		vm.getCategories = function() {
			return serviceservice.getCategories();
		}

		vm.getPendingSLAData = function() {
			return serviceservice.getPendingRequests();
		}

		vm.getClientListArr = function()
		{
			return serviceservice.getClientListArr();
		}

		vm.getclientDisplayName = function()
		{
			return serviceservice.getViewClientDisplayName();
		}

		vm.setClickedSLA = function(data)
		{
			serviceservice.setClickedSLAData(data);
		}

		vm.getCustDialog = function(message, buttons, etc)
		{
			serviceservice.custPopUp(message, buttons, etc);
		}

    }




})();
