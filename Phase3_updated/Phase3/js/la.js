
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


/**********Get Total Cases Data**********/

function TotalCaseAnalysis() {
    getJSON('https://data.lacity.org/resource/63jg-8b9z.json?$select=date_extract_y(date_rptd)%20as%20year,count(dr_no)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

                var Case2020=parseInt(data[0].count_dr_no);
                var Case2019=parseInt(data[1].count_dr_no);
                var Case2018=parseInt(data[2].count_dr_no);
                var Case2017=parseInt(data[3].count_dr_no);
                var Case2016=parseInt(data[4].count_dr_no);
                var Case2015=parseInt(data[5].count_dr_no);
                var Case2014=parseInt(data[6].count_dr_no);
                var Case2013=parseInt(data[7].count_dr_no);
                var Case2012=parseInt(data[8].count_dr_no);
                var Case2011=parseInt(data[9].count_dr_no);
                var Case2010=parseInt(data[9].count_dr_no);}
            drawTotalCase(Case2020,Case2019,Case2018,Case2017,Case2016,Case2015,Case2014,Case2013,Case2012,Case2011,Case2010);


            GenderAnalysis();
            ageAnalysis();
            comparison()
        });
}





//**********Visualize Total Cases Data**********////////////////////////////////////////////////////////////////////////

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(TotalCaseAnalysis);
function drawTotalCase(Case2020,Case2019,Case2018,Case2017,Case2016,Case2015,Case2014,Case2013,Case2012,Case2011,Case2010) {
    var data = google.visualization.arrayToDataTable([
        ['Total Cases by Year', 'Number of Cases'],
        ['2010', parseInt(Case2010)],
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
        title: 'Total Cases of Crime in Los Angeles by Year--2010 to 2020',
        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0, title: 'Total Crime rate LA'}
        
    };


    var totalCaseChart = new google.visualization.ColumnChart(document.getElementById('totalCaseChart'));
    totalCaseChart.draw(data, options);
}


/***************************************************************************/
    
    /***************************************************************************/
    /***************************************************************************/


 /****************************ge total case gender***********************************************/

function GenderAnalysis() {

    //get 2017 gender data
    getJSON('https://data.lacity.org/resource/63jg-8b9z.json?$select=vict_sex%20as%20s,count(dr_no)&$group=s%20limit%20150000',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

                var f=parseInt(data[1].count_dr_no);
                var m=parseInt(data[3].count_dr_no);
                var u=parseInt(data[5].count_dr_no);
            }
    drawgender(f,m,u);          
       
            });
        
}

/****************************visualise gender***********************************************/

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawgender);

function drawgender(f,m,u) {
    var data = google.visualization.arrayToDataTable([
        ['Gender','Number of Cases'],
        ['Feminin', parseInt(f)],
        ['Masculin', parseInt(m)],
        ['Undifined', parseInt(u)],
        

    ]);
   var options = {
        animation: {
            startup: true,   /* Need to add this for animations */
            duration: 1000,
            easing: 'in',
        },
        title: 'The Relationship between crime and gender from 2010 to 2019 ',
        chartArea: {width: '60%'},
        hAxis: {
            title: 'Total Crime rate LA',
            minValue: 0
        },
        vAxis: {
            title: 'Gender'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('genderChar'));

    chart.draw(data, options);
}







/**********Get Age Data**********/

/********************************************************************************/

/***************************************************************************/

function  ageAnalysis(){
    var age0_10=0,age10_20=0,age20_30=0,age30_40=0,age40_50=0,age50_60=0,age60_70=0,age70_80=0,age80_90=0,age90_100=0;

    getJSON('https://data.lacity.org/resource/63jg-8b9z.json?$limit=150000',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                for(var i=0;i<data.length;i++){
                    if(data[i]['vict_age'] < 10 && data[i]['vict_age'] > 0){
                        age0_10++;
                    }
                    else if(data[i]['vict_age'] < 20 && data[i]['vict_age'] > 10){
                        age10_20++;
                    }
                    else if(data[i]['vict_age'] < 30 && data[i]['vict_age'] > 20){
                        age20_30++;
                    }
                    else if(data[i]['vict_age'] < 40 && data[i]['vict_age'] > 30){
                        age30_40++;
                    }
                    else if(data[i]['vict_age'] < 50 && data[i]['vict_age'] > 40){
                        age40_50++;
                    }
                    else if(data[i]['vict_age'] < 60 && data[i]['vict_age'] > 50){
                        age50_60++;
                    }
                    else if(data[i]['vict_age'] < 70 && data[i]['vict_age'] > 60){
                        age60_70++;
                    }
                    else if(data[i]['vict_age'] < 80 && data[i]['vict_age'] > 70){
                        age70_80++;
                    }
                    else if(data[i]['vict_age'] < 90 && data[i]['vict_age'] > 80){
                        age80_90++;
                    }
                    else if(data[i]['vict_age'] < 100 && data[i]['vict_age'] > 90){
                        age90_100++;
                    }
                }

                drawAgeChart(age0_10,age10_20,age20_30,age30_40,age40_50,age50_60,age60_70,age70_80,age80_90,age90_100);
                
            }
        });

}

/**********visualize Age Data***************************************************/


google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawAgeChart);
function drawAgeChart(age0_10,age10_20,age20_30,age30_40,age40_50,age50_60,age60_70,age70_80,age80_90,age90_100) {
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
        title: 'The relationship between crime and victims age from 2010 to 2019'
    };
    var chart = new google.visualization.PieChart(document.getElementById('ageChar'));
    chart.draw(data, options);
}




/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/


/**********Get Total Cases Data**********/

function comparison() {
    
    
    
     getJSON('https://data.kcmo.org/resource/98is-shjt.json?$select=date_extract_y(reported_date)%20as%20year,count(report_no)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

                var k17=parseInt(data[0].count_report_no);
                
               }
         
          getJSON('https://data.kcmo.org/resource/dmjw-d28i.json?$select=date_extract_y(reported_date)%20as%20year,count(report_no)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

                var k18=parseInt(data[0].count_report_no);
                
               }
              
               getJSON('https://data.kcmo.org/resource/pxaa-ahcm.json?$select=date_extract_y(reported_date)%20as%20year,count(report_no)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

                var k19=parseInt(data[0].count_report_no);
                
               }
        
    getJSON('https://data.lacity.org/resource/63jg-8b9z.json?$select=date_extract_y(date_rptd)%20as%20year,count(dr_no)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

               
                var Case2019=parseInt(data[1].count_dr_no);
                var Case2018=parseInt(data[2].count_dr_no);
                var Case2017=parseInt(data[3].count_dr_no);
               
               }
        
        
        
         getJSON('https://data.cityofnewyork.us/resource/wvxf-dwi5.json?$select=date_extract_y(inspectiondate)%20as%20year,count(violationid)%20&$group=year%20&$order=year%20desc',
        function(err, data) {
            if (err !== null) {
                alert('wrong: ' + err);
            } else {

                
                var Case19=parseInt(data[1].count_violationid);
                var Case18=parseInt(data[2].count_violationid);
                var Case17=parseInt(data[3].count_violationid);
                
               }
             
            drawcomp(Case2019,Case2018,Case2017,Case19,Case18,Case17,k19,k18,k17);


            
        });
      }); 
    });
}); }); 
    
}





//**********Visualize comparison**********////////////////////////////////////////////////////////////////////////

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawcomp);
function drawcomp(Case2019,Case2018,Case2017,Case19,Case18,Case17,k19,k18,k17) {
    var data = google.visualization.arrayToDataTable([
        ['last 3 years', 'LA','NY','KC'],
        
        ['2017', parseInt(Case2017),parseInt(Case17),parseInt(k17)],
        ['2018', parseInt(Case2018),parseInt(Case18),parseInt(k18)],
        ['2019', parseInt(Case2019),parseInt(Case19),parseInt(k19)],
        
    ]);
   
   var options = {
       
          chart: {
            title: 'LA,NY and KC in Last 3 years', 
            
          },
          bars: 'vertical',
          vAxis: {format: 'decimal'},
          chartArea: {width: '60%'},
          height: 500,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('compChart'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

    
}


/***************************************************************************/

