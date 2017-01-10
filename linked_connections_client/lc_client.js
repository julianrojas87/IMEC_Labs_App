var Client = require('lc-client');

var planner = new Client({ "entrypoints": ["http://server02.openknowledge.be:8082/connections"] });
var limit_date = new Date('1970-01-31T00:40');
var tomorrow = null;

module.exports.findPath = function (origin, destiny, time, callback) {
    console.log('Init path search...');

    //Setting search limit for 24 hours tops
    tomorrow = new Date(time);
    tomorrow.setDate(tomorrow.getDate() + 1);

    planner.query({"arrivalStop" : destiny, "departureStop" : origin, "departureTime": time}, function (resultStream, source) {
        resultStream.on('result', function (path) {
            //Path found
            callback(path);
        });

        //you can also count the number of HTTP requests done by the interface as follows
        source.on('request', function (url) {
            console.log('Requesting', url);
        });

        //you can also catch when a response is generated HTTP requests done by the interface as follows
        source.on('response', function (url) {
            //Search process stop conditions
            var date = new Date(getParameterByName('departureTime', url));

            if (date > limit_date) {
                source.close();
                callback('{error:limit date}');
            }

            if(date > tomorrow) {
                source.close();
                callback('{error:24 hours}');
            }
        });
    });
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}