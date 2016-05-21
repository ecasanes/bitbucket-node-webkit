bitbucketAPIApp.directive('todos', function(){
    return {
        templateUrl: "tmpl/directive/todos.html",
        restrict: "E",
        controller: 'todosController',
        replace: true
    }
});