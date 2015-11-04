bitbucketAPIApp.config(function ($routeProvider) {
    $routeProvider
        .when('/issues', {
            templateUrl: 'tmpl/issues.html',
            controller: 'issueController'
        }).when('/my-issues', {
            templateUrl: 'tmpl/myIssues.html',
            controller: 'issueController'
        }).when('/edit-issue/:issue_id', {
            templateUrl: 'tmpl/editIssue.html',
            controller: 'issueController'
        }).when('/login', {
            templateUrl: 'tmpl/login.html',
            controller: 'loginController'
        }).when('/bookTickets/:id', {
            templateUrl: 'tmpl/bookTickets.html',
            controller: 'bookTicketsController'
        }).otherwise({
            redirectTo: '/login'
        });
}).service("authentication", function authentication($location){

    var $scope = this;

    $scope.username = localStorage.getItem('username');
    $scope.password = localStorage.getItem('password');
    $scope.repository = localStorage.getItem('repository');
    $scope.team = localStorage.getItem('team');
    $scope.displayName = localStorage

    $scope.displayName = localStorage.getItem('name');

    $scope.isLoggedIn = function() {
        if($scope.username === '' && $scope.password === ''){
            $location.path('/login');
        }
    };

    $scope.isLoggedIn();


}).service("header", function generateHeaderSrc($location){

    var $scope = this;

    $scope.checkLocation = function(){

        $scope.src = 'tmpl/header.html';

        switch($location.path()){
            case '/login':
                $scope.class = 'hidden';
                $scope.isLogin = true;
                break;
            default:
                $scope.class = '';
                $scope.isLogin = false;
                break;
        }
    };

    $scope.getMyIssues = function() {

    };

    $scope.checkLocation();

});