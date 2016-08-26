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
            checkSlaExists: checkSlaExists,
        };

        return service;


        /**
         * functions involing an http call
         */


        /**
         * @return Gets all services that the user can access.
         * userID comes from the APIG Token
         */
        function getServiceAccess()
        {
            return $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/user/current/services?apig_token=" + userservice.getApigToken()
            });
        }

        /**
         * @return Gets details for the service for the engagement form and details screen
         * service will only be called after clickedOperationData is populated allowing for the eai number to come from the array
         */
        function getOperationServiceDetails()
        {
            return  $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/services/" + clickedOperationData.eai_number + "?apig_token=" + userservice.getApigToken()
            });
        }

        /**
         * @param  {serviceID} -- the ID of the service
         * @param  {clientEAI} -- eai of the client
         * @return Will call and get a sla if it excists.
         * returns a 404 if there is sla does not excists. 
         */
        function checkSlaExists(serviceID, clientEAI)
        {
            return $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/services/" + serviceID + "/clients/" + clientEAI + "?apig_token=" + userservice.getApigToken()
            });
        }

        /**
         * Get and Set methods
         */


        /**
         * @return 
         */
        function getSearchDetails()
        {
            return serviceservice.getSearchParam();
        }

        /**
         * @return 
         */
        function getServiceArray()
        {
            return serviceservice.getFullServiceArray();
        }

        /**
         * @param  {OperationData} -- saves data that was clicked on during the search to use later 
         * @return Does not return due to set method
         */
        function saveClickedOperation(operationData)
        {
            clickedOperationData = operationData;
        }

        /** 
         * @return the data was click can be returned to be used
         */
        function getclickedOperation()
        {
            return clickedOperationData;
        }
    }
})();
