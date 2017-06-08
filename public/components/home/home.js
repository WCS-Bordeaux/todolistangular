'use strict';

angular.module("todoList")
    .component("home", {
        templateUrl: "components/home/home.html",
        controller: Home
    })
function Home($scope, $http, $resource) {
    //$scope === this
    //this === $scope

    $scope.title = "coucou"
    $scope.todoList = [];

    //Nous récupérons notre base de donnée et nous la pushons sur notre tableau
    $resource("/todo").get().$promise.then(function (R) {
        for (var i = 0; i < R.todo.length; i++) {
            $scope.todoList.push(R.todo[i]);
        }
    })

    //On push dans notre bdd et on réaffiche notre tableau actualisé 
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
    //Quand le button delete est appuyer ça déclanche cet function , supprision dans la bdd et dans le tableau
    $scope.delete = function (index, id) {
        $http.delete("/todo/" + id)
        $scope.todoList.splice(index, 1);
    }
}