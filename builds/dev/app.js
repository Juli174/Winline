;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises',
		'Fitness.Home'
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseio.com/')
	.config(Config)
	.controller('MainCtrl', MainController)
	.run(Run)

	//@ngInject
	function Config($urlRouterProvider){
		$urlRouterProvider
			.otherwise('/home');
	}

	//@ngInject
	function MainController($log, $scope){
		$scope.hello = 'hello';
	}

	//@ngInject
	function Run($rootScope){
		$rootScope.alerts = [];

		$rootScope.addAlert = function(_type, _msg) {
			_type = _type || "warning";
		    $rootScope.alerts.push({type: _type, msg: _msg});
		  };

		$rootScope.closeAlert = function(index) {
		    $rootScope.alerts.splice(index, 1);
		  };
	}
})();
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
;(function(){
	'use strict';

	angular.module('Fitness.Exercises', [
		 'Fitness.Exercises.Repository',
		 'ui.bootstrap'
		])
	.controller('ExercisesCtrl', ExercisesController)
	.config(ExercisesConfig)

	//@ngInject
	function ExercisesController($q, ExercisesRepository, $rootScope, $scope){
		var s = this;
		var exercises = ExercisesRepository.getAllExercises();
		exercises.$loaded(function(_exercisesList){
			s.list = _exercisesList;
		});

		// exercises.$watch(function(_exercisesList){
		// 	s.list = _exercisesList;
		// });

		s.newExercise = {
			name: "",
			target: ""
		};

		s.addExercise = function(){
			ExercisesRepository.addNewExercise(s.newExercise)
				.then(function(ref){
					$rootScope.addAlert('success', "Упражнение успешно добавлено"); 
				});
			s.newExercise = {
				name: "",
				target: ""
			};
		}

		s.removeExercise = function(_$id){
			ExercisesRepository
				.removeExercise(_$id)
				.then(function(){
					console.log(arguments);
					$rootScope.addAlert('success', 'Упражнение успешно удалено');
				});
		}

		//pagination
		s.currentPage = 1;
	}

	//@ngInject
	function ExercisesConfig($stateProvider){
		$stateProvider
		.state('exercises', {
			url: '/exercises',
			templateUrl: 'app/exercises/index.html',
			controller: 'ExercisesCtrl',
			controllerAs: 'esc'
		});
	}


})();
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
;(function(){
	'use strict';

	angular.module('Fitness.Fire', [
		'firebase'
		])
	.factory('dbc', dbcFactory)

	//@ngInject
	function dbcFactory(FIREBASE_URL, $firebaseAuth){
		//$log.debug('dbc factory');
		var o = {};
		var reference = new Firebase(FIREBASE_URL);

		o.getRef = function(){
			return reference;
		}

		return o;
	}
})();
;(function(){
	'use strict';

	angular.module('Fitness.Exercises.Repository', [
		'Fitness.Fire'
		])
	.factory('ExercisesRepository', ExercisesRepositoryFactory)

	function ExercisesRepositoryFactory(dbc, $firebaseArray, $firebaseObject){
		var o = {};

		o.getAllExercises = function(){
			var ref = dbc.getRef();

			return $firebaseArray(ref.child('exercises'));

		}

		o.addNewExercise = function(_exercise){
			if(_exercise && _exercise.name && _exercise.name.length > 0){
				var ref = dbc.getRef();
				var exercisesList = $firebaseArray(ref.child('exercises'));
				return exercisesList.$add(_exercise);
			}
			return false;
		}

		o.removeExercise = function(_$id){
			if(_$id){
				var ref = dbc.getRef();
				//var exercisesList = $firebaseArray(ref.child('exercise'));
				//return exercisesList.$remove(_$id);
				var exercisesList = $firebaseObject(ref.child('exercises').child(_$id));
				return exercisesList.$remove();
			}
		}

		return o;
	}
})();