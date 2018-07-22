<template>
  <v-layout justify-center align-center>
    <v-flex xs10>
      <div class="text-xs-left">
        <logo />
      </div>
     
      <h1 class="display-1">Graphic maker</h1>

      <v-stepper v-model="e6" vertical>
        <v-stepper-step editable :complete="e6 > 1" step="1">
          Add your data
          <small>{{ rows.length > 0 ? rows.length + ' rows parsed' : '' }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <parser />
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 2" step="2">Choose the graphic type</v-stepper-step>

        <v-stepper-content step="2">
          <chooser />
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 3" step="3">Configure graphic options</v-stepper-step>

        <v-stepper-content step="3">
          <component v-bind:is="type" ref="graphic" @init="graphicInit" v-bind="graphicProps"></component>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step editable step="4">Embed the graphic</v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Parser from '~/components/Parser.vue';
import Chooser from '~/components/Chooser.vue';
import ColumnChart from '~/components/ColumnChart.vue';
import BarChart from '~/components/BarChart.vue';

export default {
    data() {
        return {
            e6: 1,
            graphicProps: {}
        };
    },
    components: {
        Logo,
        Parser,
        Chooser,
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
                categories: [
                    'Less than $10,000 pct',
                    '$10,000 to $20,000 pct',
                    '$20,000 to $30,000 pct',
                    '$30,000 to $40,000 pct',
                    '$40,000 to $50,000 pct',
                    '$50,000 to $75,000 pct',
                    '$75,000 to $100,000 pct',
                    '$100,000 and over pct'
                ],
                rows: this.rows
            };
            console.log(this.graphicProps);
            // console.log(wheee, this.$refs.graphic);
        }
    }
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
