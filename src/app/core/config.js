(function() {
    'use strict';

    angular
        .module('app.core')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
            .when('/',
                {
                    templateUrl: 'app/client/_intro.html'
                })
            .otherwise({redirectTo: '/'});
        }]);
    
})();
