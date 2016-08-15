(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['userservice', '$location'];

    function User(userservice, $location) {
    	var vm = this;
    	vm.user = [];
    	vm.display_error = false;
    	
	    vm.login = function() {
	    	userservice.login(vm.user).then(function(response) {
	    		if (userservice.isLoggedIn(response.data)) {
	    			$location.path( "/client/main" );
	    			
	    		} else {
	    			//false return on isLoggin
	    			vm.display_error = true; //display login error
	    		}
	    	}, function(response) {
	    		//403 forbbidden error handling
	    		vm.display_error = true;
	    	});
	    }

	    vm.logout = function() {
	    	if (userservice.logout()) {
	    		$location.path( "/" );
	    	}
	    }

	    vm.default = function() {
	    	if(userservice.getApigToken().length > 0)
	    	{
	    		$location.path("/client/main");
	    	}
	    	else
	    	{
	    		$location.path( "/" );
	    	}
	    }

    }


})();
