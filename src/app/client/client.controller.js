(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('Client', Client);

    Client.$inject = ['clientservice'];

    function Client(clientservice) {
    	var vm = this;
        vm.abc = "123";
        vm.eais = [];
       	var data = clientservice.getRegisteredClient().then(
       		function(response) { 
       			console.log(response.data);
       			vm.eais = response.data;
       		}, function(response) {

       		}
       	);

    }


})();
