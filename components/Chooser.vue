<template>
    <v-container grid-list-sm>
        <v-layout row wrap>
          <v-flex xs4 v-for="item in 3" :key="item">
              <v-card>
                <v-card-media
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  height="150px"
                ></v-card-media>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Column chart</h3>
                    <div>Comparison</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="orange">Choose</v-btn>
                </v-card-actions>
              </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>
