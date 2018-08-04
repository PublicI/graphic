<template>
    <div>
        <v-alert
          :value="true"
          type="error"
          v-if="error !== null"
        >
          Unable to parse data: {{error}}
        </v-alert>

        <v-alert
          :value="true"
          type="success"
          v-if="success !== null"
        >
          Successfully parsed {{success}} rows of data.
        </v-alert>

        <v-tabs v-model="tabs">
          <v-tab>
            Input
          </v-tab>
          <v-tab>
            Table
          </v-tab>
        </v-tabs>


        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-textarea
              outline
              name="parseable-data"
              label="Paste data here"
              v-model="parseableData"
              autofocus
              :auto-grow="true"
              style="margin-top: 10px"
            ></v-textarea>
          </v-tab-item>

          <v-tab-item>
            <v-data-table
              :headers="headers"
              :items="parsedData"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td v-for="header in headers">{{ props.item[header.value] }}</td>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>

    </div>

</template>

<script>
import parser from '~/libs/parser.js';

export default {
    methods: {
        parseData(data) {
            let parse = parser();

            try {
                return parse(data);
            } catch (e) {
                return e;
            }
        },
        setData(data) {
            this.$store.commit('setData', this.parseData(data));
        }
    },
    data() {
        return {
            tabs: null,
            parseableData: ''
        };
    },
    computed: {
        headers() {
            if (!this.parsedData || this.parsedData.length < 1) {
                return [];
            }

            return Object.keys(this.parsedData[0]).map(key => {
                return {
                    text: key,
                    value: key
                };
            });
        },
        parsedData() {
            return this.$store.state.data;
        },
        error() {
            return this.parsedData instanceof Error
                ? this.parsedData.message
                : null;
        },
        success() {
            return !(this.parsedData instanceof Error) &&
                this.parsedData.length > 0
                ? this.parsedData.length
                : null;
        }
    },
    watch: {
        parseableData(data) {
            this.setData(data);
        }
    }
};
</script>

<style>
textarea {
    font-size: 13px;
}
</style>
