
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


//**********Get Total Cases Data**********//////////////////////////////////////////////////////////////////////////////

function TotalCaseAnalysis() {
    getJSON('https://data.cityofnewyork.us/resource/wvxf-dwi5.json?$select=date_extract_y(inspectiondate)%20as%20year,count(violationid)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var Case2020=parseInt(data[0].count_violationid);
                var Case2019=parseInt(data[1].count_violationid);
                var Case2018=parseInt(data[2].count_violationid);
                var Case2017=parseInt(data[3].count_violationid);
                var Case2016=parseInt(data[4].count_violationid);
                var Case2015=parseInt(data[5].count_violationid);
                var Case2014=parseInt(data[6].count_violationid);
                var Case2013=parseInt(data[7].count_violationid);
                var Case2012=parseInt(data[8].count_violationid);
                var Case2011=parseInt(data[9].count_violationid);}
            drawTotalCase(Case2020,Case2019,Case2018,Case2017,Case2016,Case2015,Case2014,Case2013,Case2012,Case2011,'totalCaseChart');


            GenderAnalysis();
            RaceAnalysis();
            AgeAnalysis();
        });
}





//**********Visualize Total Cases Data**********////////////////////////////////////////////////////////////////////////

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(TotalCaseAnalysis);
function drawTotalCase(Case2020,Case2019,Case2018,Case2017,Case2016,Case2015,Case2014,Case2013,Case2012,Case2011) {
    var data = google.visualization.arrayToDataTable([
        ['Total Cases by Year', 'Total Cases'],
        ['2011', parseInt(Case2011)],
        ['2012', parseInt(Case2012)],
        ['2013', parseInt(Case2013)],
        ['2014', parseInt(Case2014)],
        ['2015', parseInt(Case2015)],
        ['2016', parseInt(Case2016)],
        ['2017', parseInt(Case2017)],
        ['2018', parseInt(Case2018)],
        ['2019', parseInt(Case2019)],
        ['2020', parseInt(Case2020)]
    ]);
    var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'Total Cases of Crime in New York City by Year',
        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };


    var totalCaseChart = new google.visualization.ColumnChart(document.getElementById('totalCaseChart'));
    totalCaseChart.draw(data, options);
}


//**********Get Gender Data**********

function GenderAnalysis() {
    getJSON('https://data.cityofnewyork.us/resource/qgea-i56i.json?$select=vic_sex%20as%20s,count(cmplnt_num)&&$group=s%20limit%20190000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var male=parseInt(data[3].count_cmplnt_num);
                var female=parseInt(data[2].count_cmplnt_num);
                var unknown=parseInt(data[1].count_cmplnt_num);
            }
            drawGender(male,female,unknown);





    });
}





//**********Visualize Gender Data************//////////////////////////////////////////////////////////////////////////

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(GenderAnalysis);
function drawGender(m1,f1,u1) {
    var data = google.visualization.arrayToDataTable([
         ['Gender', 'Total Cases'],
        ['Male', parseInt(m1)],
        ['Female', parseInt(f1)],
        ['Undefined', parseInt(u1)]
    ]);
    var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'The relationship between Crime and Gender',
        hAxis: {title: 'Total Cases',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };


    var genderChart = new google.visualization.BarChart(document.getElementById('genderChart'));
    genderChart.draw(data, options);
}







//**********Get Age Data**********//////////////////////////////////////////////////////////////////////////////

function AgeAnalysis() {
    getJSON('https://data.cityofnewyork.us/resource/qgea-i56i.json?$select=vic_age_group%20as%20s,count(cmplnt_num)&&$group=s%20limit%20190000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var Age1=parseInt(data[13].count_cmplnt_num);
                var Age2=parseInt(data[14].count_cmplnt_num);
                var Age3=parseInt(data[19].count_cmplnt_num);
                var Age4=parseInt(data[38].count_cmplnt_num);
                var Age5=parseInt(data[58].count_cmplnt_num);}
            drawAge(Age1, Age2, Age3, Age4, Age5,'ageChart');




        });
}





//**********Visualize Age Data**********////////////////////////////////////////////////////////////////////////

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(AgeAnalysis);
function drawAge(Age1, Age2, Age3, Age4, Age5) {
    var data = google.visualization.arrayToDataTable([
        ['Age Range', 'Number of Cases'],
        ['<18', parseInt(Age1)],
        ['18-24', parseInt(Age2)],
        ['25-44', parseInt(Age3)],
        ['45-64', parseInt(Age4)],
        ['65+', parseInt(Age5)]

    ]);
    var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'The Relationship Between Crime and Age Range',
        hAxis: {title: 'Age Range',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };


    var ageChart = new google.visualization.PieChart(document.getElementById('ageChart'));
    ageChart.draw(data, options);
}


//**********Get Race Data**********////////////////////////////////////////////////////////////////////////////////////

function RaceAnalysis() {
    getJSON('https://data.cityofnewyork.us/resource/qgea-i56i.json?$select=vic_race%20as%20s,count(cmplnt_num)&&$group=s%20limit%20190000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                var AmericanIndian=parseInt(data[0].count_cmplnt_num);
                var Asian=parseInt(data[1].count_cmplnt_num);
                var Black=parseInt(data[2].count_cmplnt_num);
                var BlackHispanic=parseInt(data[3].count_cmplnt_num);
                var White=parseInt(data[6].count_cmplnt_num);
                var WhiteHispanic=parseInt(data[7].count_cmplnt_num);
                var Other=parseInt(data[5].count_cmplnt_num);}
            drawRace(AmericanIndian,Asian,Black, BlackHispanic, White, WhiteHispanic, Other);


        });
}





//**********Visualize Race Data**********//////////////////////////////////////////////////////////////////////////////

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(RaceAnalysis);
function drawRace(AA,A,B,BH,W,WH,O) {
    var data = google.visualization.arrayToDataTable([
        ['Race', 'Total Cases'],
        ['American Indian/ Native America', parseInt(AA)],
        ['Asian', parseInt(A)],
        ['Black', parseInt(B)],
        ['Black Hispanic', parseInt(BH)],
        ['White', parseInt(W)],
        ['White Hispanic', parseInt(WH)],
        ['Other', parseInt(O)]
    ]);
    var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'The relationship between Crime and Race',
        hAxis: {title: 'Race',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };


    var raceChart = new google.visualization.LineChart(document.getElementById('raceChart'));
    raceChart.draw(data, options);
}



