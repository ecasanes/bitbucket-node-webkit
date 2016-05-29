bitbucketAPIApp.config(function ($routeProvider) {
    $routeProvider
        .when('/issues', {
            templateUrl: 'tmpl/issues.html',
            controller: 'issueController'
        })

        .when('/open-issues', {
            templateUrl: 'tmpl/issues.html',
            controller: 'issueController'
        })

        .when('/my-issues', {
            templateUrl: 'tmpl/issues.html',
            controller: 'issueController'
        })

        .when('/my-todos', {
            templateUrl: 'tmpl/myTodos.html',
            controller: 'todosController'
        })

        .when('/edit-issue/:issue_id', {
            templateUrl: 'tmpl/editIssue.html',
            controller: 'issueController'
        })

        .when('/login', {
            templateUrl: 'tmpl/login.html',
            controller: 'loginController'
        })

        .when('/settings', {
            templateUrl: 'tmpl/settings.html',
            controller: 'settingsController'
        })

        .otherwise({
            redirectTo: '/login'
        });

});