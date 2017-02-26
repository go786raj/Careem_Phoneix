(function() {



    angular
        .module('app')
        .controller('VendorController', [
            'sharedDataService', '$http', '$mdDialog',
            VendorController
        ]);

    function VendorController(sharedDataService, $http, $mdDialog) {
        var vm = this;


        $http.get("http://192.173.7.17:1337/vendors")
            .then(function(response) {

                console.log(response);

                vm.myWelcome = response.data;
            });


        function showAlert(data) {
            alert = $mdDialog.alert({
                title: 'Reloading done!',
                content: data,
                ok: 'Close'
            });
            $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
                });
        }


        function loadDta() {
            $http.get("http://192.173.7.17:1337/vendors")
                .then(function(response) {

                    console.log(response);

                    vm.myWelcome = response.data;
                    showAlert("loaded");
                });
        }




        vm.showPrompt = function(ev) {
            console.log("vm");

            var config = {
                headers: {
                    'Content-Type': '*'
                }
            }
            console.log(vm.vendor);
            var data = vm.vendor;
            // var data = {
            //     "vendorName": " sales4 ",
            //     "contract": "2 year",
            //     "Location": "india",
            //     "Domain": "Ecomerce"
            // };


            $http.post('http://192.173.7.17:1337/vendors/create', data, config)
                .success(function(data, status, headers, config) {
                    console.log(" command sucsees");
                    $http.get("http://192.173.7.17:1337/vendors")
                        .then(function(response) {

                            console.log(response);

                            vm.myWelcome = response.data;
                            showAlert("data Added");
                        });

                    return data;

                })
                .error(function(data, status, header, config) {
                    console.log(" command sucsees");
                    data = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                    return data
                });


            $http.get("http://192.173.7.17:1337/vendors")
                .then(function(response) {

                    console.log(response);

                    vm.myWelcome = response.data;

                });

            //    showAlert();



        };








        vm.removeVendor = function(taskId) {
            //alert("Task Id is " + taskId);
            var config = {
                headers: {
                    'Content-Type': '*'
                }
            }



            console.log(taskId);
            var url = "http://192.173.7.17:1337/vendors/destroy/" + taskId;
            console.log(url);
            var id = taskId;
            $http.post(url)
                .success(function(data, status, headers, config) {
                    console.log(" command sucsees");


                    $http.get("http://192.173.7.17:1337/vendors")
                        .then(function(response) {

                            console.log(response);

                            vm.myWelcome = response.data;
                        });
                    showAlert("data Deleted");
                    return data;
                })
                .error(function(data, status, header, config) {
                    console.log(" command sucsees");
                    data = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                    return data
                });

        };





    }

    //function end

})();