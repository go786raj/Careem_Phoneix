(function() {

    angular
        .module('app')
        .controller('MainController', [
            'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast', 'sharedDataService',
            MainController
        ]);

    function MainController(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, sharedDataService) {
        var vm = this;

        vm.menuItems = [];
        vm.selectItem = selectItem;
        vm.toggleItemsList = toggleItemsList;
        vm.showActions = showActions;
        vm.title = $state.current.data.title;
        vm.showSimpleToast = showSimpleToast;
        vm.toggleRightSidebar = toggleRightSidebar;

        navService
            .loadAllItems()
            .then(function(menuItems) {
                vm.menuItems = [].concat(menuItems);
            });

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }

        function selectItem(item) {
            vm.title = item.name;
            vm.toggleItemsList();
            vm.showSimpleToast(vm.title);
        }



        function showActions($event) {
            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: 'app/views/partials/bottomSheet.html',
                controller: ['$mdBottomSheet', SheetController],
                controllerAs: "vm",
                bindToController: true,
                targetEvent: $event
            }).then(function(clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            function SheetController($mdBottomSheet) {
                var vm = this;

                vm.actions = [
                    { name: 'Share', icon: 'share', url: 'https://twitter.com/vimalkovath' },
                    { name: 'Star', icon: 'star', url: 'https://github.com/vimalkovath' }
                ];

                vm.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                .content(title)
                .hideDelay(2000)
                .position('bottom right')
            );
        }


        //setting data
        // sharedDataService.loadAll();

    }

})();