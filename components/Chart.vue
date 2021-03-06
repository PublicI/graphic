<template>
    <section class="charts">
        <div v-for="(chart,i) in charts" :key="i" class="chart">
            <highcharts :options="chart" />
        </div>
    </section>
</template>

<script>
import { Chart } from 'highcharts-vue';
// import clone from 'lodash.clonedeep';

export default {
    components: {
        highcharts: Chart
    },
    props: {
        type: {
            type: String,
            default: 'bar'
        },
        categories: {
            type: Array,
            default() {
                return [];
            }
        },
        rows: {
            type: Array,
            default() {
                return [];
            }
        },
        stacked: Boolean,
        grid: Boolean,
        suffix: {
            type: String,
            default() {
                return '';
            }
        },
        directLabel: Boolean
    },
    computed: {
        charts() {
            if (!this.categories || !this.rows || this.rows.length === 0) {
                return [];
            }

            let series = Object.keys(this.rows[0])
                .slice(1)
                .map(column => {
                    return {
                        data: this.rows.map(d => +d[column]),
                        name: column
                    };
                });

            let options = {
                colors: [
                    '#427aa8',
                    '#fa8e1c',
                    '#e95b54',
                    '#6db6b2',
                    '#519e4b',
                    '#f3c73e',
                    '#b37ca1'
                ],
                chart: {
                    backgroundColor: null,
                    type: this.type,
                    // height: 140,
                    // paddingLeft: -10,
                    style: {
                        fontFamily: 'MaisonNeue'
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
                    gridLineWidth: this.directLabel ? 0 : 1,
                    title: {
                        text: null
                    },
                    labels: {
                        format: '{value}', // %
                        enabled: !this.directLabel
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
                    scatter: {
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
    created() {
        this.$emit('init', {
            // TKTK
        });
    }
};
</script>

<style scoped></style>
