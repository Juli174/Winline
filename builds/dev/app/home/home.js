;(function(){
	'use strict';

	angular.module('Fitness.Home', [
		'Fitness.Directive'
		])
	.controller('HomeCtrl', HomeController)
	.config(HomeConfig)
	.directive('avatar', AvatarDirective)
	

	//@ngInject
	function AvatarDirective(){
		return {
			restrict:'AEM',
			template: '<div ng-bind="hc.hello"></div>',
			replace: true,
			priority: 0, //ngRepeat = 1000
			scope: false //true, {}
		};
	}

	//@ngInject
	function HomeController($scope){
		var s = this;
		s.hello = 'hello';
		$scope.inputText = "New Text";
	}

	//@ngInject
	function HomeConfig($stateProvider){
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/home/index.html',
			controller: 'HomeCtrl',
			controllerAs: 'hc'
		});
	}
})();