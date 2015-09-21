
angular
    .module('Index', [])
    .controller('IndexController', [
        '$scope', function ($scope) {

            $scope.User = {
                UserName: '',
                Password: '',
                Email: ''
            }

            $scope.BackLogin = function () {
                $.ajax({
                    type: 'POST',
                    datatype: "json",
                    data: JSON.stringify($scope.User),
                    url: '/Home/LogOut',
                    success: function (data, status) {
                        alert(data);
                        window.location = '/Home/CRUD';
                    },
                    error: function (status) { }
                });
            };
        }
    ]);