const api = 'https://disease.sh/v3/covid-19/historical/all?lastdays=10';
const api2 = 'https://disease.sh/v3/covid-19/countries';

const getData = async() => {
    const response = await fetch(`${api} ${api2}`);
    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(response.status);
    }
};


const result = getData();
result
    .then((data) => {
        let date = Object.keys(data.cases);
        let total = Object.values(data.cases);
        let deaths = Object.values(data.deaths);
        let recovered = Object.values(data.recovered);
        // let tests = Object.values(data.tests);
        var ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                        label: 'Total Cases',
                        data: total,
                        borderColor: 'rgba(255, 99, 132)',
                        fill: false,
                    },
                    {
                        label: 'Recovered Cases',
                        data: recovered,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        fill: false,
                    },
                    {
                        label: 'Deaths',
                        data: deaths,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                    // {
                    //     label: 'Tests',
                    //     data: tests,
                    //     borderColor: 'rgba(76, 193, 193, 2)',
                    //     fill: false,

                    // },
                ],
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Cases',
                        },
                    }, ],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date(MM/DD/YYYY)',
                        },
                    }, ],
                },
                title: {
                    display: true,
                    text: `Coronavirus Cases in the World for 10 Days`,
                },
            },
        });
    })
    .catch((error) => {
        console.log('Error: ', error);
    });