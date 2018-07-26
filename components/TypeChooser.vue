<template>
    <v-container grid-list-sm>
        <v-layout row wrap>
          <v-flex lg4 md6 sm12 v-for="type in types" :key="type.key">
              <v-card @click="setType(type.key)" hover :color="currentType == type.key ? 'amber lighten-5' : ''">
                <v-card-media
                  :src="type.img"
                  height="150px"
                  flat
                  @click="setType(type.key)"
                ></v-card-media>

                <v-card-title @click="setType(type.key)" primary-title>
                  <div>
                    <h3 class="headline mb-0">{{type.name}}</h3>
                    <div>{{type.description}}</div>
                  </div>
                </v-card-title>

                <v-card-actions @click="setType(type.key)">
                  <v-btn flat color="orange" @click="setType(type.key)">Choose</v-btn>
                </v-card-actions>
              </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            types: [{
                key: 'column-chart',
                name: 'Column chart',
                description: 'Good for comparison, over time',
                img: 'img/columnchart.png'
            }, {
                key: 'bar-chart',
                name: 'Bar chart',
                description: 'Good for long category names',
                img: 'img/barchart.png'
            }, {
                key: 'line-chart',
                name: 'Line chart',
                description: 'Good for denser data over time',
                img: 'img/linechart.png'
            }, {
                key: 'scatter-plot',
                name: 'Scatter plot',
                description: 'Good for showing correlations',
                img: 'img/scatterplot.png'
            }, {
                key: 'statebin',
                name: 'State bins',
                description: 'Good for showing state-level data',
                img: 'img/statebin.png'
            }]
        };
    },
    methods: {
        setType(type) {
            this.$store.commit('setType', type);
        }
    },
    computed: {
        currentType() {
            return this.$store.state.type;
        }
    }
};
</script>