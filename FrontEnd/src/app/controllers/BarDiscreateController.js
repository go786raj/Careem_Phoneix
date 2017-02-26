(function() {
    angular
        .module('app')
        .controller('BarDiscreateController', ['sharedDataService', 'filterFilter',
            'tableService', '$rootScope', '$scope',
            BarDiscreateController
        ]);

    function BarDiscreateController(sharedDataService, filterFilter, tableService, $rootScope, $scope) {
        var vm = this;
        //  var Tenure_Range_less_10, Tenure_Range_less_10_15, Tenure_Range_less_15_20, Tenure_Range_less_20_25, Tenure_Range_Above25;
        var HE_BEER, CORE, HE_NEAR_BEER, VALUE, NON_ALC = "";
        //Each bar represents a single discrete quantity.
        vm.discreateBarData = [{
            key: "Spend by Tendur in Months",
            values: [{
                    "label": "HE BEER",
                    "value": 0
                },
                {
                    "label": "CORE",
                    "value": 0
                },
                {
                    "label": "HE NEAR BEER",
                    "value": 0
                },
                {
                    "label": "VALUE",
                    "value": 0
                },
                {
                    "label": "NON ALC",
                    "value": 0
                }
            ]
        }];

        $scope.discreateBarMasterData = [{
            key: "Spend by Tendur in Months",
            values: [{
                    "label": "HE BEER",
                    "value": 0
                },
                {
                    "label": "CORE",
                    "value": 0
                },
                {
                    "label": "HE NEAR BEER",
                    "value": 0
                },
                {
                    "label": "VALUE",
                    "value": 0
                },
                {
                    "label": "NON ALC",
                    "value": 0
                }
            ]
        }];
        //reset data
        $scope.reset = function() {
            vm.discreateBarData = angular.copy($scope.discreateBarMasterData);
        };
        //  console.log("data discreate" + vm.discreateBarData[0].values[0].value);

        $scope.chartData = "";
        /***  getting data from server/csv and manipulate with chart */
        //   vm.getChartData = function() {
        sharedDataService.loadABinBevAll()
            .then(function(chartData) {
                vm.chartData = chartData.data;
                //      console.log(" vkv ++++++++++" + chartData.data.data)
                var data = chartData.data.data;

                vm.calculate = function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var AB_Segment_Value = data[i].AB_Segment_Value;

                        if (AB_Segment_Value == "HE BEER") {
                            vm.discreateBarData[0].values[0].value = vm.discreateBarData[0].values[0].value + 1;
                        } //don't forget to add the base 
                        else if (AB_Segment_Value == "CORE") {
                            vm.discreateBarData[0].values[1].value = vm.discreateBarData[0].values[1].value + 1;
                        } else if (AB_Segment_Value == "HE NEAR BEER") {
                            vm.discreateBarData[0].values[2].value = vm.discreateBarData[0].values[2].value + 1;
                        } else if (AB_Segment_Value == "VALUE") {
                            vm.discreateBarData[0].values[3].value = vm.discreateBarData[0].values[3].value + 1;
                        } //don't forget to add the base 
                        else if (AB_Segment_Value == "NON ALC") {
                            vm.discreateBarData[0].values[4].value = vm.discreateBarData[0].values[4].value + 1;
                        }
                    }
                }
                vm.calculate(data);

                HE_BEER = filterFilter(data, { 'AB_Segment_Value': 'HE BEER' });
                CORE = filterFilter(data, { 'AB_Segment_Value': 'CORE' });
                HE_NEAR_BEER = filterFilter(data, { 'AB_Segment_Value': 'HE NEAR BEER ' });
                VALUE = filterFilter(data, { 'AB_Segment_Value': 'VALUE' });
                NON_ALC = filterFilter(data, { 'AB_Segment_Value': 'NON ALC' });

            });
        //   };

        //   vm.barDiscreateServiceReturn = tableService.loadDiscreateBarValue();
        var discreateBarData = [];
        //  discreateBarData.push({ key: "vimal", values: vm.barDiscreateServiceReturn });

        //  vm.discreateBarData = discreateBarData;
        //console.log(vm.discreateBarData);

        $scope.getTotalTodos = function() {
            //        console.log(vm.data + "$scope.chartData.length" + $scope.chartData.length);
            //            vm.data = $scope.chartData;
            //vm.calculate($scope.chartData);
            return $scope.chartData;
        };
        var deregister = $rootScope.$on(
            "EmitingData",
            // "EmitingDataDontWork",
            function() {

                $scope.chartData = sharedDataService.getData().data;
                // console.log("inside emit    " + $scope.chartData);
                //console.log(chartData.data + "Responding to event %s.", chartData);
                vm.data = "";
                //    vm.data = datas;
                $scope.reset = function() {
                    vm.discreateBarData = angular.copy($scope.discreateBarMasterData);
                };
                $scope.reset();
                // $scope.$watch(function() { chartData }, function(newValue, oldValue) {
                //     $scope.data = chartData;
                //     console.log("vimal" + newValue);
                //     //  vm.data = newValue;
                // });

                $scope.getTotalTodos();

                vm.calculate = function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var AB_Segment_Value = data[i].AB_Segment_Value;

                        if (AB_Segment_Value == "HE BEER") {
                            vm.discreateBarData[0].values[0].value = vm.discreateBarData[0].values[0].value + 1;
                        } //don't forget to add the base 
                        else if (AB_Segment_Value == "CORE") {
                            vm.discreateBarData[0].values[1].value = vm.discreateBarData[0].values[1].value + 1;
                        } else if (AB_Segment_Value == "HE NEAR BEER") {
                            vm.discreateBarData[0].values[2].value = vm.discreateBarData[0].values[2].value + 1;
                        } else if (AB_Segment_Value == "VALUE") {
                            vm.discreateBarData[0].values[3].value = vm.discreateBarData[0].values[3].value + 1;
                        } //don't forget to add the base 
                        else if (AB_Segment_Value == "NON ALC") {
                            vm.discreateBarData[0].values[4].value = vm.discreateBarData[0].values[4].value + 1;
                        }
                    }
                    $scope.$apply();
                }

                vm.calculate($scope.chartData);
                var data = $scope.chartData;
                HE_BEER = filterFilter(data, { 'AB_Segment_Value': 'HE BEER' });
                CORE = filterFilter(data, { 'AB_Segment_Value': 'CORE' });
                HE_NEAR_BEER = filterFilter(data, { 'AB_Segment_Value': 'HE NEAR BEER' });
                VALUE = filterFilter(data, { 'AB_Segment_Value': 'VALUE' });
                NON_ALC = filterFilter(data, { 'AB_Segment_Value': 'NON ALC' });
                $scope.$apply();
                //$rootScope.$digest();

            }
        );


        // TODO: move data to the service krispo

        vm.options = {
            chart: {
                type: 'discreteBarChart',
                height: 350,
                x: function(d) { return d.label; },
                y: function(d) { return d.value; },
                showValues: true,
                valueFormat: function(d) { return d3.format(',.4f')(d); },
                dispatch: {
                    tooltipShow: function(e) { console.log('! tooltip SHOW !') },
                    tooltipHide: function(e) { console.log('! tooltip HIDE !') },
                    beforeUpdate: function(e) { console.log('! before UPDATE !') }
                },
                discretebar: {

                    dispatch: {
                        elementClick: function(e) {
                            var e = e;
                            console.log("! element Click !" + e); //e.data.label e.data.value
                            var _clickedElement = e.data.label;
                            if (_clickedElement == 'HE BEER') { sharedDataService.setData(HE_BEER) } else if (_clickedElement == 'CORE') { sharedDataService.setData(CORE) } else if (_clickedElement == 'HE NEAR BEER') { sharedDataService.setData(HE_NEAR_BEER) } else if (_clickedElement == 'VALUE') { sharedDataService.setData(VALUE) } else if (_clickedElement == 'NON ALC') { sharedDataService.setData(NON_ALC) } else {
                                console.log("error" + e);
                            }

                        },
                        elementDblClick: function(e) { console.log("! element Double Click !") }
                    }
                },
                callback: function(e) { console.log('! callback !') }
            }

        };


    }
})();