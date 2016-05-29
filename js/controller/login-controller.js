bitbucketAPIApp.controller("loginController", function ($scope, $http, $routeParams, $location, $route, $templateCache, authentication, header) {

    $scope.valid = false;
    $scope.username = '';
    $scope.password = '';
    $scope.repository = '';
    $scope.team = '';

    $scope.user = {
        username: {
            value: '',
            valid: false
        },
        password: {
            value: '',
            valid: false
        },
        repository: {
            value: '',
            valid: false
        },
        team: {
            value: '',
            valid: true
        }
    };

    $scope.checkValidity = function(item){

        if(item.value == '' || typeof item.value == "undefined"){
            item.valid = false;
        }else{
            item.valid = true;
        }

    };

    $scope.loginValidity = function(user){

        if(user.username.valid && user.password.valid){
            return true;
        }else{
            return false;
        }
    };

    $scope.validate = function (user) {

        $scope.isLoggingIn = true;
        // just a hack to validate the user
        $http({
            method: 'GET',
            url: 'https://bitbucket.org/api/2.0/users/' + user.username.value,
            headers: {
                "Authorization": "Basic " + btoa(user.username.value + ":" + user.password.value)
            }
        }).then(function successCallback(response) {

            // set global variables
            localStorage.setItem(storage_prefix+'username', user.username.value);
            localStorage.setItem(storage_prefix+'password', user.password.value);
            localStorage.setItem(storage_prefix+'name', response.data.display_name);
            localStorage.setItem(storage_prefix+'avatar', response.data.links.avatar.href);
            localStorage.setItem(storage_prefix+'repository', user.repository.value);

            if(user.team.value == '' || typeof user.team.value == "undefined"){
                localStorage.setItem(storage_prefix+'team', 'arnlea');
            }else{
                localStorage.setItem(storage_prefix+'team', user.team.value);
            }

            if(user.repository.value == '' || typeof user.repository.value == "undefined"){
                localStorage.setItem(storage_prefix+'repository', 'iso14224');
            }else{
                localStorage.setItem(storage_prefix+'repository', user.team.value);
            }


            console.log(response);

            authentication.username = localStorage.getItem(storage_prefix+'username');
            authentication.password = localStorage.getItem(storage_prefix+'password');
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