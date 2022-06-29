var app = angular.module('app', []);

app.run(['$rootScope', function($rootScope) {
  $rootScope.page = {
      setTitle: function(title) {
          this.title = title + ' | Portfolio';
      }
  }
}]);
