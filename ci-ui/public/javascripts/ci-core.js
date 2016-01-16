(function () {
    var app = angular.module("ci-app", []);
       
    // =============================================================================

    app.controller('userCtrl', ['$http', function ($http) {
            var user = this;
            user.nome = "Robson Fernando da Veiga";
            user.feeds = {};
            
            $http.get("http://localhost:3000/feeds/").success(function (data) {
                user.feeds = data;
            });       
                           
          
        }]);


    app.controller('FeedCtrl', ['$http', function ($http) {
            this.feed = {};                     

            this.save = function (user) {
                this.feed.liked = 0;
                this.feed.shared = 0;
                this.feed.public = true;
                this.feed.date = new Date();

                user.feeds.push(this.feed);                               

                $http({
                    url: 'http://localhost:3000/feeds/',
                    method: "POST",
                    data: JSON.stringify(this.feed),
                    transformRequest: false,
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data, status, headers, config) {
                    console.log("ook");
                }).error(function (data, status, headers, config) {
                    
                });

                this.feed = {};
            }
        }]);

})();