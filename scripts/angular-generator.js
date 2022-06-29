angular.module('app').controller('GeneratorController', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {

    $scope.Initialize = function() {
        $scope.Loading = false;
        $scope.PortfolioFinalized = false;
        $scope.Profile = {};
        $rootScope.page.setTitle('Início');
    }

    $scope.GeneratePortfolio = function() {
        if ($scope.Loading) {
            return;
        }
        $scope.Loading = true;   

        if ($scope.IsEmpty($scope.Username) == false) {
            $scope.RequestHttp(url.profileGithub.replace('[USERNAME]', $scope.Username)).then(function (result) {
                $scope.PortfolioFinalized = true;
                $scope.Loading = false;    
                console.log(result);
            });  
        }          
    }

    $scope.RequestHttp = function(url) {
        return $http({
            method: 'GET',
            url: url
        });
    }

    $scope.IsEmpty = function (value) {
        return value == null || value == "";
    }

    $scope.Initialize();
  }]);