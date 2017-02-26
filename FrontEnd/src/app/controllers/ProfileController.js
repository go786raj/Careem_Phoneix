(function() {

    angular
        .module('app')
        .controller('ProfileController', ['$http',
            ProfileController
        ]);

    function ProfileController($http) {
        var vm = this;


        $http.get("http://192.173.7.17:1337/shipment")
            .then(function(response) {

                console.log("profile" + response);

                vm.myWelcome = response.data;

            });



    }

})();