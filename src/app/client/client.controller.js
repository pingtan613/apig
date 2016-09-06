(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('Client', Client);

    Client.$inject = ['clientservice', '$location'];

    function Client(clientservice, $location) {
    	var vm = this;

      /**
       * variables
       */

      vm.catagorySelected = "";

      vm.searchParameters = [];      
      vm.clicked = [];
      vm.serviceToEngage = [];
      vm.accessableServices = [];
      vm.servicePicked = [];

      vm.display_error = false;
      vm.hasCat = false;
      vm.missingValues = false;

      vm.errorInfo = {};

      vm.initialTestDate = "";
      vm.productionDate = "";
      vm.dataCenter = "";
      vm.region = "";
      vm.textarea = "";

      /**
       * Functions that deal with http calls
       */

      /**
       * @return Does not return
       * checks for the sla and deals with the http response and produces the error or success.
       */
      vm.checkEngagement = function() {
        console.log(vm.servicePicked);
        console.log(vm.clicked);

        clientservice.setPicked(vm.servicePicked);
        clientservice.setClicked(vm.clicked);
        clientservice.checkSlaExists(vm.clicked.operation.id, vm.servicePicked.eai_number).then(function(response) 
        {
          if(response.status === 404)
          {
            
            //GOTO inital engagement form
            //#/client/service/engagement
          }
        },
        function(data)
        {
          if(data.status === 404)
          {
            $location.path("/client/service/engagement")
          }
          else
          {
            console.log(data);
            vm.errorInfo = data.data;
            vm.display_error = true;
            window.scrollTo(0, 0);
          }
        });
      }

      /** 
       * @return does not return
       * sets the client service for the click operations
       */
      vm.clientService = function() 
      {
        console.log(vm.servicePicked);
        vm.clicked.operation = clientservice.getclickedOperation();
        clientservice.getOperationServiceDetails().then(function(response) {
          if(response.status < 400)
          {
              vm.clicked.service = response.data;
          }
        },
        function(data)
        {
          vm.errorInfo = data.data;
          vm.display_error = true;
          window.scrollTo(0, 0);
        });
      }

        
      /**
       * @return does not return
       * gets the list of services that a user can access
       */
      vm.servicesPersonCanAccess = function()
      {
        clientservice.getServiceAccess().then(function(response) {
          if(response.status < 400)
          {
              vm.accessableServices = unique(response.data.Services);
          }
        },
        function(data)
        {
          vm.errorInfo = data.data;
          vm.display_error = true;
          window.scrollTo(0, 0);
        });
      }

      vm.getEngagementDetails = function()
      {

        clientservice.getClientDetailsEngagement(clientservice.getPicked().eai_number).then(function(response) {
          if(response.status < 400)
          {
            clientservice.setLeftEngagement(response.data);
          }
        },function(data)
        {
          vm.errorInfo = data.data;
          vm.display_error = true;
          window.scrollTo(0, 0);
        });


        clientservice.getServiceDetailsEngagement(clientservice.getPicked().eai_number).then(function(response) {
          if(response.status < 400)
          {
            console.log(response.data.services[0]);
            clientservice.setCenterEngagement(response.data.services[0]);
          }
        },function(data){
          console.log(data);
        });
      }


      vm.submitInitialEngagement = function()
      {

        vm.initialTestDate = document.getElementsByName("initialTestDate")[0].value;
        vm.productionDate = document.getElementsByName("productionDate")[0].value;

        var date1 = new Date(vm.initialTestDate)

        vm.initialTestDate = (date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear();

        console.log(vm.initialTestDate);

        var date2 = new Date(vm.productionDate)

        vm.productionDate = (date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear();

        console.log(vm.productionDate);

        console.log(date1.getTime());


        if(date1.getTime() < Date.now() || date2.getTime() < Date.now())
        {
          alert("enter a date after today's date.")
          return;
        }
        else if(date1.getTime() > date2.getTime())
        {
          alert("ensure the production date is after access is needed")
          return;
        }


        if(vm.dataCenter === "" || vm.region === "" || vm.initialTestDate === "" || vm.productionDate === "")
        {
          vm.missingValues = true;
        }
        else
        {

          
          console.log(clientservice.getPicked());
          console.log(clientservice.getClicked());


          var client = clientservice.getPicked();
          var click = clientservice.getClicked();

          vm.missingValues = false;
          var json = JSON.stringify({version : "",
              client_eai : client.eai_number,
              service_eai : click.operation.eai_number,
              operation : click.operation.operation_name,
              state : "init",
              test_date : date1.getTime(),
              mtp_date : date2.getTime(),
              datacenter : vm.dataCenter,
              region : vm.region,
              sla : "",
              comment : vm.textarea});


            clientservice.postEngagementForm(json).then(function(response) {
              if(response.data.result === 'success')
              {
                vm.getCustDialog("Please choose one of the operations\n\tReplace: will replace the old WSDL with the new one\n\tIgnore: will ignore any confilicitng services from the current WSDL\n\tCancel: will not save the WSDL and will stay on the same page", {
                    "Ok": function() {
                        jQuery(this).dialog( "destroy" );
                    }
                });
                $location.path("/service/overview");
              }
            }, function(data) {
              vm.errorInfo = data.data;
              vm.display_error = true;
              window.scrollTo(0, 0);
            });

        }
      }


      /**
       * Get and set functions
       */

       /**
        * @return does not return
        * gets the search details
        */
      vm.searchText = function()
      {
        vm.searchParameters = clientservice.getSearchDetails();
      }

      /**
       * @param  {data} -- the data for the service that was clicked to be saved
       * @return does not return
       * saves the data that was clicked in the client factory
       */
      vm.serviceClicked = function(data)
      {
        clientservice.saveClickedOperation(data);
      }

      /**
       * @return returns the service array
       * gets the service array from the factory
       */
      vm.getServiceArray = function()
      {
        return clientservice.getServiceArray();
      }

      /**
       * @return gets the search detials
       */
      vm.getSearchDetails = function ()
      {
        return clientservice.getSearchDetails().textSearch;
      }

      /**
       * function for controller only
       */

      /**
       * @param  {origArr} -- array to parse to make unique
       * @return returns the array without duplicates
       */
      var unique = function(origArr) 
      {
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

      vm.getLeftEngagement = function()
      {
        return clientservice.getLeftEngagement();
      }

      vm.getCenterEngagement = function ()
      {
        return clientservice.getCenterEngagement();
      }

      vm.getCustDialog = function(message, buttons, etc)
      {
        clientservice.getButton(message, buttons, etc);
      }
    }
})();