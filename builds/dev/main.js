;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises',
		'Fitness.Singletone',
		'Fitness.Directive',
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseapp.com')
	.value('configOptions', {
		lang: 'ru',
		timezone: '+3'
	})
	.config(Config)

	//@ngInject
	function Config($urlRouterProvider, $logProvider){
		$logProvider.debugEnabled(true);
		$log.debug('main config');
		$urlRouterProvider.otherwise('/');
	}
})();