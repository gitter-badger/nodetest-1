var app = angular.module("app");

app.controller("AuthCtrl", ["$scope", "$http", "$sessionStorage", function ($scope, $http, $sessionStorage) {
    var rootUrl = '/api/auth/';
    $scope.storage = $sessionStorage;

    $scope.username = "";
    $scope.password = "";

    $scope.$watch('cookies', function (val) {
        if (!val) return;
        $scope.cookieId = val.get('id');
        console.log($scope.cookieId);
    });

    $scope.login = function () {
        $http({
                method: 'POST',
                url: rootUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'username=' + $scope.username + '&password=' + $scope.password
            })
            .success(function (response) {
                var sessionId = response.id;
                $('#authModal').modal('toggle');
                $scope.storage.sessionId = sessionId;
                toastr.success('Hello ' + $scope.username, 'You were logged in successfully.');
            })
            .error(function (data, status) {
                console.log(data);
                $("#passwordLabel").empty();
                $("#usernameLabel").empty();
                status == 422 ? $("#passwordLabel").text(data.message) : $("#usernameLabel").text(data.message);
            });
    }

    $scope.logout = function () {
        if (confirm('Do you want to sign out?')) {
            $scope.storage.$reset();
        }
    }
}]);