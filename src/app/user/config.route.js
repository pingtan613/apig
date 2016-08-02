(function() {
    'use strict';

    angular
        .module('app.user')
        .config(['$routeProvider', function($routeProvider, $rootScope, $location) {
            getRoutes().forEach(function(route) {
                $routeProvider.when(route.url, route.config);
            });
        }]);

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/user/_login.html',
                    controller: 'User',
                    controllerAs: 'vm',
                    title: 'User - Login'
                }
            }
        ];
    }

})();