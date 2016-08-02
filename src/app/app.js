var APIG_APP = angular.module('APIG', ['ngCookies', 'ngRoute', 'LocalStorageModule', 'ui.select', 'ngSanitize']);

APIG_APP.run(function($rootScope) {
	
});

APIG_APP.config( function($routeProvider) {
	$routeProvider
		.when('/',
			{
				controller: 'clientController',
				templateUrl: 'client/_intro.html'
			})
		.when('/client/search/result',
			{
				controller: 'clientController',
				templateUrl: 'client/_result.html'
			})
		.when('/client/service/engagement',
			{
				controller: 'clientController',
				templateUrl: 'client/_engagementForm.html'
			})
		.when('/client/service/:clientServideId',
			{
				controller: 'clientController',
				templateUrl: 'client/_clientService.html'
			})
		.when('/service/overview',
			{
				controller: 'serviceController',
				templateUrl: 'category/service/_overview.html'
			})
		.when('/service/published',
			{
				controller: 'serviceController',
				templateUrl: 'category/service/_published.html'
			})
		.when('/service/consumed',
			{
				controller: 'serviceController',
				templateUrl: 'category/service/_consumed.html'
			})
		.when('/service/edit/:serviceId',
			{
				controller: 'serviceController',
				templateUrl: 'category/service/_serviceEdit.html'
			})
		.when('/service/register',
			{
				controller: 'serviceController',
				templateUrl: 'category/service/_serviceRegister.html'
			})
		.when('/service/viewClients/:clientId',
			{
				controller: 'serviceController',
				templateUrl: 'category/service/_viewClient.html'
			})
		.when('/sla/view/:slaId',
			{
				controller: 'slaController',
				templateUrl: 'sla/_details.html'
			})
		.when('/sla/edit/:slaId',
			{
				controller: 'slaController',
				templateUrl: 'sla/_slaEdit.html'
			})
		.when('/wsdl/upload/:serviceId',
			{
				controller: 'wsdlController',
				templateUrl: 'wsdl/_upload.html'
			})
		.when('/logout',
			{
				controller: 'logoutController',
				templateUrl: 'views/logout.html'
			})
		.otherwise({
			redirectTo: '/'});
});

var controllers = {};
var services = {};