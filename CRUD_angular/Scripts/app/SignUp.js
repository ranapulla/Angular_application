
angular
    .module('SignUp', [])
    .controller('SignUpController', [
        '$scope',
        function ($scope) {

            $scope.User = {
                UserName: '',
                Password: '',
                Email: ''
            }


            $scope.clear = function () {
                $scope.User.UserName = '';
                $scope.User.Password = '';
                $scope.User.Email = '';
            };

            $scope.save = function () {
              
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify($scope.User),
                        url: '/Home/save',
                        success: function (data, status) {
                            $scope.clear();
                            
                            if (data == "EXIST") {
                                alert('Already record exist');
                                return false;
                            } else if (data == "NOEMAIL") {
                                alert('successfully registered and issue in email send');
                            } else if (data == "WITHEMAIL") {
                                alert('successfully registered and activation link sent to your email');
                            } else if (data == "REQURID") {
                                alert('Fill all fileds and try again.');
                                return false;
                            } else if (data == "NOTINSERT") {
                                alert('your record not inserted. Try again');
                                return false;
                            }
                            window.location = '/Home/CRUD';
                        },
                        error: function (status) {
                            alert("Try Again.")
                        }
                    });
                };
            }
    ]);