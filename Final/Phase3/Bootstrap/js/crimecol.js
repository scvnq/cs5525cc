google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    var data = google.visualization.arrayToDataTable([
        ['Kansas City', 'Crime',],
        ['2016', 7537],
        ['2017', 131009],
        ['2018', 131451],


    ]);

    var options = {
        title: 'The Crime of Kansas City from 2016 to 2019 ',
        chartArea: {width: '60%'},
        hAxis: {
            title: 'Total Crime rate in KC',
            minValue: 0
        },
        vAxis: {
            title: 'Kansas City'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    /*var data = google.visualization.arrayToDataTable([
        ['Age', 'criminal'],
        ['35', 1736],
        ['23',     1757],
        ['34',      1777],
        ['31',  1821],
        ['24', 1826],
        ['29',    2005],
        ['27',    2031],
        ['25',    2043],
        ['26',    2078],
        ['30',    2104],
        ['28',    2133],
        ['no value',    17360],
        ['other',    39395],

    ]);*/

    var options = {
        title: 'The relationship between crime and age'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);



   /* var data = google.visualization.arrayToDataTable([
        ['Year', 'Male', 'Female' ,'No value','Unknown'],
        ['2016',  50944,      34923, 17956, 24054],
        ['2017',  52857,      36046, 18049, 25184],
        ['2018',  51254,      35304,18203, 24177],
        ['2019',  27551,      41778, 8260,451]
    ]);*/

    var options = {
        title: 'The relationship between crime and gender',
        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div_sex'));
    chart.draw(data, options);


   //map

    /*var data = google.visualization.arrayToDataTable([
        ['Lat', 'Long', 'zip'],
        [39.0545923, -94.58915125, 'zip:64127,crime:3492'],
        [39.08540428, -94.53745043, 'zip:64130,crime:4593'],
        [39.03116535, -94.54013272, '4381'],
        [38.93355043, -94.50250934, '3082'],
        [39.10607419, -94.57142102, 'zip:64106,crime:3064'],
        [39.01629699, -94.45916639, 'zip:64133,crime:2898'],
        [38.969007, -94.568088, 'zip:64131,crime:2753'],
        [39.0079933, -94.5249499, 'zip:64131,crime:2763'],
        [39.08451435, -94.58120792, 'zip:64108,crime:2743'],
        [39.37419993, -95.16758418, 'zip:64132,crime:2743'],
        [39.08451435, -94.58120792, 'zip:64108,crime:2743'],
        [39.08451435, -94.58120792, 'zip:64128,crime:2167'],
        [39.08451435, -94.58120792, 'zip:64108,crime:2743'],
        [39.08451435, -94.58120792, 'zip:64108,crime:2743'],
        [39.08451435, -94.58120792, 'zip:64108,crime:2743']

    ]);*/

    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {
        showTooltip: true,
        showInfoWindow: true
    });
}

google.charts.load("current", {
    "packages":["map"],

    "mapsApiKey": "AIzaSyDbRCms_Y2c7gi-FLq8rR-8eAoRzzFin-8"
});
google.charts.setOnLoadCallback(drawChart);
