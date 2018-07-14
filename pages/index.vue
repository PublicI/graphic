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
          <small v-if="data.length > 0">{{data.length}} rows parsed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
            <parser />
          <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 2" step="2">Choose the graphic type</v-stepper-step>

        <v-stepper-content step="2">
          <chooser />
          <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 3" step="3">Configure graphic options</v-stepper-step>

        <v-stepper-content step="3">
          <column-chart />
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

export default {
    data() {
        return {
            e6: 1
        };
    },
    components: {
        Logo,
        Parser,
        Chooser,
        ColumnChart
    },
    computed: {
        data() {
            return this.$store.state.data;
        }
    }
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
