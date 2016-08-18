(function() {
    'use strict';

    angular
        .module('app.client')
        .factory('clientservice', ['$http', 'userservice', 'coreservice', 'serviceservice', clientservice]);

    clientservice.$inject = [];

    function clientservice($http, userservice, coreservice,serviceservice) {
        var clickedOperationData = [];

        var service = {
            getSearchDetails: getSearchDetails,
            getServiceArray: getServiceArray,
            saveClickedOperation: saveClickedOperation,
            getclickedOperation: getclickedOperation,
            getOperationServiceDetails: getOperationServiceDetails,
            getServiceAccess: getServiceAccess,
        };

        return service;

        function getServiceAccess()
        {
            return $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/user/current/services?apig_token=" + userservice.getApigToken()
            });
        }

        function getOperationServiceDetails()
        {
            return  $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/services/" + clickedOperationData.eai_number + "?apig_token=" + userservice.getApigToken()
            });
        }

        function getSearchDetails(){
            return serviceservice.getSearchParam();
        }

        function getServiceArray()
        {
            return serviceservice.getFullServiceArray();
        }

        function saveClickedOperation(operationData)
        {
            clickedOperationData = operationData;
        }

        function getclickedOperation()
        {
            return clickedOperationData;
        }
    }
})();
