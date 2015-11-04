bitbucketAPIApp.controller("pageController", function ($scope, $http, $routeParams, $location, header) {

    $scope.headerSrc = header.src;
    $scope.displayName = localStorage.getItem('name');
    $scope.avatar = localStorage.getItem('avatar');

    $scope.getHeaderSrc = function() {
        return header.src;
    };

    $scope.getMyIssues = function(){
        $location.path('/my-issues')
    };

    // route manipulation
    $scope.back = function () {
        window.history.back();
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.logout = function(){
        localStorage.setItem('username','');
        localStorage.setItem('password','');
        localStorage.setItem('repository', '');
        localStorage.setItem('team','');

        $location.path('/login');
    };

});