

angular
    .module('MyApp', [
    'ngRoute',
    'MyApp.ctrl.crud',
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: '/Home/CRUD',
            controller: 'loginController'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }]);