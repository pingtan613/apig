(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['userservice'];

    function User(userservice) {
    	var vm = this;
    	vm.user = [];
    	
	    vm.login = function() {
	    	userservice.login(vm.user);
	    }

    }


})();
