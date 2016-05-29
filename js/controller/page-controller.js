bitbucketAPIApp.controller("pageController", function ($scope, $location, header) {

    $scope.headerSrc = header.src;
    $scope.displayName = localStorage.getItem(storage_prefix+'name');
    $scope.avatar = localStorage.getItem(storage_prefix+'avatar');
    $scope.pageTitle = '';

    $scope.getHeaderSrc = function() {
        return header.src;
    };

    $scope.getMyIssues = function(){
        $location.path('/my-issues')
    };

    $scope.getMyTodos = function(){
        $location.path('/my-todos')
    };

    $scope.logout = function(){
        localStorage.setItem(storage_prefix+'username','');
        localStorage.setItem(storage_prefix+'password','');
        localStorage.setItem(storage_prefix+'repository', '');
        localStorage.setItem(storage_prefix+'team','');

        $location.path('/login');
    };

    // route manipulation
    $scope.back = function () {
        window.history.back();
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.getCount = function (n) {
        return new Array(n);
    };

    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    };

});