(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['userservice', '$location', '$localStorage'];

    function User(userservice, $location, $localStorage) {
    	var vm = this;

    	vm.user = [];
    	vm.display_error = false;
    	
    	/**
    	 * @return allows users through if login was successful. 
    	 */
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

	    /**
	     * @return logout function if successful will display the login screen
	     */
	    vm.logout = function() {
	    	if (userservice.logout()) {
	    		$location.path( "/" );
	    	}
	    }

	    /**
	     * @return default landing page if a page does not excist
	     */
	    vm.default = function() {
	    	console.log($localStorage.$default().apig_token);

	    	if($localStorage.$default().apig_token !== undefined)
	    	{
	    		userservice.setApigToken($localStorage.$default().apig_token);
	    		$location.path("/client/main");
	    	}
	    	else
	    	{
	    		$location.path( "/" );
	    	}
	    }
    }



})();
