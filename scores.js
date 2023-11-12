const db = firebase.firestore();
var pointsref = db.collection("points");
var promise = pointsref.get().then((querySnapshot) => {
    var totalR = 0;
    var totalB = 0;
    querySnapshot.forEach((doc) => {
        if (doc.data().team == "Red") {
            totalR += doc.data().points;
        } else {
            totalB += doc.data().points;
        }
    });
    console.log(totalR);
    displayChart(totalR, totalB);
});

function displayChart(red, blue) {
    var redScore = red;
    var blueScore = blue;
    let myChart = document.getElementById("myChart").getContext("2d");
    let minDataValue = 0;
    let barChart = new Chart(myChart, {
        type:"pie",
        data: {
            labels:['Blue', 'Red'],
            datasets:[{
                label:'Points',
                data:[
                    blueScore,
                    redScore
                ],

                backgroundColor:[
                    'rgba(20, 0, 235, .8)',
                    'rgba(227, 0, 49, 0.8)'
                ],
                borderWidth:4,
                borderColor:'#777'
            }]
        },

        options: {
            legend: {
                display: true,
                position: 'left',
                labels: {
                    fontSize: 30,
                }
            }
        }
    });
}