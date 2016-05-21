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
            localStorage.setItem(storage_prefix+'username', $scope.username);
            localStorage.setItem(storage_prefix+'password', $scope.password);
            localStorage.setItem(storage_prefix+'name', response.data.display_name);
            localStorage.setItem(storage_prefix+'avatar', response.data.links.avatar.href);
            localStorage.setItem(storage_prefix+'repository', $scope.repository);
            localStorage.setItem(storage_prefix+'team', $scope.team);

            console.log(response);

            authentication.username = localStorage.getItem(storage_prefix+'username');
            authentication.password = localStorage.getItem(storage_prefix+'password');
            authentication.repository = localStorage.getItem(storage_prefix+'repository');
            authentication.team = localStorage.getItem(storage_prefix+'team');
            authentication.displayName = localStorage.getItem(storage_prefix+'name');
            authentication.avatar = localStorage.getItem(storage_prefix+'avatar');
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

});