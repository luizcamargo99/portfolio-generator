angular.module('app').controller('GeneratorController', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {

    $scope.Initialize = function() {
        $scope.Loading = false;
        $scope.CurrentYear = new Date().getUTCFullYear();
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
            return $scope.GetUser();            
        }        
        
        $scope.Loading = false;  
    }

    $scope.GetUser = function () {
        $scope.RequestHttp(url.profileGithub.replace('[USERNAME]', $scope.Username)).then(function (userResult) {
            if (userResult.status == apiStatus.success) {
                $scope.Profile = userResult.data;
                if ($scope.IsEmpty($scope.Profile.name) && $scope.Profile.followers == 0){
                    $scope.Loading = false;  
                    return alert('Usuário não encontrado!');
                }
                $rootScope.page.setTitle($scope.Profile.name);
                $scope.Profile.name_title = $scope.Profile.name.toLowerCase().replace(/\s/g, '');  
                $scope.GetRepositories();              
            }       
        });  
    }

    $scope.GetRepositories = function () {
        $scope.RequestHttp($scope.Profile.repos_url).then(function (reposResult) {
            if (reposResult.status == apiStatus.success) {
                let repositoriesOrder =  reposResult.data.sort(function(a,b){
                    return new Date(b.updated_at) - new Date(a.updated_at);
                  });
                $scope.Profile.Repositories = repositoriesOrder.slice(0, 6);
                $scope.GetReposLanguages();
            }                                      
        });
    }

    $scope.GetReposLanguages = function () {
        for (let index = 0; index < $scope.Profile.Repositories.length; index++) {
            const repo = $scope.Profile.Repositories[index];
            $scope.RequestHttp(repo.languages_url).then(function (langResult) {
                if (langResult.status == apiStatus.success) {
                    repo.Languages =  Object.keys(langResult.data);
                }  
                $scope.PortfolioFinalized = true;                                        
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

    $scope.OpenUrlNewTab = function (url) {
        window.open(url, '_blank').focus();
    }

    $scope.Initialize();
  }]);