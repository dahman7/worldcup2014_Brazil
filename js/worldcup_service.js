worldcup.service('wcService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

	var deferred = $q.defer();

		this.getListgroup = function() {
		    return $http.get('http://worldcup.sfg.io/teams/group_results')
		           .success(function (data, status, headers, config) {
						return data;
					}) ;
		};
		this.getDetailTeam = function(iso) {
		    return $http.get('http://worldcup.sfg.io/matches/country?fifa_code='+iso.toUpperCase())
	           .success(function (data, status, headers, config) {
					return data;
				}) ;
		};
		this.getlistTeam = function() {
			    return $http.get('http://worldcup.sfg.io/teams/')
		           .success(function (data, status, headers, config) {
						return data;
					}) ;
		};
}]);