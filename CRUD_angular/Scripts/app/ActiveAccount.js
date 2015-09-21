angular
    .module('SignUp', [])
    .controller('ActiveController', [
        '$scope',
        function ($scope) {

            $scope.User = {
                UserId: '3'
            }


            $scope.Update = function () {
                console.log($scope.User)
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify($scope.User),
                    url: '/Home/Update',
                    success: function (data, status) {
                        $scope.clear();
                        alert("successfully registered.")
                    },
                    error: function (status) {
                        alert("Try Again.")
                    }
                });
            };
        }
    ]);