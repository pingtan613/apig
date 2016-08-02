(function() {
    'use strict';

    angular
        .module('app.service')
        .controller('Service', Service);

    Service.$inject = [];

    function Service() {
        var vm = this;
        vm.category = {};
		vm.category.list = [
			{id: 1, name: 'firstfasd'},
	        {id: 2, name: 'second'},
	        {id: 3, name: 'third'},
	        {id: 4, name: 'fourth'},
	        {id: 5, name: 'fifth'},
		];
		vm.category.selected = { value: vm.category.list[0] };

    }


})();
