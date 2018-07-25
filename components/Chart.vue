<template>
    <section class="charts">
        <div v-for="chart in charts" class="chart">
            <highcharts :options="chart"></highcharts>
        </div>
    </section>
</template>

<script>
import { Chart } from 'highcharts-vue';
// import clone from 'lodash.clonedeep';

export default {
    props: {
        type: String,
        categories: Array,
        rows: Array,
        stacked: Boolean,
        grid: Boolean,
        suffix: String
    },
    computed: {
        charts() {
            if (!this.categories || !this.rows) {
                return [];
            }

            let series = Object.keys(this.rows[0]).slice(1).map(column => {
                return {
                    data: this.rows.map(d => +d[column]),
                    name: column
                };
            });

            let options = {
                chart: {
                    backgroundColor: null,
                    type: this.type,
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
                        // enabled: false,
                        reserveSpace: true,
                        allowOverlap: true,
                        step: 1,
                        style: {
                            fontSize: '12.5px',
                            color: '#383838'
                        }
                    },
                    categories: this.categories
                },
                yAxis: {
                    // tickInterval: 15,
                    gridLineWidth: this.type === 'line' ? 0 : 1,
                    title: {
                        text: null
                    },
                    labels: {
                        format: '{value}', // %
                        enabled: this.type !== 'line'
                    }
                },
                legend: {
                    enabled: true,
                    itemHoverStyle: {
                        color: '#333333',
                        cursor: 'initial'
                    }
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                        // color: '#666'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        },
                        stacking: this.stacked ? 'normal' : null
                    },
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        stacking: this.stacked ? 'normal' : null
                    },
                    line: {
                        marker: {
                            symbol: 'circle'
                        }
                    },
                    series: {
                        events: {
                            legendItemClick() {
                                return false;
                            }
                        },
                        // pointWidth: 11,
                        // color: '#3D7FA6',
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                },
                series
            };

            // let options = clone(this.chartOptions);

            return [options];
        }
    },
    components: {
        highcharts: Chart
    },
    created() {
        this.$emit('init', {
            // TKTK
        });
    }
};
</script>

<style scoped>
</style>
