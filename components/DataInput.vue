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

            <no-ssr placeholder="Editor Loading...">
                <codemirror ref="cm" :options="cmOptions" v-model="parseableData">
                </codemirror>
            </no-ssr>

            <!--
            <v-textarea
              outline
              name="parseable-data"
              label="Paste data here"
              v-model="parseableData"
              autofocus
              :auto-grow="true"
              style="margin-top: 10px"
            ></v-textarea>
            -->
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
            parseableData: '',
            cmOptions: {
              lineNumbers: true,
              autofocus: true,
              placeholder: 'Paste data here'
            }
        };
    },
    computed: {
        codemirror() {
            return this.$refs.cm.codemirror;
        },
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
        },
        tabs(tab) {
            let vm = this;

            if (tab === 0) {
                this.$nextTick(() => {
                    vm.codemirror.refresh();
                });
            }
        }
    }
    /*,
    mounted() {
        let vm = this;

        this.$nextTick(() => {
            setTimeout(() => {
                vm.codemirror.refresh();
            },1000);
        });
    }
    */
};
</script>

<style>
/* https://github.com/densitydesign/raw/blob/db13b1334613b1415fcfe06d8825ee3256c74891/css/raw.css */

.CodeMirror {
  font-family: Cousine, Menlo, Monaco, Courier, monospace;
  font-size: 11px;
  background-color: #ffffff;
  line-height: 18px;
  border-radius: 2px;
  margin: 10px 0;
  height: 275px;

  border: 1px solid rgb(200,200,200);

  -webkit-box-shadow: 0px 1px rgba(0,0,0,.1);
     -moz-box-shadow: 0px 1px rgba(0,0,0,.1);
          box-shadow: 0px 1px rgba(0,0,0,.1);

  margin-top: 0px;

}

.CodeMirror-activeline {
  color: #333;
}

.CodeMirror-activeline-background {
  background: rgba(68, 204, 164, 0.18) !important;
}

pre.CodeMirror-placeholder {
  color: #999;
}

.CodeMirror.highlight {
  opacity: .5;
}

.CodeMirror-gutters {
  height: 100%;
  border: none;
  background-color: #fff;
  border-right: 1px solid #eee;
}

.CodeMirror-linenumber {
  color: #bbb;
}

.CodeMirror-focused {

}

.CodeMirror-code div:first-child pre{
  font-weight: bold;
}

.CodeMirror .line-error .CodeMirror-linenumber {
  color: #f00;
}

.CodeMirror .line-error {
  background-color: #FFF3B8;
  color: #3F403F;
}

.cm-tab {
   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAMCAYAAAAkuj5RAAAAAXNSR0IArs4c6QAAAGFJREFUSMft1LsRQFAQheHPowAKoACx3IgEKtaEHujDjORSgWTH/ZOdnZOcM/sgk/kFFWY0qV8foQwS4MKBCS3qR6ixBJvElOobYAtivseIE120FaowJPN75GMu8j/LfMwNjh4HUpwg4LUAAAAASUVORK5CYII=);
   background-position: right;
   background-repeat: no-repeat;
   opacity: .3;
}
</style>
