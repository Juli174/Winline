;(function(){
	'use strict';

	angular
		.module('Fitness.Singletone', [
			])
		.controller('SingletoneCtrl', SingletoneController)
		.config(SingletoneConfig)
		.factory('SingletoneFactory', SingletoneFactory)
		.service('SingletoneService', SingletoneService)
		.provider('Singletone', SingletoneProvider)

	//@ngInject
	function SingletoneService(){
		var privateVal = null;

		this.val = "Some value";

		this.getPrivate = function(){
			return privateVal;
		}

		this.setPrivate = function(_privateVal){
			privateVal = _privateVal;
		}
	}

	//@ngInject
	function SingletoneFactory(){
		var o = {};
		var privateVal = null;

		o.val = "Some value";

		o.getPrivate = function(){
			return privateVal;
		}

		o.setPrivate = function(_privateVal){
			privateVal = _privateVal;
		}

		return o;
	}

	//@ngInject
	function SingletoneProvider(){
		var privateVal = "Private";
		return{
			setPrivate: function(_privateVal){
				privateVal = _privateVal;
			},

			$get: function(){
				var o = {};
				o.getPrivate = privateVal;
				return o;
			}
		}
	}

	//@ngInject
	function SingletoneController(){

	}

	//@ngInject
	function SingletoneConfig($stateProvider){
		$stateProvider
		.state('singletone', {
			url: '/singletone',
			templateUrl: 'app/singletone/index.html',
			controller: 'SingletoneCtrl',
			controllerAs: 'stc'
		});
	}
})();

var UserRepository = function(){
	var repository;

	function createRepository(){
		repository = {
			count: 2
		};
		return repository;
	}

	return {
		getInstance: function(){
			if(!repository){
				repository = createRepository();
			}
			return repository;
		},
		getCount: function(){
			return repository.count;
		},
		setCount: function(_count){
			repository.count = _count;
		}
	}
};

var repository = new UserRepository;

var rep1 = repository.getInstance();
var rep2 = repository.getInstance();