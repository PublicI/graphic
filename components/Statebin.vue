<template>
    <div class="statebinContainer">
        <svg style="width:100%;height:60px">
            <g class="legendLinear" transform="translate(20,20)">
            </g>
        </svg>

        <div class="statebins">
            <div :style="(bin.color == '#ffffd4' ? 'color:rgb(210,210,210);' : '') + 'top:' + bin.y + 'px;left:' + bin.x + 'px;background-color:' + bin.color" class="statebin" v-for="bin in bins" v-tooltip="{ content: '<b>' + bin.name + '</b><br>' + bin.formattedRecoveries + ' recoveries' }">
                {{bin.abbrev}}
            </div>
        </div>

        <!-- <p class="source">Source: Off-Site Source Recovery Program</p> -->
    </div>
</template>

<script>
import { intcomma, postal } from 'journalize';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';

export default {
    props: {
        rows: Array
    },
    data() {
        return {
            grid: [
                '                                  ME',
                '                   WI          VT NH',
                '    WA ID MT ND MN IL MI    NY MA',
                '    OR NV WY SD IA IN OH PA NJ CT RI',
                '    CA UT CO NE MO KY WV VA MD DE',
                '       AZ NM KS AR TN NC SC',
                '             OK LA MS AL GA',
                '    HI AK    TX             FL'
            ]
        };
    },
    created() {
        this.$emit('init', {
            // TKTK
        });
    },
    mounted() {
        this.$nextTick(() => {
            let legendLinear = legendColor()
                .shapeWidth(30)
                .labels(['>0', '>100', '>500', '>1K', '>5K'])
                // .labelAlign('end')
                .orient('horizontal')
                .labelFormat(',')
                .scale(this.scale());

            d3.select('.legendLinear').call(legendLinear);
        });
    },
    methods: {
        scale() {
            // const logScale = d3.scaleLog().domain([1, 8566]);

            let thresholdScale = d3.scaleThreshold()
                .domain([100, 500, 1000, 5000, 10000])
                .range(d3.schemeYlOrBr[5]);

            return thresholdScale;
            /*
            return d3.scaleSequential(d => {
                console.log(d, quantizeScale(d));
                return d3.interpolateYlOrBr(quantizeScale(d));
            });
            */
        }
    },
    computed: {
        bins() {
            let scale = this.scale();

            let binsRef = {};
            let bins = [];

            let boxSize = 26;

            let re = /\w+/g;

            this.grid.forEach(function(line, i) {
                let m;
                while ((m = re.exec(line))) {
                    // eslint-disable-line no-cond-assign
                    let state = {
                        abbrev: m[0],
                        x: m.index / 3 * boxSize - (boxSize + 2),
                        y: i * boxSize,
                        color: null,
                        name: null,
                        recoveries: null
                    };

                    bins.push(state);

                    binsRef[state.abbrev] = state;
                }
            });

            this.rows.forEach(function(d) {
                let abbrev = postal(d.state);
                if (abbrev in binsRef) {
                    binsRef[abbrev].color = scale(d.recoveries);
                    binsRef[abbrev].name = d.state;
                    binsRef[abbrev].recoveries = d.recoveries;
                    binsRef[abbrev].formattedRecoveries = intcomma(d.recoveries);
                }
            });

            return bins;
        }
    }
};
</script>

<style>
.statebins {
    position: relative;
    width: 300px;
    height: 220px;
    margin-top: -19px;
}

.statebin {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #eee;
    color: white;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    padding-top: 1px;
}

.tooltip {
    display: block !important;
    z-index: 10000;
}

.tooltip .tooltip-inner {
    background: white;
    color: black;
    border-radius: 2px;
    padding: 5px 10px 4px;
    font-family: tablet-gothic-n2, tablet-gothic, Helvetica Neue, Helvetica,
        Arial, sans-serif;
    font-size: 16px;
    line-height: 19px;
}

.tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: white;
    z-index: 1;
}

.tooltip[x-placement^='top'] {
    margin-bottom: 5px;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tooltip[x-placement^='bottom'] {
    margin-top: 5px;
}

.tooltip[x-placement^='bottom'] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tooltip[x-placement^='right'] {
    margin-left: 5px;
}

.tooltip[x-placement^='right'] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tooltip[x-placement^='left'] {
    margin-right: 5px;
}

.tooltip[x-placement^='left'] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 2px;
    box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
}
.source {
    font-size: 14px;
    line-height: 16px;
    color: #666;
    margin-bottom: 15px;
}

.legendLinear .label {
    font-family: tablet-gothic-n2, tablet-gothic, Helvetica Neue, Helvetica,
        Arial, sans-serif;
    font-size: 13px;
    line-height: 16px;
    fill: rgb(100, 100, 100);
}
</style>
