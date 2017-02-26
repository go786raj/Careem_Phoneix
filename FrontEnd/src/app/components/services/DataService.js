(function() {
    'use strict';
    angular.module('app')
        .service('dataService', [
            '$q', '$http', '$log',
            dataService
        ]);

    function dataService($q, $http, $log) {


        return {

            loadVendorData: function() {
                var deferred = $q.defer();
                $http.get('http://localhost:1337/vendors')
                    .success(function(data) {

                        // split content based on new line

                        console.log("data data" + data);
                    })

                .error(function(msg, code) {
                    deferred.reject(msg);

                });


                console.log(deferred.promise);

                return deferred.promise;
            },

            loadAllItems: function() {
                var deferred = $q.defer();
                $http.get('app/components/jsonData/bacys.csv')
                    .success(function(data) {

                        // split content based on new line
                        var allTextLines = data.split(/\r\n|\n/);
                        console.log(allTextLines);
                        var headers = allTextLines[0].split(',');

                        var lines = [];
                        for (var i = 0; i < allTextLines.length; i++) {
                            // split content based on comma
                            var data = allTextLines[i].split(',');
                            if (data.length == headers.length) {
                                var tarr = [];
                                for (var j = 0; j < headers.length; j++) {
                                    tarr.push(data[j]);
                                }
                                lines.push(tarr);
                            }

                            //       console.log("Data : " + data);
                        }

                        data = lines;
                        //    console.log("Data : " + data);

                    })
                    // .then(function(data) {
                    //     deferred.resolve({ data: data });
                    // })
                    .error(function(msg, code) {
                        deferred.reject(msg);
                        //$log.error(msg, code);
                    });
                //$log(deferred.promise);

                console.log(deferred.promise);

                return deferred.promise;
            },

            CSV2JSON: function(csv) {
                var array = CSVToArray(csv);
                var objArray = [];
                for (var i = 1; i < array.length; i++) {
                    objArray[i - 1] = {};
                    for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                        var key = array[0][k];
                        objArray[i - 1][key] = array[i][k]
                    }
                }

                var json = JSON.stringify(objArray);
                var str = json.replace(/},/g, "},\r\n");

                return str;
            },

            processData: function(allText) {
                // split content based on new line
                var allTextLines = allText.split(/\r\n|\n/);
                var headers = allTextLines[0].split(',');
                var lines = [];

                for (var i = 0; i < allTextLines.length; i++) {
                    // split content based on comma
                    var data = allTextLines[i].split(',');
                    if (data.length == headers.length) {
                        var tarr = [];
                        for (var j = 0; j < headers.length; j++) {
                            tarr.push(data[j]);
                        }
                        lines.push(tarr);
                    }
                }
                data = lines;
            },


            CSVToArray: function(strData, strDelimiter) {
                console.log("inside csv to array");
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
                    // $http.get('app/components/jsonData/bacysOrignal.csv')
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
                        //            console.log(data);
                        //return data;
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
            },


            loadABInBevItemsFromCsv: function() {
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



                // $http.get('app/components/jsonData/bacys.csv')
                $http.get('app/components/jsonData/GAC_Hackathon_Sales_Data.csv')
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
                        //            console.log(data);
                        //return data;
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


    //GAC_Hackathon_Sales_Data

})();