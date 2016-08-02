(function() {
    'use strict';

    angular
        .module('app.sla')
        .config(['$routeProvider', function($routeProvider, $rootScope, $location) {
            getRoutes().forEach(function(route) {
                $routeProvider.when(route.url, route.config);
            });
        }]);

    function getRoutes() {
        return [
            {
                url: '/sla/view/:slaId',
                config: {
                    templateUrl: 'app/sla/_details.html',
                    controller: 'Sla',
                    controllerAs: 'vm',
                    title: 'SLA - SLA Details'
                }
            },
            {
                url: '/sla/edit/:slaId',
                config: {
                    templateUrl: 'app/sla/_slaEdit.html',
                    controller: 'Sla',
                    controllerAs: 'vm',
                    title: 'SLA - Edit SLA'
                }
            }
        ];
    }

})();