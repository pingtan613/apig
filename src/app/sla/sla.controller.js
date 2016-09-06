(function() {
    'use strict';

    angular
        .module('app.sla')
        .controller('Sla', Sla);

    Sla.$inject = ['slaservice', '$location'];

    function Sla(slaservice, $location) {
    	var vm = this;

        vm.showButton = false;
        vm.outage = [];
        vm.slaDetails = [];
        vm.slaDetailsMonths = [];

        vm.timeStart = [
            "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
            "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",
            "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
            "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
        ];

        vm.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        vm.monthsTrue = {"Jan": true, "Feb": true, "Mar": true, "Apr": true, "May": true, "Jun": true, "Jul": true, "Aug": true, "Sep": true, "Oct": true, "Nov": true, "Dec": true};

        vm.monthTableData = {"Jan": [], "Feb": [], "Mar": [], "Apr": [], "May": [], "Jun": [], "Jul": [], "Aug": [], "Sep": [], "Oct": [], "Nov": [], "Dec": []};;


    	vm.init = function()
    	{
    		slaservice.getClickeSlaData().then(function(response) {
                console.log(response.data.engagements[0]);
                slaservice.setRevisions(response.data.engagements);

                slaservice.getSlaDetails(response.data.engagements[0].id).then(function(response) {
                    console.log(response.data.engagement.test_date);

                    var date = new Date(response.data.engagement.test_date);
                    console.log(date);
                    response.data.engagement.test_date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                    console.log(response.data.engagement.test_date);

                    var date = new Date(response.data.engagement.mtp_date);
                    console.log(date);
                    response.data.engagement.mtp_date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                    console.log(response.data.engagement.mtp_date);

                    if(response.data.engagement.sla.length !== 0)
                    {
                        vm.showButton = true;
                    }

                    slaservice.setSlaData(response.data.engagement);

                }, function(data)
                {
                    console.log(data);
                });



            },function(data)
            {
                console.log(data);
            });
    	}

        vm.updateSLA = function()
        {
            console.log(vm.slaDetails.daysApplied);

            var days = vm.slaDetails.daysApplied;

            if(days.length === 7)
            {
                console.log("All");
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



            for(var i in vm.slaDetailsMonths)
            {
                slaservice.setTableData(i, vm.slaDetails);

            }
            vm.slaDetails = undefined;
            vm.slaDetails = [];
            vm.UncheckAll('checkMonths', false);
        }

        vm.submitForReview = function()
        {
            console.log(vm.outage); 
            console.log(vm.slaDetails);
            console.log(vm.slaDetailsMonths);

            console.log(slaservice.getTableData());

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

    }


})();
