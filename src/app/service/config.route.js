(function() {
    'use strict';

    angular
        .module('app.service')
        .config(['$routeProvider', function($routeProvider, $rootScope, $location) {
            getRoutes().forEach(function(route) {
                $routeProvider.when(route.url, route.config);
            });
            //$routeProvider.otherwise({redirectTo: '/'});
        }]);

    function getRoutes() {
        return [
            {
                url: '/service/overview',
                config: {
                    templateUrl: 'app/service/_overview.html',
                    controller: 'Service',
                    controllerAs: 'vm',
                    title: 'Service - Overview'
                }
            },
            {
                url: '/service/published',
                config: {
                    templateUrl: 'app/service/_published.html',
                    controller: 'Service',
                    controllerAs: 'vm',
                    title: 'Service - Published Services'
                }
            },
            {
                url: '/service/consumed',
                config: {
                    templateUrl: 'app/service/_consumed.html',
                    controller: 'Service',
                    controllerAs: 'vm',
                    title: 'Service - Consumed Services'
                }
            },
            {
                url: '/service/edit/:serviceId',
                config: {
                    templateUrl: 'app/service/_serviceEdit.html',
                    controller: 'Service',
                    controllerAs: 'vm',
                    title: 'Service - Edit Services'
                }
            },
            {
                url: '/service/register',
                config: {
                    templateUrl: 'app/service/_serviceRegister.html',
                    controller: 'Service',
                    controllerAs: 'vm',
                    title: 'Service - Register a Service'
                }
            },
            {
                url: '/service/viewClients/:clientId',
                config: {
                    templateUrl: 'app/service/_viewClient.html',
                    controller: 'Service',
                    controllerAs: 'vm',
                    title: 'Service - View Clients'
                }
            }
        ];
    }

})();