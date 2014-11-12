var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'ctrl',
			templateUrl: '../view/mj.html'
		})
		.otherwise({redirectTo:'/'});
});

app.factory('mahjongFactory', function(){
	var factory = {};

		factory.defaultSets = {
		bamboo : {
			'1': 4,
			'2': 4,
			'3': 4,
			'4': 4,
			'5': 4,
			'6': 4,
			'7': 4,
			'8': 4,
			'9': 4
		},
		man : {
			'1': 4,
			'2': 4,
			'3': 4,
			'4': 4,
			'5': 4,
			'6': 4,
			'7': 4,
			'8': 4,
			'9': 4
		},
		pin : {
			'1': 4,
			'2': 4,
			'3': 4,
			'4': 4,
			'5': 4,
			'6': 4,
			'7': 4,
			'8': 4,
			'9': 4
		},
		dragon : {
			'chun': 4,
			'green': 4,
			'haku' : 4
		},
		wind : {
			'east' : 4,
			'north' : 4,
			'south' : 4,
			'west' : 4
		}
	}

	factory.fullSets = {
		bamboo : {
			'1': 4,
			'2': 4,
			'3': 4,
			'4': 4,
			'5': 4,
			'6': 4,
			'7': 4,
			'8': 4,
			'9': 4
		},
		man : {
			'1': 4,
			'2': 4,
			'3': 4,
			'4': 4,
			'5': 4,
			'6': 4,
			'7': 4,
			'8': 4,
			'9': 4
		},
		pin : {
			'1': 4,
			'2': 4,
			'3': 4,
			'4': 4,
			'5': 4,
			'6': 4,
			'7': 4,
			'8': 4,
			'9': 4
		},
		dragon : {
			'chun': 4,
			'green': 4,
			'haku' : 4
		},
		wind : {
			'east' : 4,
			'north' : 4,
			'south' : 4,
			'west' : 4
		}
	}

	factory.shuffleSets = function(){
		var sets = [];
			_.each(factory.fullSets, function(x,type){
				_.each(x, function(num,set){
					for(var i =0; i<num; i++){
						sets.push(type+'-'+set);
						factory.fullSets[type][set]--;
					}
				})
			})
		return _.shuffle(sets);
	}
	factory.mySets = [];
	factory.rSets = [];
	factory.uSets = [];
	factory.lSets = [];

	//factory.gameSets = [];


	factory.readySets = function(sets){
		while(this.gameSets.length > 83){
			this.mySets.push(this.gameSets.pop());
			if(this.mySets.length>13) {return};
			this.rSets.push(this.gameSets.pop());
			if(this.rSets.length>13) {return};
			this.uSets.push(this.gameSets.pop());
			if(this.uSets.length>13) {return};
			this.lSets.push(this.gameSets.pop());
			if(this.lSets.length>13) {return};
		}
	}

	factory.displayCard = function(set, position){
		var $pos = $('div#'+position);
		set.sort();
		console.log(set.length);
		for (var i=0; i<set.length; i++){
			var mj = '<img id="'+position+'" src="../graphics/'+set[i]+'.png"></img>';
			$pos.append(mj);
		}
	}

	factory.displayOpponents = function(set, position) {
		var $pos = $('div#'+position);
		console.log(set.length);
		for (var i=0; i<set.length; i++){
			var mj = '<img id="'+position+'" src="../graphics/face-down-128px.png"></img>';
			$pos.append(mj);
			$('img').fadeIn('slow');
		}
	}

	return factory;
});

app.controller('ctrl', ['$scope','$http', 'mahjongFactory',function ctrl($scope, $http, mahjongFactory){
	$scope.mySets = [];
	$scope.rSets = [];
	$scope.lSets = [];
	$scope.uSets = [];
	$scope.readySets = mahjongFactory.readySets;
	$scope.displayCard = mahjongFactory.displayCard;
	$scope.displayOpponents = mahjongFactory.displayOpponents;
	$scope.shuffleSets = mahjongFactory.shuffleSets;

	$scope.gameSets = mahjongFactory.shuffleSets();
	$scope.readySets();
	$scope.displayCard($scope.mySets, 'me');
	$scope.displayOpponents($scope.rSets, 'right');
	$scope.displayOpponents($scope.uSets, 'up');
	$scope.displayOpponents($scope.lSets, 'left');
	console.log(mahjongFactory.shuffleSets());

	$('img#me').mouseenter(function(){
		$(this).stop().animate({
			'top': '-20px'
		},100);
	})

	$('img#me').mouseleave(function(){
		$(this).stop().animate({
			'top': '0px'
		},100);
	})


}]);