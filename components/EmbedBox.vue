<template>
    <div>
        <v-textarea
          outline
          name="embed-box"
          v-model="embedHtml"
          :auto-grow="true"
          readonly
          autofocus
          @focus="focused"
        ></v-textarea>
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
    methods: {
        focused() {
            // console.log(this);
        }
    },
    computed: {
        ...mapState(['data', 'type']),
        url() {
            let qs = encodeURIComponent(JSON.stringify({
                rows: this.data,
                type: this.type
            }));

            return `embed/?props=${qs}`;
        },
        embedHtml() {
            return decodeURIComponent('%3Cdiv id="graphic" data-view="') +
                    this.url +
                    decodeURIComponent('"%3E%3C/div"%3E %3Cscript src="//apps.publicintegrity.org/graphic/embed.js" type="text/javascript"%3E%3C/script%3E');
        }
    }
};
</script>