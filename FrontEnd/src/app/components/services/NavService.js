(function() {
    'use strict';

    angular.module('app')
        .service('navService', [
            '$q',
            navService
        ]);

    function navService($q) {
        var menuItems = [{
                name: 'Dashboard',
                icon: 'dashboard',
                sref: '.dashboard'
            },
            {
                name: 'Shipments',
                icon: 'local_shipping',
                sref: '.profile'
            },
            {
                name: 'vendors',
                icon: 'people',
                sref: '.vendor'
            },
            {
                name: 'E_Delivery',
                icon: 'add_shopping_cart',
                sref: '.table'
            }
            // ,
            // {
            //     name: 'Table',
            //     icon: 'view_module',
            //     sref: '.table'
            // }

        ];

        return {
            loadAllItems: function() {
                return $q.when(menuItems);
            }
        };
    }

})();