(function() {
    'use strict';

    angular
        .module('app.wsdl')
        .controller('Wsdl', Wsdl);

    Wsdl.$inject = ['wsdlservice', '$location'];

    function Wsdl(wsdlservice, $location) {
    	var vm = this;
    	vm.wsdlVersion = "All";
    	vm.textarea = "";
    	vm.urlInput = "";
    	vm.inputArea = true;
    	vm.details = [];
    	vm.wsdlAdd = true;
    	vm.wsdlAddGoCLicked = false;
    	vm.errorInfo = {};
    	vm.display_error = false;
    	vm.wsdlList = {};
    	vm.newWsdlList = {};
    	vm.item = {};

    	vm.getWsdlDetails = function()
    	{

    		vm.wsdlVersion = "All";
    		vm.textarea = "";
    		vm.urlInput = "";
            vm.showWsdlstable = false;
    		vm.inputArea = true;
    		vm.details.splice(0, vm.details.length);
    		vm.wsdlAdd = true;
    		vm.wsdlAddGoCLicked = false;
    		vm.errorInfo = undefined;
    		vm.display_error = false;
    		vm.wsdlList = undefined;
    		vm.newWsdlList = undefined;
    		vm.item = undefined;



    		var largest = 0;
    		var eai = wsdlservice.getServiceEAI();

    		vm.details = eai.data.services[0];

    		wsdlservice.getWsdlList(eai.data.services[0].eai_number).then(function(response) {
    			if(response.status < 400)
    			{
    				

    				var list = response.data;
    				
    				vm.largest = 0;

    				for(var i = 0; i < list.wsdl.length; i++)
    				{
    					if(list.wsdl[i].version > largest)
   						{
   				 			largest = list.wsdl[i].version;
    					}
    				}

    				// return list.wsdl;
		    		for(var i = 0; i < list.wsdl.length; i++)
		    		{
		    			if(list.wsdl[i].version !== largest)
		    			{
    						list.wsdl[i].display_name = list.wsdl[i].name + " (" + list.wsdl[i].version + ")"
    						list.wsdl[i].name = list.wsdl[i].name + " (" + list.wsdl[i].version + ")"

		    			}
    				}

    				vm.item = {};
    				vm.item.name = "All"
    				vm.item.version = 99999999999;
    				list.wsdl.splice(0, 0, vm.item);
    				wsdlservice.setWsdlList(list.wsdl);

    				wsdlservice.getWsdlOpertations(eai.data.services[0].eai_number).then(function(response)
    				{
    					if(response.status < 400)
    					{	
    						vm.display_error = false;
    						wsdlservice.setWsdlOperationsArray(response.data.operations);
    					}
    				},
    				function(data)
    				{
    					vm.errorInfo = data.data;
		    			vm.display_error = true;
		    			window.scrollTo(0, 0);
    				});
    			}
    		});
    	}

    	vm.changedOption = function(picked)
    	{
    	
    		vm.showWsdlstable = true;
    		var oldArr = wsdlservice.getWsdlOperationsArray();
    		var newArr = [],
    		found, x, y;

    		if(picked.name === 'All')
    		{
    			wsdlservice.setWsdlSubList(oldArr);
    			vm.wsdlList = wsdlservice.getWsdlSubList();
                console.log(vm.wsdlList);
    			return;
    		}

    		for(var i = 0; i < oldArr.length; i++)
    		{
    			if(oldArr[i].wsdl_display_name === picked.display_name)
    			{
    				newArr.push(oldArr[i]);
    			}
    			else if(oldArr[i].version === picked.version && oldArr[i].wsdl_display_name !== picked.display_name)
    			{
    				newArr.push(oldArr[i]);

    			}
    		}
    		wsdlservice.setWsdlSubList(newArr);
    		vm.wsdlList = wsdlservice.getWsdlSubList();
                console.log(vm.wsdlList);


    	}

    	vm.getWsdldetails = function()
    	{
    		var body = {};

    		if((vm.urlInput === undefined || vm.urlinput === "") && vm.textarea === "")
    		{
    			alert("Please enter a proper URL or a XML document")
    		}
    		else if((vm.urlInput === undefined || vm.urlinput === "") && vm.textarea !== "")
    		{
    			vm.wsdlAddGoCLicked = true;
    			wsdlservice.postNewXMLWsdlOperations(vm.textarea).then(function(response)
    			{
    				if(response.status < 400)
    				{
    					vm.display_error = false;
    					wsdlservice.setNewWsdlOperations(response.data);
    					vm.newWsdlList = wsdlservice.getNewWsdlOperations();

    					for(var i = 0; i < vm.newWsdlList.length; i++)
    					{
    						vm.newWsdlList[i].internal = false;
    						vm.newWsdlList[i].state = 'active';
    					}
    				}
    			},
    			function(data)
    			{
    				vm.errorInfo = data.data;
	    			vm.display_error = true;
	    			window.scrollTo(0, 0);	
    			});
    			//alert("A XML doc will be sent to the backend")
    		}
    		else if(vm.urlInput !== undefined && vm.textarea === "")
    		{
    			vm.wsdlAddGoCLicked = true;

				body = JSON.stringify({service_id:vm.details.id, url:vm.urlInput, xml:""});    			
    			// body.service_id = vm.details.id;
    			// body.url = vm.urlInput;
    			// body.xml = "";

    			wsdlservice.postNewUrlWsdlOperations(body).then(function(response)
    			{
    				if(response.status < 400)
    				{
    					vm.display_error = false;
    					wsdlservice.setNewWsdlOperations(response.data);
    					vm.newWsdlList = wsdlservice.getNewWsdlOperations();

    					for(var i = 0; i < vm.newWsdlList.result.length; i++)
    					{
    						vm.newWsdlList.result[i].internal = false;
    						vm.newWsdlList.result[i].state = 'active';
    					}
    				}
    			},
    			function(data)
    			{
    				vm.errorInfo = data.data;
	    			vm.display_error = true;
	    			window.scrollTo(0, 0);
    			});
    			

    			//alert("the WSDL will be pulled from the url")

    		}
    		else
    		{
    			alert("Please enter either a URL or XML not both")
    		}
    	}

    	vm.getWsdlList = function()
    	{
            console.log(wsdlservice.getWsdlListArray());
    		return wsdlservice.getWsdlListArray();
    	}

    	vm.getWsdlOperationArray = function()
    	{
    		vm.wsdlList = wsdlservice.getWsdlSubList();
    		return wsdlservice.getWsdlSubList();
    	}

    	vm.getState = function(operationState)
    	{
    		if(operationState === 'inactive' || operationState === 'depreicated')
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}

    	vm.getInternal = function(operationInternal)
    	{
    		if(operationInternal === true)
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}

    	vm.showChange = function()
    	{

    		//console.log(vm.wsdlList);
    		//console.log(vm.details);


    		var newJson = JSON.stringify({service_id:vm.details.id, 
    				wsdl_name:vm.details.wsdl_name, 
    				wsdl_url:vm.details.url, 
    				wsdl_xml:"",
    				version:vm.details.version,
    				replace_existing:"true",
    				operation_list: vm.wsdlList });

    		//console.log(newJson);
    		vm.wsdlAdd = !vm.wsdlAdd;
    		//TODO call function to save wsdl operation change.

    	}

    	
    	vm.saveNewWsdl = function()
    	{
            vm.getCustDialog("Please choose one of the operations\n\tReplace: will replace the old WSDL with the new one\n\tIgnore: will ignore any confilicitng services from the current WSDL\n\tCancel: will not save the WSDL and will stay on the same page", {
                "Replace": function() {
                    jQuery(this).dialog( "destroy" );
                    vm.callback(1);
                }, 
                "Ignore": function() {
                    jQuery(this).dialog( "destroy" );
                    vm.callback(2);
                },
                "Cancel": function() {
                    jQuery(this).dialog( "destroy" );
                    vm.callback(3);
                }
            });
    	}

        vm.callback = function(num)
        {
            console.log(num);

            switch(num){
                case 1:
                    console.log(num);
                    var newJson = JSON.stringify({service_id:vm.details.id, 
                        wsdl_name:vm.newWsdlList.wsdl_name, 
                        wsdl_url:vm.urlInput, 
                        wsdl_xml:vm.textarea,
                        version:"",
                        replace_existing:"true",
                        operation_list: vm.newWsdlList.result });

                    wsdlservice.postNewWsdl(newJson, vm.details.eai_number).then(function(response) {
                        if(response.status < 400)
                        {
                            vm.display_error = false;
                        }
                    },
                    function(data){
                        vm.errorInfo = data.data;
                        vm.display_error = true;
                        window.scrollTo(0, 0);

                    });
                    break;

                case 2:
                    console.log(num);
                    var newJson = JSON.stringify({service_id:vm.details.id, 
                        wsdl_name:vm.newWsdlList.wsdl_name, 
                        wsdl_url:vm.urlInput, 
                        wsdl_xml:vm.textarea,
                        version:"",
                        replace_existing:"false",
                        operation_list: vm.newWsdlList.result });

                    wsdlservice.postNewWsdl(newJson, vm.details.eai_number).then(function(response) {
                        if(response.status < 400)
                        {
                            vm.display_error = false;
                        }
                    },
                    function(data){
                        vm.errorInfo = data.data;
                        vm.display_error = true;
                        window.scrollTo(0, 0);

                    });
                    break;

                case 3:
                default:
                    alert("The WSDL data was not saved");
            }
        }

        vm.back = function()
        {
            vm.wsdlAdd = !vm.wsdlAdd;
        }

    	vm.getNewWsdlOperationsArray = function()
    	{
    		return wsdlservice.getNewWsdlOperations();
    	}

        vm.getCustDialog = function(message, buttons, etc)
        {
            wsdlservice.custPopUp(message, buttons, etc);
        }
    }

})();
