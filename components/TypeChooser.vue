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
                description: 'Facilitates comparison',
                img: 'img/columnchart.png'
            },{
                key: 'bar-chart',
                name: 'Bar chart',
                description: 'Facilitates comparison',
                img: 'img/barchart.png'
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