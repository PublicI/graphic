<template>
    <component v-bind:is="type" v-if="type" ref="graphic" @init="graphicInit" v-bind="graphicProps"></component>
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
            graphicProps: null
        };
    },
    asyncData(ctx) {
        return {
            ...JSON.parse(ctx.query.props)
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
            this.graphicProps = {
                categories: Object.keys(this.rows[0]).slice(1),
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
