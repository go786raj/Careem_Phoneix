(function() {
    'use strict';

    angular.module('app')
        .service('tableService', [
            '$q',
            tableService
        ]);

    function tableService($q) {
        var tableData = [{
                year: '2007',
                label_pie: "One",
                value_pie: 29,

                label_bar: "A",
                value_bar: 50,

                x_bar: '56',
                y_bar: '23',

                issue: 'Nested views',
                progress: 100,
                status: 'Done',
                class: 'md-accent'
            },
            {
                year: '2008',
                label_pie: "One",
                value_pie: 2,

                label_bar: "B",
                value_bar: 50,

                x_bar: '56',
                y_bar: '23',

                issue: 'Table component',
                progress: 40,
                status: 'Feedback',
                class: ''
            },
            {
                year: '2009',
                label_pie: "two",
                value_pie: 9,

                label_bar: "C",
                value_bar: 10,
                x_bar: '56',
                y_bar: '23',

                issue: 'Dashboard tiles',
                progress: 100,
                status: 'Done',
                class: 'md-accent'
            },
            {
                year: '2006',

                label_pie: "three",
                value_pie: 7,

                label_bar: "D",
                value_bar: 30,

                x_bar: '56',
                y_bar: '23',

                issue: 'Panel widget',
                progress: 84,
                status: 'In progress',
                class: 'orange'
            },
            {
                year: '2005',
                label_pie: "four",
                value_pie: 7,

                label_bar: "E",
                value_bar: 20,

                x_bar: '56',
                y_bar: '23',

                issue: 'Form',
                progress: 100,
                status: 'Done',
                class: 'md-accent'
            },
            {
                year: '2004',
                label_pie: "five",
                value_pie: 21,

                label_bar: "F",
                value_bar: 10,

                x_bar: '56',
                y_bar: '23',

                issue: 'Custom CSS',
                progress: 20,
                status: 'Feedback',
                class: ''
            },
            {
                year: '2003',
                label_pie: "six",
                value_pie: 27,

                label_bar: "G",
                value_bar: 40,

                x_bar: '56',
                y_bar: '23',

                issue: 'Add backend',
                progress: 15,
                status: 'To do',
                class: 'md-warn'
            },
            {
                year: '2002',
                label_pie: "seven",
                value_pie: 59,

                label_bar: "F",
                value_bar: 30,

                x_bar: '56',
                y_bar: '23',

                issue: 'Layout with sidebar',
                progress: 100,
                status: 'Done',
                class: 'md-accent'
            }
        ];

        return {
            loadAllItems: function() {
                return $q.when(tableData);
            },
            loadDiscreateBarValue: function() {
                return tableData.map(function(dataBarDiscreate) {
                    return {
                        label: dataBarDiscreate.label_bar,
                        value: dataBarDiscreate.value_bar
                    };
                });
            }
        };
    }
})();