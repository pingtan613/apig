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
		vm.urlListArray = [];
		vm.servicedataChanges = [];

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
		        	if(data.data.message === 'Invalid Token')
		        	{
		        		$location.path("/")
		        	}
		        	else
		        	{
			            vm.errorInfo = data.data;
			            vm.display_error = true;
			            window.scrollTo(0, 0);
		        	}
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
		        	if(data.data.message === 'Invalid Token')
		        	{
		        		$location.path("/")
		        	}
		        	else
		        	{
			            vm.errorInfo = data.data;
			            vm.display_error = true;
			            window.scrollTo(0, 0);
		        	}		        
		        });
			}
		}

		vm.saveServiceDetails = function() {

			var numberData = 0;

			vm.list.data.services[0].url = vm.urlListArray.toString();
			console.log(vm.list.data.services[0].url);

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
						vm.getCustDialog("Service Registation Successfull<br>", {
	                		"Register Another Service": function() {
	                    		jQuery(this).dialog( "destroy" );
								numberData = 1; 
								vm.callback(1);                   		  
	                   		}, 
	                		"View Service": function() {
	                  			jQuery(this).dialog( "destroy" );
								numberData = 2;  
								vm.callback(2);                  		  
	                    		
	                		}
	                	});
					}
				
				console.log(numberData);

				},function(data)
		        {
		            if(data.data.message === 'Invalid Token')
		        	{
		        		$location.path("/")
		        	}
		        	else
		        	{
			            vm.errorInfo = data.data;
			            vm.display_error = true;
			            window.scrollTo(0, 0);
		        	}
		        });
			}
		}

		vm.callback = function(num)
		{
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
	   	            if(data.data.message === 'Invalid Token')
		        	{
		        		$location.path("/")
		        	}
		        	else
		        	{
		        		vm.displayForm = false;
			            vm.errorInfo = data.data;
			            vm.display_error = true;
			            window.scrollTo(0, 0);
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
	            if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}
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
	            if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}	        
		    });
		}

		vm.getNewNames = function(){
			console.log(vm.categoryPicked + " - " + vm.searchText)
			serviceservice.setSearchParam(vm.categoryPicked, vm.searchText);

			vm.names.splice(0,vm.names.length);	
			serviceservice.getNamesWithCat(vm.categoryPicked).then(function(response){
				vm.display_error = false;
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
	            if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}
	        });
		}


		vm.editServiceDetails = function(serviceID) {
			serviceservice.getServiceDetails(serviceID).then(function(response) {
				if(response.status < 400)
				{
					console.log("Edit service Detials");
					console.log(response.data);
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
	            if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}
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
					console.log(response);
					vm.display_error = false;
					var newArr = uniquePending(response.data.engagements);
					console.log(newArr);
					serviceservice.setPendingRequests(newArr);
				}
			},
			function(data)
	        {
	            if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}	       
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
					console.log(vm.newConsumedArr);
				}
			},
			function(data)
	        {
	            if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}
	        });


		}



		var uniqueClient = function(origArr) {
    		var newArr = [],
       		origLen = origArr.length,
       		found, x, y;

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


		var uniqueClientArr = function(origArr) {
    		var newArr = [],
       		origLen = origArr.length,
       		found, x, y;

		    for (x = 0; x < origLen; x++) {
  		      found = undefined;
    		    for (y = 0; y < newArr.length; y++) {
    		        if (origArr[x].client_display_name === newArr[y].client_display_name) {
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

		vm.getClientList = function(eai_num, eai_app_name, id) 
		{
			serviceservice.setViewClientDisplayName(eai_num, eai_app_name);
			serviceservice.getClientList(eai_num).then(function(response){
				console.log(response.data);
				if(response.status < 400)
				{
					var opArray = [];
					var listArr = response.data.clients;
					var found = undefined;

					var newArr = [];
					var services = undefined;
					services = {};
					services.data = [];


					var operations = [];
					for(var i in listArr)
					{
						operations.push(listArr[i].operation);						
					}

					operations = uniqueClient(operations);					

					for(var i in operations)				
					{
						for(var j in listArr)
						{

							if(operations[i] === listArr[j].operation)
							{
								services.operation = operations[i];
								services.data.push(listArr[j]);
							}						}

						newArr.push(services);

						services = undefined;
						services = {};
						services.data = [];

					}

					for(var i in newArr)
					{
						newArr[i].data = uniqueClientArr(newArr[i].data)
					}
					// newArr = uniqueClientArr(newArr);


					serviceservice.setClientListArr(newArr);

					// for(var i in listArr)
					// {
					// 	var item = []
					// 	item.service = [];

					// 	found = undefined;
					// 	for(var j in opArray)
					// 	{
					// 		if(opArray[j].operation === listArr[i].operation)
					// 		{
					// 			found = true;
					// 			break;
					// 		}
					// 	}
					// 	if(!found)
					// 	{
					// 		item.operation = listArr[i].operation;
					// 		item.service.push(listArr[i]);
					// 		opArray.push(listArr[i].operation);
					// 		vm.getClientListArrData.push(item);
					// 	}
					// }
					// console.log(vm.getClientListArrData);
					// serviceservice.setClientListArr(vm.getClientListArrData);
				}

			},function(data)
			{
				if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}
			});
		}

		vm.urlListAdd = "";
		vm.addUrl = function()
		{
			console.log(vm.list.data.services[0].url);
			if(vm.urlListArray == '' && vm.urlListAdd != "")
			{
				vm.urlListArray = [];
				vm.urlListArray.push(vm.urlListAdd);
			}
			else if( vm.urlListAdd != "")
			{
				vm.urlListArray.push(vm.urlListAdd);
			}
			else
			{
				alert("Please enter a URL");
			}
			vm.urlListAdd = "";
		}

		vm.urlListAddEdit = "";
		vm.addUrlEdit = function()
		{
			if(vm.urlListAddEdit != "")
			{
				console.log(vm.getServiceData());
				vm.getServiceData().url.push(vm.urlListAddEdit);
				vm.urlListAddEdit = "";
			}
			else
			{
				alert("Please enter a URL");
			}
		}


		vm.saveServiceChanges = function()
		{
			console.log(vm.servicedataChanges);

			for(var i = 0; i < vm.servicedataChanges.url.length; i++)
			{
				if(vm.servicedataChanges.url[i] === "")
				{
					vm.servicedataChanges.url.splice(i, 1);
				}
			}

			serviceservice.putServiceData(vm.servicedataChanges).then(function(response){
				if(response.status < 400)
				{
					vm.getCustDialog("Service changes saved successfully", {
	                		"Continue": function() {
	                    		jQuery(this).dialog( "destroy" ); 
								vm.callback(); 		  
	                   		}
	                   	});
				}
			}, function(data)
			{
				if(data.data.message === 'Invalid Token')
	        	{
	        		$location.path("/")
	        	}
	        	else
	        	{
		            vm.errorInfo = data.data;
		            vm.display_error = true;
		            window.scrollTo(0, 0);
	        	}
			});
		}



		vm.urlInput = "";
		vm.textarea = "";
        vm.wsdlAddGoCLicked = false;


		vm.getWsdldetails = function()
    	{
    		var body = {};

    		if((vm.urlInput === undefined || vm.urlinput === "") && vm.textarea === "")
    		{
    			alert("Please enter a proper URL or a XML document")
    		}
    		else if(vm.urlRadio == 'text' && vm.textarea !== "")
    		{

                body = JSON.stringify({service_id:vm.list.data.services[0].id, url:vm.urlInput, xml:btoa(vm.textarea)});             

    			serviceservice.postNewXMLWsdlOperations(body).then(function(response)
    			{
    				if(response.status < 400)
    				{

                        vm.wsdlAddGoCLicked = true;
                        console.log(response.data);
    					vm.display_error = false;
    					wsdlservice.setNewWsdlOperations(response.data);
    					vm.newWsdlList = wsdlservice.getNewWsdlOperations();

    					for(var i = 0; i < vm.newWsdlList.result.length; i++)
    					{
    						vm.newWsdlList.result[i].internal = 'false';
    						vm.newWsdlList.result[i].state = 'active';
    					}
                        console.log(vm.newWsdlList);
    				}
    			},
    			function(data)
    			{
    				if(data.data.message === 'Invalid Token')
                    {
                      $location.path("/")
                    }
                    else
                    {
                        vm.wsdlAddGoCLicked = false;
                        vm.errorInfo = data.data;
                        vm.display_error = true;
                        window.scrollTo(0, 0);
                    }	
    			});
    			//alert("A XML doc will be sent to the backend")
    		}
    		else if(vm.urlInput !== undefined && vm.urlRadio == 'url')
    		{
				body = JSON.stringify({service_id:vm.list.data.services[0].id, url:vm.urlInput, xml:""});    			

    			serviceservice.postNewUrlWsdlOperations(body).then(function(response)
    			{
    				if(response.status < 400)
    				{
                        vm.wsdlAddGoCLicked = true;

    					vm.display_error = false;
    					wsdlservice.setNewWsdlOperations(response.data);
    					vm.newWsdlList = wsdlservice.getNewWsdlOperations();

    					for(var i = 0; i < vm.newWsdlList.result.length; i++)
    					{
    						vm.newWsdlList.result[i].internal = 'false';
    						vm.newWsdlList.result[i].state = 'active';
    					}
    				}
    			},
    			function(data)
    			{
    				if(data.data.message === 'Invalid Token')
                    {
                      $location.path("/")
                    }
                    else
                    {
                        vm.wsdlAddGoCLicked = false;
                        vm.errorInfo = data.data;
                        vm.display_error = true;
                        window.scrollTo(0, 0);
                    }    
    			});
    			

    			//alert("the WSDL will be pulled from the url")

    		}
    		else
    		{
    			alert("Please enter either a URL or XML not both")
    		}
    	}


    	vm.returnState = function(state)
    	{
       		if(state === "init")
    		{
    			return "Initialize";
    		}
    		else if(state === "pending")
    		{
    			return "Pending Approvel";
    		}
    		else if(state === "rejected")
    		{
    			return "Rejected";
    		}
    		else if(state === "active")
    		{
    			return "Active";
    		}
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

		vm.getServiceDataEdit = function() 
		{
			var temp = serviceservice.getServiceData().data.services[0];
			temp.url = temp.url.split(",");

			return serviceservice.getServiceData().data.services[0];
		}

		vm.getServiceData = function() 
		{
			return serviceservice.getServiceData().data.services[0];
		}

		vm.getCategories = function() {
			return serviceservice.getCategories();
		}



		vm.getPendingSLAData = function() {
			var temp = serviceservice.getPendingRequests();
			var tempEnagaement = temp.client_engagement;

			for(var i = 0; i < temp.length; i++)
			{
				for(var j = 0; j < temp[i].client_engagement.length; j++)
				{
					if(temp[i].client_engagement[j].state === 'active')
					{
						temp[i].client_engagement.splice(j,1);
					}									
				}

			}

			return temp;




		}

		vm.getClientListArr = function()
		{
			console.log(serviceservice.getClientListArr());
			return serviceservice.getClientListArr();
		}

		vm.getclientDisplayName = function()
		{
			return serviceservice.getViewClientDisplayName();
		}

		vm.setClickedSLA = function(data)
		{
			console.log(data);
			serviceservice.setClickedSLAData(data);
		}

		vm.setClickedSLAClient = function(data)
		{
			console.log(data)
			
		}

		vm.setViewClientSLA = function(info, data)
		{
			console.log(info);
			console.log(data);
		}

		vm.getCustDialog = function(message, buttons, etc)
		{
			serviceservice.custPopUp(message, buttons, etc);
		}

    }




})();
