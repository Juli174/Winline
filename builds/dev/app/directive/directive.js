;(function(){
	'use strict';

	angular.module('Fitness.Directive', [])
		.directive('tplDirective', tplDirective)


	//@ngInject
	function tplDirective(){
		// return function link(scope, elem, attrs) {
		// 	console.log(scope);
		// 	console.log(elem);
		// 	console.log(attrs);
		// 	elem.css('border', '1px solid red');
		// 	var text = scope.inputText;
		// 	elem.text(text);

		// };
		return{
			//templateUrl: 'app/directive/index.html',
			//scope: false, //true // {}
			scope: {
				titleTemplate: '@template'
			},
			templateUrl: function(tElem, tAttrs){
				console.log(tAttrs);
				return tAttrs.template === 'panel'
					? 'app/directive/index.html'
					: 'app/directive/index2.html';
			},
			link: function(scope, elem, attrs){
				console.log('titleTemplate', scope.titleTemplate);
				console.log(scope);
				scope.title = attrs.title;
				scope.body = attrs.inputText;
			}
		}
	}
})();