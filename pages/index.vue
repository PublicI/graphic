<template>
  <v-layout justify-center align-center>
    <v-flex xs10>
      <div class="text-xs-left">
        <logo />
      </div>
     
      <h1 class="display-1">Graphic maker</h1>

      <v-stepper v-model="e6" vertical>
        <v-stepper-step editable :complete="rows.length > 0" step="1">
          Add your data
          <small>{{ rows.length > 0 ? rows.length + ' rows parsed' : '' }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <data-input />
        </v-stepper-content>

        <v-stepper-step :editable="rows.length > 0" :complete="type !== null && rows.length > 0" step="2">Choose the graphic type</v-stepper-step>

        <v-stepper-content step="2">
          <type-chooser />
        </v-stepper-content>

        <v-stepper-step :editable="rows.length > 0 && type !== null" :complete="e6 > 3" step="3">Configure graphic options</v-stepper-step>

        <v-stepper-content step="3">
          <component v-bind:is="type" ref="graphic" @init="graphicInit" v-bind="graphicProps"></component>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <!-- <v-btn flat>Cancel</v-btn> -->
        </v-stepper-content>

        <v-stepper-step :editable="e6 > 4" step="4">Embed the graphic</v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <!--
          <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
          -->
        </v-stepper-content>
      </v-stepper>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import DataInput from '~/components/DataInput.vue';
import TypeChooser from '~/components/TypeChooser.vue';
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
        DataInput,
        TypeChooser,
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
            let firstColumn = Object.keys(this.rows[0])[0];

            this.graphicProps = {
                categories: this.rows.map(d => d[firstColumn]),
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
