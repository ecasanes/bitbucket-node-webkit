bitbucketAPIApp.controller("settingsController", function ($scope, $http, authentication, _) {
    'use strict'

    $scope.teams = [{
        display_name:'personal',
        username:'ecasanes'
    }];
    $scope.repositories = [];
    $scope.defaultTeam = {
        username: authentication.username
    };

    $scope.getAllTeams = function () {

        console.log('get all teams ');

        var url = 'https://api.bitbucket.org/2.0/teams';

        $http({
            method: 'GET',
            url: url,
            params: {
                role: 'member'
            },
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            }
        }).then(function successCallback(response) {

            console.log(response.data);
            $scope.teams = $scope.teams.concat(response.data.values);

            $scope.selectDefaultTeam(authentication.team);
            $scope.getAllRepositoriesByTeam();

        }, function errorCallback(response) {

            console.log(response);
        });
    };

    $scope.getAllRepositoriesByTeam = function() {

        console.log($scope.defaultTeam);

        var url = 'https://api.bitbucket.org/2.0/repositories/'+$scope.defaultTeam.username;

        $http({
            method: 'GET',
            url: url,
            params: {},
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            }
        }).then(function successCallback(response) {

            console.log(response);

            $scope.repositories = response.data.values;

            authentication.setTeam($scope.defaultTeam.username);

            $scope.defaultRepository = authentication.repository;


        }, function errorCallback(response) {

            console.log(response);
        });
    };

    $scope.selectDefaultTeam = function(teamName) {

        console.log('select default team');

        $scope.defaultTeam = _.findWhere($scope.teams, {username: teamName});

        console.log($scope.defaultTeam);
    };

    $scope.changeDefaultRepository = function(){
        authentication.setRepository($scope.defaultRepository);
    };

    // initialize
    $scope.getAllTeams();

});