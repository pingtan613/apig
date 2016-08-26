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

      vm.errorInfo = {};

      /**
       * Functions that deal with http calls
       */

      /**
       * @return Does not return
       * checks for the sla and deals with the http response and produces the error or success.
       */
      vm.checkEngagement = function() {

        clientservice.checkSlaExists(vm.servicePicked.id, vm.clicked.operation.eai_number).then(function(response) 
        {
          if(response.status === 404)
          {
            
            //GOTO inital engagement form
            //#/client/service/engagement
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
       * sets the client service for the click operations
       */
      vm.clientService = function() 
      {
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
    }
})();