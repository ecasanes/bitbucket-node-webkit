bitbucketAPIApp.directive('issueTable', function(){
    return {
        templateUrl: "tmpl/directive/issueTable.html",
        restrict: "E",
        controller: 'issueController',
        replace: true
    }
});