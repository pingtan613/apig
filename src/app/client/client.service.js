(function() {
    'use strict';

    angular
        .module('app.client')
        .factory('clientservice', ['$http', 'userservice', 'coreservice', 'serviceservice', clientservice]);

    clientservice.$inject = [];

    function clientservice($http, userservice, coreservice,serviceservice) {
        var clickedOperationData = [];
        var clickedService = [];
        var leftEngagement = [];
        var centerEngagement = [];
        var clicked = [];

        var service = {
            getSearchDetails: getSearchDetails,
            getServiceArray: getServiceArray,
            saveClickedOperation: saveClickedOperation,
            getclickedOperation: getclickedOperation,
            getOperationServiceDetails: getOperationServiceDetails,
            getServiceAccess: getServiceAccess,
            checkSlaExists: checkSlaExists,
            setPicked: setPicked, 
            getPicked: getPicked,
            getClientDetailsEngagement: getClientDetailsEngagement,
            setLeftEngagement: setLeftEngagement, 
            getLeftEngagement: getLeftEngagement,
            getServiceDetailsEngagement: getServiceDetailsEngagement,
            setCenterEngagement: setCenterEngagement,
            getCenterEngagement: getCenterEngagement,
            setClicked: setClicked,
            getClicked: getClicked,
            postEngagementForm: postEngagementForm,
            getButton: getButton,
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

        function getClientDetailsEngagement(id)
        {
            return $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/clients/" + id + "?apig_token=" + userservice.getApigToken()
            });
        }

        function getServiceDetailsEngagement(id)
        {
            return $http ({
                method: "GET",
                url: coreservice.getServerHost() + "/apig/v2/services/" + id + "?apig_token=" + userservice.getApigToken()
            });
        }

        function postEngagementForm(body)
        {
            return $http ({
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                url: coreservice.getServerHost() + "/apig/v2/engagement?apig_token=" + userservice.getApigToken(),
                data: body
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

        function setPicked(data)
        {
            clickedService = data;
        }

        function getPicked()
        {
            return clickedService;
        }

        function setLeftEngagement(data)
        {
            leftEngagement = data;
        }

        function getLeftEngagement()
        {
            return leftEngagement;
        }

        function setCenterEngagement(data)
        {
            centerEngagement = data;
        }

        function getCenterEngagement()
        {
            return centerEngagement;
        }

        function setClicked(data)
        {
            clicked = data;
        }

        function getClicked()
        {
            return clicked;
        }

        function getButton(message, button, etc)
        {
            coreservice.custDialog(message, button, etc);
        }


    }
})();
