bitbucketAPIApp.config(function ($routeProvider) {
    $routeProvider
        .when('/issues', {
            templateUrl: 'tmpl/issues.html',
            controller: 'issueController'
        })

        .when('/my-issues', {
            templateUrl: 'tmpl/myIssues.html',
            controller: 'issueController'
        })

        .when('/my-todos', {
            templateUrl: 'tmpl/myIssues.html',
            controller: 'issueController'
        })

        .when('/edit-issue/:issue_id', {
            templateUrl: 'tmpl/editIssue.html',
            controller: 'issueController'
        })

        .when('/login', {
            templateUrl: 'tmpl/login.html',
            controller: 'loginController'
        })

        .otherwise({
            redirectTo: '/login'
        });

});