(function() {
    'use strict';

    angular
        .module('app.wsdl')
        .config(['$routeProvider', function($routeProvider, $rootScope, $location) {
            getRoutes().forEach(function(route) {
                $routeProvider.when(route.url, route.config);
            });
        }]);

    function getRoutes() {
        return [
            {
                url: '/wsdl/upload/:serviceId',
                config: {
                    templateUrl: 'app/wsdl/_upload.html',
                    controller: 'Wsdl',
                    controllerAs: 'vm',
                    title: 'WSDL - Upload'
                }
            }
        ];
    }

})();