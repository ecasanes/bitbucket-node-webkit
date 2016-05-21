bitbucketAPIApp.service("authentication", function authentication($location){

    var $scope = this;

    $scope.username = localStorage.getItem(storage_prefix+'username');
    $scope.password = localStorage.getItem(storage_prefix+'password');
    $scope.repository = localStorage.getItem(storage_prefix+'repository');
    $scope.team = localStorage.getItem(storage_prefix+'team');
    $scope.displayName = localStorage.getItem(storage_prefix+'name');

    $scope.isLoggedIn = function() {
        if($scope.username === '' && $scope.password === ''){
            $location.path('/login');
        }
    };

    $scope.isLoggedIn();


});