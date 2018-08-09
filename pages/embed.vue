<template>
    <no-ssr>
        <component v-bind:is="type" v-if="type" ref="graphic" @init="graphicInit" v-bind="graphicProps"></component>
    </no-ssr>
</template>

<script>
import ColumnChart from '~/components/ColumnChart.vue';
import BarChart from '~/components/BarChart.vue';
import LineChart from '~/components/LineChart.vue';
import ScatterPlot from '~/components/ScatterPlot.vue';
import Statebin from '~/components/Statebin.vue';

export default {
    data() {
        return {
            ...(this.$route && this.$route.query && this.$route.query.props ? JSON.parse(decodeURIComponent(this.$route.query.props)) : {
                type: null
            }),
            graphicProps: null
        };
    },
    components: {
        ColumnChart,
        BarChart,
        LineChart,
        ScatterPlot,
        Statebin
    },
    methods: {
        graphicInit(graphicProps) {
            let firstColumn = Object.keys(this.rows[0])[0];

            this.graphicProps = {
                categories: this.rows.map(d => d[firstColumn]),
                rows: this.rows
            };
        }
    }
};
</script>

<style>
.application.theme--light {
    background: white;
}
</style>
