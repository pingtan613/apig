(function() {
    'use strict';

    angular
        .module('app.sla')
        .controller('Sla', Sla);

    Sla.$inject = ['slaservice', '$location', '$scope'];

    function Sla(slaservice, $location, $scope) {
    	var vm = this;

        vm.display_error = false;
        vm.showButton = false;
        vm.outage = {};
        vm.slaDetails = {};
        vm.slaDetailsMonths = [];
        vm.errorInfo = {};

        vm.timeStart = [
            "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
            "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",
            "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
            "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
        ];

        vm.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        vm.monthsTrue = {"Jan": true, "Feb": true, "Mar": true, "Apr": true, "May": true, "Jun": true, "Jul": true, "Aug": true, "Sep": true, "Oct": true, "Nov": true, "Dec": true};

        vm.monthTableData = {"Jan": {}, "Feb": {}, "Mar": {}, "Apr": {}, "May": {}, "Jun": {}, "Jul": {}, "Aug": {}, "Sep": {}, "Oct": {}, "Nov": {}, "Dec": {}};



    	vm.init = function()
    	{
                slaservice.clearTableData();
        		slaservice.getClickeSlaData().then(function(response) {
                slaservice.setRevisions(response.data.engagements);

                slaservice.getSlaDetails(response.data.engagements[0].id).then(function(response) {
                    slaservice.setSlaData(response.data.engagement);
                    console.log(response.data.engagement);
                    if(response.data.engagement.sla.length !== 0)
                    {
                        vm.showButton = true;
                    }
                    
                    if(response.data.engagement.sla.length === undefined)
                    {
                        for(var i in response.data.engagement.sla)
                        {
                            slaservice.setTableData(i, response.data.engagement.sla[i]);
                        }
                    }
                    vm.outage = response.data.engagement.outage;
                    vm.outage.drDuration = parseInt(vm.outage.drDuration);
                    vm.outage.plannedDuration = parseInt(vm.outage.plannedDuration);
                    vm.outage.unplannedDuration = parseInt(vm.outage.unplannedDuration);


                }, function(data)
                {
                    if(data.data.message === 'Invalid Token')
                    {
                      $location.path("/")
                    }
                    else
                    {
                        vm.errorInfo = data.data;
                        vm.display_error = true;
                        window.scrollTo(0, 0);
                    }
                });
            },function(data)
            {
                if(data.data.message === 'Invalid Token')
                {
                  $location.path("/")
                }
                else
                {
                    vm.errorInfo = data.data;
                    vm.display_error = true;
                    window.scrollTo(0, 0);
                }
            });
    	}

        vm.dateChange = function(data)
        {
            if(data  === "mtp_date")
            {
                var date = parseInt(vm.getSlaData().mtp_date * 1000);

                date = new Date(date);
                return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

            }
            else if (data === "test_date")
            {
                var date = parseInt(vm.getSlaData().test_date * 1000);

                date = new Date(date);
                return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

            }
            

        }

        vm.tempData = {};
        vm.updateSLA = function()
        {

            var days = vm.slaDetails.daysApplied;


            if(days === undefined)
            {

            }
            else if(days.length === 7)
            {
                vm.slaDetails.daysApplied = "All"
            }
            else if(days[0] === "M" && days[days.length-1] === "SA" && days.length === 6)
            {
                vm.slaDetails.daysApplied = "M-SA"
            }
            else if(days[0] === "M" && days[days.length-1] === "F" && days.length === 5)
            {
                vm.slaDetails.daysApplied = "M-F"
            }
            else if(days[0] === "M" && days[days.length-1] === "TH" && days.length === 4)
            {
                vm.slaDetails.daysApplied = "M-TH"
            }
            else if(days[0] === "M" && days[days.length-1] === "W" && days.length === 3)
            {
                vm.slaDetails.daysApplied = "M-W"
            }
            else if(days[0] === "M" && days[days.length-1] === "TU"&& days.length === 2)
            {
                vm.slaDetails.daysApplied = "M-TU"
            }
            else if(days.length === 1)
            {   
                vm.slaDetails.daysApplied = days[0].toString();
            }
            else
            {
                var temp = "";
                for(var i in days)
                {
                    temp += " " + days[i];
                }
                vm.slaDetails.daysApplied = temp;
            }

            vm.tempData = vm.slaDetails;


            for(var i in vm.slaDetailsMonths)
            {
                slaservice.setTableData(i, vm.slaDetails);

            }

            vm.slaDetailsMonths = undefined;
            vm.slaDetailsMonths = [];
            vm.slaDetails = undefined;
            vm.slaDetails = {};
            console.log(vm.tempData);
            vm.UncheckAll('checkMonths', false);
        }


        vm.submitForReview = function()
        {

            vm.slaDetails = undefined;
            vm.slaDetails = {};

            var table = slaservice.getTableData();

            for(var i in table)
            {
                for(var j in table[i])
                {
                    table[i][j] = table[i][j].toString();
                }
            }

            var data = vm.getSlaData();
            //data.comment = vm.newComments;
            console.log(data);
            data.outage = vm.outage;
            data.sla = table;

            for(var i in data.outage)
            {
                data.outage[i] = data.outage[i].toString();
            }

            data.state = "pending";
            console.log(data);

            data = JSON.stringify(data);

            slaservice.putSlaData(data).then(function(response) 
            {
                if(response.status < 400)
                {

                    slaservice.clearTableData();

                        vm.display_error = false;
                        vm.getCustDialog("SLA Submission Successfull<br>Workflow ID:" + response.data.workflow_id, {
                            "OK": function() {
                                jQuery(this).dialog( "destroy" );
                                $location.path("/service/overview");
                                $scope.$apply();                           
                            }
                        });
                }
            }, 
            function(data)
            {
                if(data.data.message === 'Invalid Token')
                {
                  $location.path("/")
                }
                else
                {
                    vm.errorInfo = data.data;
                    vm.display_error = true;
                    window.scrollTo(0, 0);
            }           
            });
        }
        

        vm.UncheckAll = function(labelID, val)
        {
            var checks = document.querySelectorAll('#' + labelID + ' input[type="checkbox"]');
            for(var i =0; i< checks.length;i++){
                var check = checks[i];
                if(!check.disabled){
                    check.checked = val;
                }
            }

            if(val)
            {
                vm.slaDetailsMonths = vm.monthsTrue; 
            }
            else
            {
                vm.slaDetailsMonths = [];
            }

        }


        vm.initView = function()
        {

        }


        vm.getRevisions = function()
        {
            return slaservice.getRevisions();
        }

        vm.getSlaData = function()
        {
            return slaservice.getSlaData();
        }

        vm.getTableData = function()
        {
            return slaservice.getTableData();
        }

        vm.getCustDialog = function(message, buttons, etc)
        {
            slaservice.getCustDialog(message, buttons, etc);
        }

    }


})();
