bitbucketAPIApp.controller("issueController", function ($scope, $http, $routeParams, $location, authentication, header) {

    $scope.issue = {
        title: '',
        metadata: {
            milestone: ''
        }
    };

    $scope.issues = [{}];
    $scope.users = [{}];

    $scope.currentUser = {
        display_name: authentication.displayName,
        username: authentication.username
    };

    $scope.issueStatus = [
        {
            name: 'All',
            value: null
        },
        {
            name: 'New',
            value: ['new']
        },
        {
            name: 'Open',
            value: ['new', 'open']
        },
        {
            name: 'Resolved',
            value: ['resolved']
        },
        {
            name: 'Onhold',
            value: ['on hold']
        }
    ];

    $scope.issueTypes = [
        {
            name: 'bug',
            value: 'bug'
        },
        {
            name: 'enhancement',
            value: 'enhancement'
        },
        {
            name: 'proposal',
            value: 'proposal'
        },
        {
            name: 'task',
            value: 'task'
        }
    ];

    $scope.simpleIssueSearchCriteria = [
        {
            name: 'Content',
            search_key: 'search',
            value: '',
            type: 'text'
        },
        {
            name: 'Title',
            search_key: 'title',
            value: '',
            type: 'text'
        },
        {
            name: 'Issue Type',
            search_key: 'kind',
            value: '',
            type: 'dropdown',
            choices: $scope.issueTypes
        },
        {
            name: 'Assignee',
            search_key: 'responsible',
            value: '',
            type: 'dropdown',
            choices: $scope.users
        },
        {
            name: 'Reporter',
            search_key: 'reported_by',
            value: '',
            type: 'dropdown',
            choices: $scope.users
        }
    ];

    $scope.currentIssueStatus = $scope.issueStatus[2];
    $scope.currentIssueSearchCriteria = $scope.simpleIssueSearchCriteria[0];
    $scope.currentIssueType = $scope.issueTypes[0];

    $scope.issuesDetail = {
        limit: 5,
        start: 5,
        count: 0,
        pages: 0,
        status: $scope.currentIssueStatus.value,
        currentPage: 1,
        search: '',
        kind: null,
        reported_by: null,
        responsible: null
    };

    $scope.loadingHeight = $scope.issuesDetail.limit * 22.5;
    $scope.notFirstPage = false;
    $scope.notLastPage = false;

    $scope.milestones = [];

    $scope.getMilestones = function(){
        $http({
            method: 'GET',
            url: 'https://bitbucket.org/api/1.0/repositories/' + authentication.team + '/' + authentication.repository + '/issues/milestones',
            /*params: {
             limit: 50
             },*/
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            var data = response;

            console.log(data);
            $scope.milestones = data.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
        });
    };

    $scope.updateMilestone = function(issue){
        $scope.issue.metadata.milestone = issue.metadata.milestone;
         $scope.updateIssue(issue);
    };

    $scope.changeIssueType = function (singleIssueType) {

        $scope.currentIssueType = singleIssueType;
        $scope.issuesDetail.kind = $scope.currentIssueType.value;

        $scope.regenerateAllIssues(0);
    };

    $scope.selectSimpleIssueCriteria = function (singleCriteria, retainResponsible) {

        var retainResponsible = retainResponsible || false;
        var responsible = null;

        if(retainResponsible){
            responsible = $scope.issuesDetail.responsible;
        }

        $scope.currentIssueSearchCriteria = singleCriteria;

        var $search_criteria = $('#simple-search-criteria');

        switch ($scope.currentIssueSearchCriteria.search_key) {
            case 'responsible':
                $search_criteria.find('.search-name').removeClass('hidden');
                $search_criteria.find('.search-text').removeClass('hidden');
                $search_criteria.find('.search-issue-type').addClass('hidden');
                $scope.issuesDetail.kind = null;
                $scope.issuesDetail.reported_by = null;
                $scope.changeUser($scope.currentUser);
                break;
            case 'reported_by':
                $search_criteria.find('.search-name').removeClass('hidden');
                $search_criteria.find('.search-text').removeClass('hidden');
                $search_criteria.find('.search-issue-type').addClass('hidden');
                $scope.issuesDetail.kind = null;
                $scope.issuesDetail.responsible = responsible;
                $scope.changeUser($scope.currentUser);
                break;
            case 'kind':
                $search_criteria.find('.search-name').addClass('hidden');
                $search_criteria.find('.search-text').removeClass('hidden');
                $search_criteria.find('.search-issue-type').removeClass('hidden');
                $scope.currentIssueType = $scope.issueTypes[0];
                $scope.issuesDetail.responsible = responsible;
                $scope.issuesDetail.reported_by = null;
                $scope.changeIssueType($scope.currentIssueType);
                break;
            default:
                $search_criteria.find('.search-name').addClass('hidden');
                $search_criteria.find('.search-text').removeClass('hidden');
                $search_criteria.find('.search-issue-type').addClass('hidden');
                $scope.issuesDetail.kind = null;
                $scope.issuesDetail.responsible = responsible;
                $scope.issuesDetail.reported_by = null;
                $scope.regenerateAllIssues(0);
                break;
        }

        if ($scope.currentIssueSearchCriteria.type == 'text') {

        } else {

        }
    };

    $scope.changeCurrentIssueStatus = function (singleStatus) {

        $scope.issuesDetail.status = singleStatus.value;
        $scope.currentIssueStatus = singleStatus;
        $scope.regenerateAllIssues(0);

        console.log($scope.currentIssueStatus);
    };

    $scope.getSingleIssue = function () {

        $http({
            method: 'GET',
            url: 'https://bitbucket.org/api/1.0/repositories/' + authentication.team + '/' + authentication.repository + '/issues/' + $routeParams.issue_id,
            /*params: {
             limit: 50
             },*/
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            var data = response;

            console.log(data);
            $scope.issue = data.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
        });
    };

    $scope.updateIssue = function (issue) {

        $http({
            method: 'PUT',
            url: 'https://bitbucket.org/api/1.0/repositories/' + authentication.team + '/' + authentication.repository + '/issues/' + issue.local_id,
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            },
            data: {
                title: issue.title,
                milestone: issue.metadata.milestone
            }
        }).then(function successCallback(response) {

            console.log(response);

        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.getAllIssues = function () {

        console.log('get all issues');

        $('.loading').removeClass('hidden');
        $('#issues-table').addClass('hidden');

        $http({
            method: 'GET',
            url: 'https://bitbucket.org/api/1.0/repositories/' + authentication.team + '/' + authentication.repository + '/issues',
            params: {
                limit: $scope.issuesDetail.limit,
                start: $scope.issuesDetail.start,
                status: $scope.issuesDetail.status,
                search: $scope.issuesDetail.search,
                kind: $scope.issuesDetail.kind,
                reported_by: $scope.issuesDetail.reported_by,
                responsible: $scope.issuesDetail.responsible
            },
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            var data = response;

            console.log(data);


            $scope.issues = data.data.issues;

            $scope.issuesDetail.count = data.data.count;
            $scope.issuesDetail.pages = Math.ceil($scope.issuesDetail.count / $scope.issuesDetail.limit);

            console.log($scope.issuesDetail);
            //$scope.issues = response.data.issues;

            setTimeout(function () {
                $('.loading').addClass('hidden');
                $('#issues-table').removeClass('hidden');
            }, 100);


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
        });
    };

    $scope.getAllUsers = function () {

        console.log('get all users');

        $http({
            method: 'GET',
            url: 'https://bitbucket.org/api/2.0/teams/' + authentication.team + '/members',
            headers: {
                "Authorization": "Basic " + btoa(authentication.username + ":" + authentication.password)
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            var data = response;

            console.log(data);

            $scope.users = data.data.values;


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
        });
    };

    $scope.changeUser = function (singleUser) {

        $scope.currentUser = singleUser;

        switch ($scope.currentIssueSearchCriteria.search_key) {
            case 'reported_by':
                $scope.issuesDetail.reported_by = $scope.currentUser.username;
                $scope.issuesDetail.responsible = null;
                break;
            case 'responsible':
                $scope.issuesDetail.responsible = $scope.currentUser.username;
                $scope.issuesDetail.reported_by = null;
                break;
            default:
                $scope.issuesDetail.responsible = null;
                $scope.issuesDetail.reported_by = null;
                break;

        }

        $scope.regenerateAllIssues(0);
    };

    $scope.editIssue = function (singleIssue) {

        alert('test');

        //var index = $scope.issues.indexOf(singleIssue);


        console.log(index);
    };

    $scope.getRange = function (num) {
        return new Array(num);
    };

    $scope.changeOffset = function (pageNumber) {
        $scope.issuesDetail.start = pageNumber * $scope.issuesDetail.limit;
    };

    $scope.getMyIssues = function () {

        $scope.issuesDetail.responsible = authentication.username;
        $scope.regenerateAllIssues(0);
    };

    $scope.regenerateAllIssues = function (pageNumber) {

        $scope.issuesDetail.currentPage = pageNumber + 1;

        if ($scope.issuesDetail.currentPage == 1) {
            $scope.notLastPage = true;
            $scope.notFirstPage = false;
        } else if ($scope.issuesDetail.currentPage == $scope.issuesDetail.pages) {
            $scope.notLastPage = false;
            $scope.notFirstPage = true;
        } else {
            $scope.notLastPage = true;
            $scope.notFirstPage = true;
        }

        $scope.changeOffset(pageNumber);
        $scope.getAllIssues();
    };

    $scope.searchAllIssues = function () {

        $scope.regenerateAllIssues(0);
        console.log($scope.issuesDetail.search);
    };

    $scope.isPageActive = function (pageNumber) {

        if (pageNumber + 1 == $scope.issuesDetail.currentPage) {
            return 'active';
        } else {
            return '';
        }
    };


    // initialize
    authentication.isLoggedIn();

    switch ($location.path()) {
        case "/issues":
            $scope.regenerateAllIssues(0);
            $scope.getAllUsers();
            break;
        case "/my-issues":
            $scope.issuesDetail.responsible = authentication.username;
            $scope.simpleIssueSearchCriteria.splice(3,1);
            $scope.regenerateAllIssues(0);
            $scope.getAllUsers();
            break;
        case "/edit-issue/" + $routeParams.issue_id:
            $scope.getSingleIssue();
            break;
    }

    $scope.getMilestones();

    header.getMyIssues = $scope.getMyIssues;


});