var worldcup = angular.module('worldcup', ['ngRoute','googlechart']);
worldcup.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'AppCtrl'
      }).
      when('/team/:iso', {
        templateUrl: 'views/team.html',
        controller: 'teamCtrl'
      }).
      when('/all_team/', {
          templateUrl: 'views/all_team.html',
          controller: 'allteamCtrl'
        }).
      otherwise({
        redirectTo: '/',
        controller: 'AppCtrl'
      });
  }]).value('googleChartApiConfig', {
      version: '1',
      optionalSettings: {
          packages: ['corechart'],
          language: 'fr'
      }
  });
worldcup.controller('AppCtrl', ['$scope','wcService','$routeParams', function($scope,wcService,$routeParams) {
	$scope.chartObject = {data : {}};
	$scope.chartObject.type = 'PieChart';
	$scope.groups=[];
	
		wcService.getListgroup().then(function(promise) {
				promise.data.forEach(function (val, index) {
					group = {
								id: val.group.id ,
								letter : val.group.letter,
								teams : val.group.teams
							};
					$scope.groups.push(group);
					slices = {"cols": [
					          {id: "t", label: "Topping", type: "string"},
					          {id: "s", label: "Slices", type: "number"}
					      ], "rows": []};
					angular.forEach(val.group.teams, function(value, key) {
						  	slice = {c: [
							            {v: value.team.country},
							            {v: value.team.points},
							]};
						  	slices['rows'].push(slice);
					});
					$scope.chartObject.data[val.group.letter]=slices;
				});
			});
}
]);

worldcup.controller('teamCtrl', ['$scope','wcService','$routeParams', function($scope,wcService,$routeParams) {

	$scope.matchs= [];
	
		wcService.getDetailTeam($routeParams.iso).then(function(promise) {
				promise.data.forEach(function (val, index) {
					
					match = {
							location: val.location ,
							home_team : val.home_team,
							away_team : val.away_team,
							winner : val.winner,
							eventHome : [],
							eventaway : []
						};
					if(val.home_team_events.length>0){
						angular.forEach(val.home_team_events, function(value, key) {
							match.eventHome.push(value);
						});
					}
					if(val.away_team_events.length>0){
						angular.forEach(val.away_team_events, function(value, key) {
							match.eventaway.push(value);
						});
					}
					$scope.matchs.push(match);
				});
			});
}
]);
worldcup.controller('allteamCtrl', ['$scope','wcService', function($scope,wcService) {

	$scope.teams= [];
	
		wcService.getlistTeam().then(function(promise) {
				promise.data.forEach(function (val, index) {
					
					team = {
							country: val.country ,
							fifa_code : val.fifa_code,
							group_id : val.group_id
						};
					$scope.teams.push(team);
				});
			});
}
]);
