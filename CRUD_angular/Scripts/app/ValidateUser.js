
angular
    .module('MyApp.ctrl.ValUser', [])
    .controller('ValUserController', [
        '$scope', function ($scope) {

            $scope.emplist = [];

            $scope.load;

            $scope.load = function () {

                $.ajax({
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Home/getList',
                    success: function (data) {
                        $scope.emplist = data
                        $scope.$apply();
                    }
                });
            }
          //  $scope.load();

            $scope.emp = {
                id: 'ashok',
                name: '',
                designation: '',
                mobile: ''
            }

            $scope.clear = function () {
                $scope.emp.id = '';
                $scope.emp.name = '';
                $scope.emp.designation = '';
                $scope.emp.mobile = '';
            };

            $scope.save = function () {
                console.log($scope.emp)
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify($scope.emp),
                    url: '/Home/save',
                    success: function (data, status) {
                        console.log(data)
                        $scope.clear();
                        $scope.load();
                    },
                    error: function (status) { }
                });
            };

            $scope.delete = function (data) {
                var state = confirm("Do you want to delete this record");
                if (state == true) {
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        //data: "{ id: "+data.id+" }",
                        data: JSON.stringify(data),
                        url: '/Home/delete',
                        success: function (status) {
                            console.log(status)
                            $scope.load();
                        },
                        error: function (status) { }
                    });
                }
            }

            $scope.edit = function (index) {
                $scope.emp.id = index.id;
                $scope.emp.name = index.name;
                $scope.emp.designation = index.designation;
                $scope.emp.mobile = index.mobile;
            };

            $scope.update = function () {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify($scope.emp),
                    url: '/Home/update',
                    success: function (data, status) {
                        console.log(data)
                        $scope.clear();
                        $scope.load();
                    },
                    error: function (status) { }
                });
            };
        }
    ]);