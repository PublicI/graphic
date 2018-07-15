<template>
    <section class="charts">
        <div v-for="chart in charts" class="chart">
            <highcharts :options="chart"></highcharts>
        </div>
    </section>
</template>

<script>
import raceBrackets from '~/assets/cpshouseholdincome.csv';
import { Chart } from 'highcharts-vue';
import clone from 'lodash.clonedeep';

export default {
    data() {
        let chartOptions = {
            chart: {
                type: 'column',
                // height: 140,
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
                // tickInterval: 15,
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

        let categories = [
            'Less than $10,000 pct',
            '$10,000 to $20,000 pct',
            '$20,000 to $30,000 pct',
            '$30,000 to $40,000 pct',
            '$40,000 to $50,000 pct',
            '$50,000 to $75,000 pct',
            '$75,000 to $100,000 pct',
            '$100,000 and over pct'
        ];

        let charts = raceBrackets.map(s => {
            let options = clone(chartOptions);
            options.title.text = s.Race;
            options.series = [
                {
                    data: categories.map(c => +s[c]),
                    name: s.Race
                }
            ];
            options.xAxis.categories = categories;
            options.yAxis.min = 0;
            options.yAxis.max = 0.43;
            return options;
        });

        return {
            charts
        };
    },
    components: {
        highcharts: Chart
    }
};
</script>

<style scoped>
</style>
