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
      vm.bothCLicked = {};
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

        clientservice.setPicked(vm.servicePicked);
        clientservice.setClicked(vm.bothCLicked);
        clientservice.checkSlaExists(vm.bothCLicked.operation.id, vm.servicePicked.eai_number).then(function(response) 
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
            $location.path("/client/service/engagement");
          }
          else
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
          }
        });
      }

      /** 
       * @return does not return
       * sets the client service for the click operations
       */
      vm.clientService = function() 
      {
        vm.bothCLicked.operation = clientservice.getclickedOperation();
        clientservice.getOperationServiceDetails().then(function(response) {
          if(response.status < 400)
          {
              console.log(response.data);
              vm.bothCLicked.operation.service = response.data.services[0];
              clientservice.setBothClicked(vm.bothCLicked);
              console.log(vm.bothCLicked.operation.service)
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

      vm.getEngagementDetails = function()
      {
        console.log(vm.bothCLicked);
        clientservice.getClientDetailsEngagement(clientservice.getPicked().eai_number).then(function(response) {
          if(response.status < 400)
          {
            clientservice.setLeftEngagement(response.data);
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


        clientservice.getServiceDetailsEngagement(clientservice.getPicked().eai_number).then(function(response) {
          if(response.status < 400)
          {
            clientservice.setCenterEngagement(response.data.services[0]);
          }
        },function(data){
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


      vm.submitInitialEngagement = function()
      {

        vm.initialTestDate = document.getElementsByName("initialTestDate")[0].value;
        vm.productionDate = document.getElementsByName("productionDate")[0].value;

        var date1 = new Date(vm.initialTestDate)
        //vm.initialTestDate = (date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear();

        var date2 = new Date(vm.productionDate)

        //vm.productionDate = (date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear();

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

          var client = clientservice.getPicked();
          var click = clientservice.getClicked();

          date1 = date1.getTime() / 1000;
          date2 = date2.getTime() / 1000; 

          console.log(click);


          vm.missingValues = false;
          var json = JSON.stringify({version : "",
              client_eai : client.eai_number,
              service_eai : click.operation.eai_number,
              operation : click.operation.operation_name,
              state : "init",
              test_date : date1.toString(),
              mtp_date : date2.toString(),
              datacenter : vm.dataCenter,
              region : vm.region,
              sla : "",
              comment : vm.textarea});

          console.log(json);

            clientservice.postEngagementForm(json).then(function(response) {
              if(response.data.result === 'success')
              {
                vm.getCustDialog("Initial Engagment successfully submitted", {
                    "Ok": function() {
                        jQuery(this).dialog( "destroy" );
                    }
                });
                $location.path("/service/overview");
              }
            }, function(data) {
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

      vm.boxTopShow = true;
      vm.purpleShow = false;
      vm.platinum = false;
      vm.multi = false;
      vm.corporate = false;
      vm.title = "Welcome!"
      vm.boxTop = function(num)
      {
        switch(num)
        {
          case 1:
            vm.title = "Multi-Core";
            vm.boxTopShow = false;
            vm.multi = true;
            break;
          case 2:
            vm.title = "Platinum Core";
            vm.boxTopShow = false;
            vm.platinum = true;
            break;
          case 3:
            vm.title = "Purple Core";
            vm.boxTopShow = false;
            vm.purpleShow = true;
            break;
          case 4:
            vm.title = "Corporate";
            vm.boxTopShow = false;
            vm.corporate = true;
            break;
          case 5:
            vm.title = "Welcome!"
            vm.boxTopShow = true;
            vm.purpleShow = false;
            vm.platinum = false;
            vm.multi = false;
            vm.corporate = false;
            break;
          default:
            vm.title = "Welcome!"
            vm.boxTopShow = true;
            vm.purpleShow = false;
            vm.platinum = false;
            vm.multi = false;
            vm.corporate = false;

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
        console.log(vm.searchParameters);
      }

      vm.getSearchText = function()
      {
        return vm.searchParameters;
      }

      vm.setSearchDetails = function(cat)
      {
        clientservice.setSearchDetails(cat, "");
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

      vm.getBothClicked = function()
      {
        return clientservice.getBothClicked();
      }
    }
})();