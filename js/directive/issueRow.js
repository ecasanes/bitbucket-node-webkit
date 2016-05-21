bitbucketAPIApp.directive('issueRow', function($compile){
    return {
        templateUrl: "tmpl/directive/issueRow.html",
        restrict: "E",
        scope: {
            datasource: '='
        },
        controller: 'issueController',
        replace: true
    }
});