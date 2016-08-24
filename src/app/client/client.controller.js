(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('Client', Client);

    Client.$inject = ['clientservice', '$location'];

    function Client(clientservice, $location) {
    	var vm = this;

        vm.searchParameters = [];
        vm.catagorySelected = "";
        vm.hasCat = false;
        vm.clicked = [];
        vm.serviceToEngage = [];
        vm.accessableServices = [];
        vm.servicePicked = [];
        vm.display_error = false;



        vm.searchText = function()
        {
          vm.searchParameters = clientservice.getSearchDetails();
        }

        vm.serviceClicked = function(data)
        {
          clientservice.saveClickedOperation(data);
        }

        vm.checkEngagement = function() {
          console.log(vm.servicePicked.id);
          console.log(vm.clicked.operation.eai_number);

          clientservice.checkSlaExists(vm.servicePicked.id, vm.clicked.operation.eai_number).then(function(response) {
            console.log(response);
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

        vm.clientService = function() 
        {
          vm.clicked.operation = clientservice.getclickedOperation();
          clientservice.getOperationServiceDetails().then(function(response) {
            if(response.status < 400)
            {
                vm.clicked.service = response.data;
                console.log(vm.clicked);

            }
          },
          function(data)
          {
            vm.errorInfo = data.data;
            vm.display_error = true;
            window.scrollTo(0, 0);
          });

        }

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

        vm.servicesPersonCanAccess = function()
        {
          clientservice.getServiceAccess().then(function(response) {
            if(response.status < 400)
            {
                console.log(response.data.Services);
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

        vm.getServiceArray = function()
        {
          var temp = clientservice.getServiceArray();
          return temp;
        }

        vm.getSearchDetails = function ()
        {
          return clientservice.getSearchDetails().textSearch;
        }
    }
})();