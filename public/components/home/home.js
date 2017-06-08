'use strict';

angular.module("todoList")
    .component("home", {
        templateUrl: "components/home/home.html",
        controller: Home
    })
function Home($scope, $http, $resource) {
    $scope.title = "coucou"
    $scope.todoList = [];
    $resource("/todo").get().$promise.then(function (R) {
        for (var i = 0; i < R.todo.length; i++) {
            $scope.todoList.push(R.todo[i]);
            console.log("hello")
        }
    })
    $scope.addTodo = function () {
        if ($scope.todo == "") {
            return false;
        }
        else {
            let data = {
                title: $scope.todo
            }
            $http.post("/todo", data)
            $scope.todoList = [];
            $resource("/todo").get().$promise.then(function (R) {
                for (var i = 0; i < R.todo.length; i++) {
                    $scope.todoList.push(R.todo[i]);

                }
            })
        }
        $scope.todo = "";
    }
    $scope.delete = function (index, id) {
        console.log(id)
        $http.delete("/todo/" + id)
        $scope.todoList.splice(index, 1);
    }
}