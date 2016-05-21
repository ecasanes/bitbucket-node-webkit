bitbucketAPIApp.service('dataService', function ($http) {

    this.helloConsole = function () {
        console.log('This is hello console...');
    };

    this.getTodos = function(callback){
        $http.get('mock/todo.json')
            .then(callback);
    };

    this.deleteTodo = function(todo){
        console.log("The " + todo.name + " has been deleted!");
    };

    this.saveTodo = function(todo){
        console.log("The " + todo.name + " has been saved!");
    };

    this.saveTodos = function(todos){
        console.log(todos);
        console.log(todos.length + " todos has been saved!");
    };

});