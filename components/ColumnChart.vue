<template>
    <section class="charts">
        <div v-for="group in groups" class="group">
            <h2></h2>

            <div v-for="chart in group.charts" class="chart">
                <highcharts :options="chart"></highcharts>
            </div>
        </div>
    </section>
</template>

<script>
import raceBrackets from '~/assets/cpshouseholdincome.csv';
import taxBrackets from '~/assets/jcttaxcutsbyincomeovertime.csv';
import { Chart } from 'highcharts-vue';
import clone from 'lodash.clonedeep';

export default {
    data() {
        const chartTitles = {
            'White alone Non Hispanic': 'White',
            'Totals Hispanic': 'Hispanic',
            'Black or African American alone Non Hispanic': 'Black',
            'Asian alone Non Hispanic': 'Asian',
            'Totals Totals': null,
            'Totals Non Hispanic': null,
            'American Indian and Alaska Native alone Non Hispanic': null,
            'Native Hawaiian and Other Pacific Islander alone Non Hispanic': null,
            'Two or more races Non Hispanic': null
        };
        let chartOptions = {
            chart: {
                type: 'column',
                height: 140,
                // paddingLeft: -10,
                style: {
                    fontFamily: 'tablet-gothic-narrow'
                }
            },
            xAxis: {
                tickLength: 0,
                align: 'right',
                title: {
                    text: null
                },
                labels: {
                    enabled: false,
                    reserveSpace: true,
                    allowOverlap: true,
                    step: 1,
                    style: {
                        fontSize: '12.5px',
                        color: '#383838'
                    }
                }
            },
            yAxis: {
                tickInterval: 15,
                gridLineWidth: 1,
                title: {
                    text: null
                },
                labels: {
                    format: '{value}%'
                    // enabled: false
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                // enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                align: 'left',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                    // color: '#666'
                }
            },
            style: {
                fontFamily: 'tablet-gothic-narrow'
            },
            plotOptions: {
                series: {
                    // pointWidth: 11,
                    color: '#3D7FA6',
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }
            // series
        };
        const raceCategories = Object.keys(raceBrackets[0])
            .filter(cat => ['', 'Race', 'Hispanic origin'].indexOf(cat) === -1)
            .map(cat => cat.replace(' pct', ''));
        const raceSeries = raceBrackets
            .map(row => {
                return {
                    name: chartTitles[`${row.Race} ${row['Hispanic origin']}`],
                    data: raceCategories.map(cat => row[`${cat} pct`] * 100)
                };
            })
            .filter(s => s.name);
        raceSeries.splice(1, 0, raceSeries.shift());
        let raceCharts = raceSeries.map(s => {
            let options = clone(chartOptions);
            options.title.text = s.name;
            options.series = [s];
            options.xAxis.categories = raceCategories;
            options.yAxis.min = 0;
            options.yAxis.max = 43;
            return options;
        });
        const taxCategories = Object.keys(taxBrackets[0]).filter(
            cat => ['Year'].indexOf(cat) === -1
        );
        const taxSeries = taxBrackets
            .map(row => {
                return {
                    name: row.Year,
                    data: taxCategories.map(cat => row[cat] * 100)
                };
            })
            .filter(s => s.name !== '2018');
        let taxCharts = taxSeries.map(s => {
            let options = clone(chartOptions);
            options.title.text = s.name;
            options.series = [s];
            options.xAxis.categories = taxCategories;
            options.yAxis.min = -13;
            options.yAxis.max = 13;
            return options;
        });
        return {
            groups: [
                {
                    charts: taxCharts
                },
                {
                    charts: raceCharts
                }
            ]
        };
    },
    components: {
        highcharts: Chart
    }
};
</script>

<style scoped>
.group {
    float: left;
    width: 300px;
}
.charts:after {
  content: "";
  display: table;
  clear: both;
}
</style>