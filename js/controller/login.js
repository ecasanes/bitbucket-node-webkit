bitbucketAPIApp.controller("loginController", function ($scope, $http, $routeParams, $location, $route, $templateCache, authentication, header) {

    $scope.username = '';
    $scope.password = '';
    $scope.repository = '';
    $scope.team = '';

    $scope.validate = function () {

        $scope.isLoggingIn = true;
        // just a hack to validate the user
        $http({
            method: 'GET',
            url: 'https://bitbucket.org/api/2.0/users/' + $scope.username,
            headers: {
                "Authorization": "Basic " + btoa($scope.username + ":" + $scope.password)
            }
        }).then(function successCallback(response) {

            // set global variables
            localStorage.setItem('username', $scope.username);
            localStorage.setItem('password', $scope.password);
            localStorage.setItem('name', response.data.display_name);
            localStorage.setItem('avatar', response.data.links.avatar.href);
            localStorage.setItem('repository', $scope.repository);
            localStorage.setItem('team', $scope.team);

            console.log(response);

            authentication.username = localStorage.getItem('username');
            authentication.password = localStorage.getItem('password');
            authentication.repository = localStorage.getItem('repository');
            authentication.team = localStorage.getItem('team');
            authentication.displayName = localStorage.getItem('name');
            header.class = '';

            // redirect
            $location.path("/issues");

        }, function errorCallback(response) {
            console.log(response);
            $('#username').closest('.form-group').addClass('has-warning');
            $('#password').closest('.form-group').addClass('has-warning');

            $scope.isLoggingIn = false;
        });
    };

    // route manipulation
    $scope.back = function () {
        window.history.back();
    };

    $scope.getCount = function (n) {
        return new Array(n);
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    };

});