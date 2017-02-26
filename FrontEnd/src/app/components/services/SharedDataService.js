(function() {
    'use strict';
    angular.module('app')
        .service('sharedDataService', ['dataService',
            '$q', '$http', '$log', '$rootScope',
            sharedDataService
        ]);

    function sharedDataService(dataService, $q, $http, $log, $rootScope) {

        /*var tempData = [];
           setData: function (key, data) {
                tempData[key] = data;
            },
            getData: function (key) {
                return tempData[key];
            },*/
        var tempData = {};
        var fullData = {};

        return {
            setData: function(data) {

                //    console.log("....F..." + fullData.data.length);
                tempData.data = data;
                //     console.log("..T....." + tempData.data.length);
                //     console.log("....F..." + fullData.data.length);
                // $scope.$broadcast("toggleAnimation", this.textToBroadcast);
                $rootScope.$emit("EmitingData", tempData);
            },
            getFullData: function() {
                return fullData;

            },
            async: function() {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = tempData;
                // Return the promise to the controller
                return promise;
            },
            getData: function() {
                return tempData;

            },

            loadVendor: function() {
                var deferred = $q.defer();
                // var a = $q.when(dataService.loadAllItemsFromCsv);
                // console.log("services a" + a);
                // this.setData(
                dataService.loadVendorData()
                    .then(function(data) {
                        fullData = data;

                        tempData = data;

                        //  deferred.resolve({ data: data });
                        //                        fullData = data;
                        //            console.log(data.data.length + "dataas");
                        deferred.resolve({ data: tempData });
                        //return tempData
                    });
                //);
                return deferred.promise;

                //  console.log("services" + a);
            },


            loadAll: function() {
                var deferred = $q.defer();
                // var a = $q.when(dataService.loadAllItemsFromCsv);
                // console.log("services a" + a);
                // this.setData(
                dataService.loadAllItemsFromCsv()
                    .then(function(data) {
                        fullData = data;

                        tempData = data;

                        //  deferred.resolve({ data: data });
                        //                        fullData = data;
                        //            console.log(data.data.length + "dataas");
                        deferred.resolve({ data: tempData });
                        //return tempData
                    });
                //);
                return deferred.promise;

                //  console.log("services" + a);
            },

            loadABinBevAll: function() {
                var deferred = $q.defer();
                dataService.loadABInBevItemsFromCsv()
                    .then(function(data) {
                        fullData = data;
                        tempData = data;
                        //         console.log(data.data.length + "dataas");
                        deferred.resolve({ data: tempData });
                    });
                return deferred.promise;
            },

            loadAllItemsFromCsv: function() {
                var deferred = $q.defer();


                function CSVToArray(strData, strDelimiter) {
                    //     console.log("inside csv to array");
                    // Check to see if the delimiter is defined. If not,
                    // then default to comma.
                    strDelimiter = (strDelimiter || ",");
                    // Create a regular expression to parse the CSV values.
                    var objPattern = new RegExp((
                        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
                    // Create an array to hold our data. Give the array
                    // a default empty first row.
                    var arrData = [
                        []
                    ];
                    // Create an array to hold our individual pattern
                    // matching groups.
                    var arrMatches = null;
                    // Keep looping over the regular expression matches
                    // until we can no longer find a match.
                    while (arrMatches = objPattern.exec(strData)) {
                        // Get the delimiter that was found.
                        var strMatchedDelimiter = arrMatches[1];
                        // Check to see if the given delimiter has a length
                        // (is not the start of string) and if it matches
                        // field delimiter. If id does not, then we know
                        // that this delimiter is a row delimiter.
                        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                            // Since we have reached a new row of data,
                            // add an empty row to our data array.
                            arrData.push([]);
                        }
                        // Now that we have our delimiter out of the way,
                        // let's check to see which kind of value we
                        // captured (quoted or unquoted).
                        if (arrMatches[2]) {
                            // We found a quoted value. When we capture
                            // this value, unescape any double quotes.
                            var strMatchedValue = arrMatches[2].replace(
                                new RegExp("\"\"", "g"), "\"");
                        } else {
                            // We found a non-quoted value.
                            var strMatchedValue = arrMatches[3];
                        }
                        // Now that we have our value string, let's add
                        // it to the data array.
                        arrData[arrData.length - 1].push(strMatchedValue);
                    }
                    // Return the parsed data.
                    return (arrData);
                }



                $http.get('app/components/jsonData/bacys.csv')
                    //  $http.get('app/components/jsonData/bacysOrignal.csv')
                    .success(function(data) {

                        //        console.log(data);

                        var array = CSVToArray(data);
                        var objArray = [];
                        for (var i = 1; i < array.length; i++) {
                            objArray[i - 1] = {};
                            for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                                var key = array[0][k];
                                objArray[i - 1][key] = array[i][k]
                            }
                        }

                        // var json = JSON.stringify(objArray)
                        var json = JSON.stringify(objArray);
                        var str = json.replace(/},/g, "},\r\n");
                        //  var data = str
                        var data = JSON.parse(str);
                        // console.log(data);
                        // return data;   
                        deferred.resolve({ data: data });
                    })
                    // .then(function(data) {
                    //     deferred.resolve({ data: data });
                    // })
                    .error(function(msg, code) {
                        deferred.reject(msg);
                        //$log.error(msg, code);
                    });
                //$log(deferred.promise);

                //        console.log(deferred.promise);

                return deferred.promise;
            }




        }
    }

})();