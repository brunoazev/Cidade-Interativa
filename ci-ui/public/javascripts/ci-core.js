(function () {
    var app = angular.module("ci-app", []);
    
    //ALLOW CROSS DOMAIN CALL
    // =============================================================================
    
    app.config(function ($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
    });
    
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
                this.feed.date = new Date();

                user.feeds.push(this.feed);
                
                $http({
                    url: 'http://localhost:3000/feeds/',
                    method: "POST",
                    data: JSON.stringify(this.feed),
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data, status, headers, config) {
                    console.log("ook");
                }).error(function (data, status, headers, config) {
                    console.log(status + ' ' + headers);
                });

                this.feed = {};
            }
        }]);

})();