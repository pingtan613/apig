(function() {
    'use strict';

    angular
    	.module('app.core')
    	.factory('coreservice', [coreservice]);

    coreservice.$inject = [];

    function coreservice(){

    	var serverHost = "https://ec2-54-164-123-94.compute-1.amazonaws.com:8443";    	
        var slaClickedView = [];
    	var service = {
    		getServerHost: getServerHost,
            custDialog: custDialog,
            setSlaClickedView: setSlaClickedView,
            getSlaClickedView: getSlaClickedView,
    	};


    	return service;

        /**
         * @return returns the server host for every http call to the gateway
         */
    	function getServerHost(){
    		return serverHost;
    	}

        function setSlaClickedView(data)
        {
            slaClickedView = data;
        }

        function getSlaClickedView()
        {
            return slaClickedView;
        }


        function custDialog(text, buttonOptions, esc) {
            if (esc != true) esc = false;
            jQuery("#dialog-confirm p").html(text);
            jQuery( "#dialog-confirm" ).dialog({
                title: "Notification",
                closeOnEscape: esc,
                draggabe: false,
                resizable: false,
                width: 500,
                height:200,
                modal: true,
                buttons: buttonOptions
            });
        }
    }

 })();