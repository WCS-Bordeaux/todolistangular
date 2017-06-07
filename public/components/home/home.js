'use strict';

angular.module("todoList")
    .component("home", {
        templateUrl: "components/home/home.html",
        controller: Home
    })
function Home($scope) {
    $scope.title = "coucou"
    $scope.todoList = [];
    $scope.addTodo = function (){
        $scope.todoList.push($scope.todo)
    }
    $scope.delete = function(index){
        $scope.todoList.splice(index, 1);
    }
}