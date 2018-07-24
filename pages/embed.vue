<template>
    <component v-bind:is="type" ref="graphic" @init="graphicInit" v-bind="graphicProps"></component>
</template>

<script>
import ColumnChart from '~/components/ColumnChart.vue';
import BarChart from '~/components/BarChart.vue';

export default {
    async asyncData(ctx) {
        return {
            ...ctx.params
        }
    },
    data() {
        return {
            e6: 1,
            graphicProps: {}
        };
    },
    components: {
        ColumnChart,
        BarChart
    },
    computed: {
        type() {
            return this.$store.state.type;
        },
        rows() {
            return this.$store.state.data;
        }
    },
    methods: {
        graphicInit(graphicProps) {
            this.graphicProps = {
                categories: Object.keys(this.rows[0]).slice(1),
                rows: this.rows
            };
        },
        setType(type) {
            this.$store.commit('setType', type);
        }
    },
    watch: {
        rows(val) {
            if (val.length > 0) {
                this.setType(null);
                this.e6 = 2;
            }
        },
        type(val) {
            if (val) {
                this.e6 = 3;
            }
        }
    }
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
