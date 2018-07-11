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
          <!-- <small>TK records (un)sucessfully parsed</small> -->
        </v-stepper-step>

        <v-stepper-content step="1">
            <parser />
          <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step editable step="4">View setup instructions</v-stepper-step>
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

export default {
    data() {
        return {
            e6: 1
        };
    },
    components: {
        Logo,
        Parser
    }
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
