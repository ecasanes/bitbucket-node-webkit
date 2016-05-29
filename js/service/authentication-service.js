bitbucketAPIApp.service("authentication", function authentication($location){

    var $scope = this;

    $scope.username = localStorage.getItem(storage_prefix+'username');
    $scope.password = localStorage.getItem(storage_prefix+'password');
    $scope.repository = localStorage.getItem(storage_prefix+'repository');
    $scope.team = localStorage.getItem(storage_prefix+'team');
    $scope.displayName = localStorage.getItem(storage_prefix+'name');
    $scope.teamRepoPath = '';

    $scope.getTeamRepositoryPath = function() {
        if(typeof $scope.repository !== "undefined" && $scope.repository !== ""){
            $scope.teamRepoPath = $scope.repository;
        }else{
            $scope.teamRepoPath = $scope.team;
        }
    };

    $scope.setTeam = function(teamName){
        localStorage.setItem(storage_prefix+'team', teamName);
        $scope.team = teamName;
        $scope.getTeamRepositoryPath();
    };

    $scope.setRepository = function(repoName){
        localStorage.setItem(storage_prefix+'repository', repoName);
        $scope.repository = repoName;
        $scope.getTeamRepositoryPath();
    };

    $scope.isLoggedIn = function() {
        if($scope.username === '' && $scope.password === ''){
            $location.path('/login');
        }
    };

    $scope.isLoggedIn();
    $scope.getTeamRepositoryPath();


});