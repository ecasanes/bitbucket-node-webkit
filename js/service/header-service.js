bitbucketAPIApp.service("header", function generateHeaderSrc($location){

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

    // initialize
    $scope.checkLocation();

});