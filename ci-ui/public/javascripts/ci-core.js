(function () {
    var app = angular.module("ci-app", []);
    
    app.controller('feedCtrl', ['$http', function ($http) {
            var feeds = this;
            feeds.items = [];
            $http.get("http://localhost:3000/feeds/").success(function (data) {                
                feeds.items = data;
            });
        }]);

})();