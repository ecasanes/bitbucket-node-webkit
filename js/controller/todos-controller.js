bitbucketAPIApp.controller("todosController", function ($scope, dataService) {

    console.log('todosController initialized');

    $scope.todos = dataService.getTodos(function (response) {
        console.log(response.data);
        $scope.todos = response.data;
    });

    $scope.learningNgChange = function(){
        console.log("An input changed");
    };

    $scope.helloConsole = dataService.helloConsole;


    $scope.addTodo = function(){
        var todo = {name:"This is a new todo"};
        $scope.todos.unshift(todo);
    };

    $scope.deleteTodo = function(todo, $index){
        dataService.deleteTodo(todo);
        $scope.todos.splice($index, 1);
    };

    $scope.saveTodo = function(todo){
        dataService.saveTodo(todo);
    };

    $scope.saveTodos = function(){
        var filteredTodos = $scope.todos.filter(function(todo){
            if(todo.edited){
                return todo;
            }
        });
        console.log('filteredTodos', filteredTodos);
        dataService.saveTodos(filteredTodos);
    };

});