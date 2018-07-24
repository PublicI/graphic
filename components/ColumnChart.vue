<template>
    <section class="charts">
        <div v-for="chart in charts" class="chart">
            <highcharts :options="chart"></highcharts>
        </div>
    </section>
</template>

<script>
import { Chart } from 'highcharts-vue';
import clone from 'lodash.clonedeep';

export default {
    props: {
        categories: Array,
        rows: Array,
        stacked: Boolean,
        grid: Boolean
    },
    data() {
        return {
            chartOptions: {
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
                        // enabled: false,
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
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                        // color: '#666'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: null
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
                }
                // series
            },
            charts: []
        };
    },
    components: {
        highcharts: Chart
    },
    mounted() {
        this.$emit('init',{
            // TKTK
        });
    },
    methods: {
        render() {
            if (!this.categories || !this.rows) {
                this.charts = [];
                return;
            }

            let options = clone(this.chartOptions);

            options.title.text = '';
            options.series = Object.keys(this.rows[0]).slice(1).map(column => {
                console.log(this.rows.map(d => +d[column]));
                return {
                    data: this.rows.map(d => +d[column]),
                    name: column
                };
            });
            options.xAxis.categories = this.categories;
            options.plotOptions.column.stacking = this.stacked ? 'normal' : null;

            this.charts = [options];
        }
    },
    watch: {
        categories: 'render',
        rows: 'render'
    }
};
</script>

<style scoped>
</style>
