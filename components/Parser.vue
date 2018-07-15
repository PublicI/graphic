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

        <v-textarea
          outline
          name="parseable-data"
          label="Paste data here"
          v-model="parseableData"
          autofocus
        ></v-textarea>
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
            parseableData: ''
        };
    },
    computed: {
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
