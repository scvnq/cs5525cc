google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic(count2013, count2014, count2015, count2016,count2017,count2018,count2019,chart_div) {



    var data = google.visualization.arrayToDataTable([
         ['Kansas City', 'Crime',],
        ['2013', count2013],
        ['2014', count2014],
        ['2015', count2015],
        ['2016', count2016],
        ['2017', count2017],
        ['2018', count2018],
        ['2019', count2019],

    ]);

    var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'The Crime of Kansas City from 2014 to 2019 ',
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

   //map

    var data = google.visualization.arrayToDataTable([
        ['Lat', 'Long', 'zip'],
        [39.0545923, -94.58915125, 'zip:64127,crime:9491'],
        [39.08540428, -94.53745043, 'zip:64130,crime:12096'],
        [39.10607419, -94.57142102, 'zip:64106,crime:6707'],
        [39.01629699, -94.45916639, 'zip:64133,crime:2898'],
        [38.969007, -94.568088, 'zip:64131,crime:5451'],
        [39.08451435, -94.58120792, 'zip:64108,crime:2743'],
        [39.08451435, -94.58120792, 'zip:64128,crime:2167'],
        [39.0346, -94.5521, 'zip:64134,crime:7057'],
    ]);

    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {
        showTooltip: true,
        showInfoWindow: true
    });
}

google.charts.load("current", {

    "packages":["map"],

    "mapsApiKey": "AIzaSyBOUc1XLQgHjqwTVhokaI1gz44aU_SERBE"
});


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
//The relationship between crime and age
function GenderAnalysis() {

    //get 2017 gender data
    getJSON('https://data.kcmo.org/resource/98is-shjt.json?$select=sex%20as%20s,count(report_no)&$group=s%20limit%20150000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var male2017=parseInt(data[2].count_report_no);
                var Female2017=parseInt(data[1].count_report_no);
                var Unknown2017=parseInt(data[3].count_report_no);
            }


    //get 2018 gender data
    getJSON('https://data.kcmo.org/resource/dmjw-d28i.json?$select=sex%20as%20s,count(report_no)&$group=s%20limit%20150000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var male2018=parseInt(data[2].count_report_no);
                var Female2018=parseInt(data[1].count_report_no);
                var Unknown2018=parseInt(data[3].count_report_no);
            }



    //get 2019 gender data
    getJSON('https://data.kcmo.org/resource/pxaa-ahcm.json?$select=sex%20as%20s,count(report_no)&$group=s%20limit%20150000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var male2019=parseInt(data[2].count_report_no);
                var Female2019=parseInt(data[1].count_report_no);
                var Unknown2019=parseInt(data[3].count_report_no);
            }


    drawgender(male2017,male2018,male2019,Female2017,Female2018,Female2019,Unknown2017,Unknown2018,Unknown2019,'genderchart1');

            ageAnalysis();
            amountAnalysis();
            ZipAnalysis();
            });

        });

    });
}

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawgender);
function drawgender(m1,m2,m3,f1,f2,f3,u1,u2,u3,genderchart) {
    var data = google.visualization.arrayToDataTable([
        ['Year','Male','Female','Unidentified'],
        ['2017', parseInt(m1),parseInt(f1),parseInt(u1)],
        ['2018', parseInt(m2),parseInt(f2),parseInt(u2)],
        ['2019', parseInt(m3),parseInt(f3),parseInt(u3)]

    ]);
    var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'The relationship between crime and gender',
        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };


    var chart = new google.visualization.AreaChart(document.getElementById('genderchart1'));
    chart.draw(data, options);
}


//The relationship between crime and age
function ageAnalysis(){
    var age0_10=0,age10_20=0,age20_30=0,age30_40=0,age40_50=0,age50_60=0,age60_70=0,age70_80=0,age80_90=0,age90_100=0;

    getJSON('https://data.kcmo.org/resource/pxaa-ahcm.json?$limit=150000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                for(var i=0;i<data.length;i++){
                    if(data[i]['age'] < 10 && data[i]['age'] > 0){
                        age0_10++;
                    }
                    else if(data[i]['age'] < 20 && data[i]['age'] > 10){
                        age10_20++;
                    }
                    else if(data[i]['age'] < 30 && data[i]['age'] > 20){
                        age20_30++;
                    }
                    else if(data[i]['age'] < 40 && data[i]['age'] > 30){
                        age30_40++;
                    }
                    else if(data[i]['age'] < 50 && data[i]['age'] > 40){
                        age40_50++;
                    }
                    else if(data[i]['age'] < 60 && data[i]['age'] > 50){
                        age50_60++;
                    }
                    else if(data[i]['age'] < 70 && data[i]['age'] > 60){
                        age60_70++;
                    }
                    else if(data[i]['age'] < 80 && data[i]['age'] > 70){
                        age70_80++;
                    }
                    else if(data[i]['age'] < 90 && data[i]['age'] > 80){
                        age80_90++;
                    }
                    else if(data[i]['age'] < 100 && data[i]['age'] > 90){
                        age90_100++;
                    }
                }

                drawAgeChart(age0_10,age10_20,age20_30,age30_40,age40_50,age50_60,age60_70,age70_80,age80_90,age90_100,'age_chart');
            }
        });

}


//draw piechart for age
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawAgeChart);
function drawAgeChart(age0_10,age10_20,age20_30,age30_40,age40_50,age50_60,age60_70,age70_80,age80_90,age90_100,age_trychart2) {
    var data = google.visualization.arrayToDataTable([
        ['age','count'],
        ['0-10',age0_10],
        ['10-20',age10_20],
        ['20-30',age20_30],
        ['30-40',age30_40],
        ['40-50',age40_50],
        ['50-60',age50_60],
        ['60-70',age60_70],
        ['70-80',age70_80],
        ['80-90',age80_90],
        ['90-100',age90_100]


    ]);
    var options = {
        title: 'The relationship between crime and age'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

//The Crime of Kansas City from 2014 to 2019
function amountAnalysis() {
    //get 2017 amount data
    getJSON('https://data.kcmo.org/resource/98is-shjt.json?$select=count(report_no)',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var count2017=parseInt(data[0].count_report_no);

            }


            //get 2018 amount data
            getJSON('https://data.kcmo.org/resource/dmjw-d28i.json?$select=count(report_no)',
                function(err, data) {
                    if (err !== null) {
                        alert('Something went wrong: ' + err);
                    } else {

                        var count2018=parseInt(data[0].count_report_no);
                    }



                    //get 2019 amount data
                    getJSON('https://data.kcmo.org/resource/pxaa-ahcm.json?$select=count(report_no)',
                        function(err, data) {
                            if (err !== null) {
                                alert('Something went wrong: ' + err);
                            } else {

                                var count2019=parseInt(data[0].count_report_no);
                            }

                            //get 2016 amount data
                            getJSON('https://data.kcmo.org/resource/wbz8-pdv7.json?$select=count(report_no)',
                                function(err, data) {
                                    if (err !== null) {
                                        alert('Something went wrong: ' + err);
                                    } else {

                                        var count2016=parseInt(data[0].count_report_no);
                                    }


                                    //get 2015 amount data
                                    getJSON('https://data.kcmo.org/resource/kbzx-7ehe.json?$select=count(report_no)',
                                        function(err, data) {
                                            if (err !== null) {
                                                alert('Something went wrong: ' + err);
                                            } else {

                                                var count2015=parseInt(data[0].count_report_no);
                                            }


                                            //get 2014 amount data
                                            getJSON('https://data.kcmo.org/resource/yu5f-iqbp.json?$select=count(report_no)',
                                                function(err, data) {
                                                    if (err !== null) {
                                                        alert('Something went wrong: ' + err);
                                                    } else {

                                                        var count2014=parseInt(data[0].count_report_no);
                                                    }


                                                    //get 2013 amount data
                                                    getJSON('https://data.kcmo.org/resource/m3xd-e7tp.json?$select=count(report_no)',
                                                        function(err, data) {
                                                            if (err !== null) {
                                                                alert('Something went wrong: ' + err);
                                                            } else {

                                                                var count2013=parseInt(data[0].count_report_no);
                                                            }


                                                            drawBasic(count2013, count2014, count2015, count2016, count2017,count2018,count2019,'chart_div');
                                                        });
                                                });
                                        });
                                });


                        });

                });

        });
}


//The relationship between crime and zip  code
function ZipAnalysis() {

    getJSON('https://data.kcmo.org/resource/98is-shjt.json?$select=zip_code%20as%20s,count(report_no)&$group=s%20limit%20150000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var cases = [['Zip Code', 'Cases',{ role: "style" }]];
                for(var i=0;i<data.length;i++){
                    if(data[i]['count_report_no']>5000){
                        cases.push([data[i]['s'],parseInt(data[i]['count_report_no']),'stroke-color: darkblue; stroke-opacity: 0.5; stroke-width: 8; ']);
                    }
                }
                console.log(cases);
                drawZipChart(cases);
            }
    });
}

//draw chart for zip
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawZipChart);
function drawZipChart(cases) {


    var data = google.visualization.arrayToDataTable(cases);
    var options = {
        title: 'The relationship between crime and zipCode(having cases more than 5000)',
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('zipcodechart'));
    chart.draw(data, options);
}
