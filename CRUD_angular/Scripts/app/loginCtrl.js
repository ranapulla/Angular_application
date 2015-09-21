
angular
    .module('MyApp.ctrl.crud', [])
    .controller('loginController', [
         '$scope', function ($scope) {



             function setCookie(cname, cvalue, exhours) {
                 var d = new Date();
                 d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
                 var expires = "expires=" + d.toUTCString();
                 document.cookie = cname + "=" + cvalue + "; " + expires;
             }

             function getCookie(cname) {
                 var name = cname + "=";
                 var ca = document.cookie.split(';');
                 for (var i = 0; i < ca.length; i++) {
                     var c = ca[i];
                     while (c.charAt(0) == ' ') c = c.substring(1);
                     if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                 }
                 return "";
             }
             var CUsername = getCookie("UserName");
             var CUserPwd = getCookie("Userpassword");

             $scope.User = {
                 UserName: CUsername,
                 Password: CUserPwd,
                 Email: '',
                 RemPass: ''
             }


             $scope.validate = function () {
                 if ($scope.User.UserName == '') {
                     alert("Please Enter Name");
                     return;
                 } else if ($scope.User.Password == '') {
                     alert("Please Enter Password");
                     return;
                 }

                

                 $.ajax({
                     type: 'POST',
                     contentType: 'application/json; charset=utf-8',
                     data: JSON.stringify($scope.User),
                     url: '/Home/ValidateUser',
                     success: function (data, status) {
                         if (data == "Fail") {
                             
                             alert("you have Entered wrong User Name or Password");
                         }
                         else {
                            
                             if ($scope.User.RemPass) {
                                 setCookie("UserName", $scope.User.UserName, 72)
                                 setCookie("Userpassword", $scope.User.Password, 72)
                             }
                             window.location = '/Home/dashboard';
                         }
                     },
                     error: function (status) { }
                 });
             };
         }
    ])

.controller('SignUpController', [
        '$scope', function ($scope) {

            $scope.User = {
                UserName: '',
                Password: '',
                Email: ''
            }

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

        }
])

;