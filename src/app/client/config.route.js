(function() {
    'use strict';

    angular
        .module('app.client')
        .config(['$routeProvider', function($routeProvider, $rootScope, $location) {
            getRoutes().forEach(function(route) {
                $routeProvider.when(route.url, route.config);
            });
        }]);

    function getRoutes() {
        return [
            {
                url: '/client/main',
                config: {
                    templateUrl: 'app/client/_intro.html',
                    title: 'Client - Main'
                }
            }, 
            {
                url: '/client/search/result',
                config: {
                    templateUrl: 'app/client/_result.html',
                    controller: 'Client',
                    controllerAs: 'vm',
                    title: 'Client - Search Result'
                }
            }, 
            {
                url: '/client/service/engagement',
                config: {
                    templateUrl: 'app/client/_engagementForm.html',
                    controller: 'Client',
                    controllerAs: 'vm',
                    title: 'Client - Search Result'
                }
            }, 
            {
                url: '/client/service/:clientServideId',
                config: {
                    templateUrl: 'app/client/_clientService.html',
                    controller: 'Client',
                    controllerAs: 'vm',
                    title: 'Client - Client Service'
                }
            }
        ];
    }

})();