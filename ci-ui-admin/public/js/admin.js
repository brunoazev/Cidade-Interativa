(function () {
    var app = angular.module('admin', []);
    
    var itens = [
                {
                    name: 'Cidades',
                    url: ''
                },
                {
                     name: 'Usuarios',
                     url: ''
                 }
            ]
      

    app.controller('MenuController',function(){
        this.itens = itens;
    })
    

})();


