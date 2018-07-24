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
export default {
    methods: {
        focused() {
            // console.log(this);
        }
    },
    computed: {
        url() {
            return '/embed?';
        },
        embedHtml() {
            return decodeURIComponent(`%3Cdiv id="graphic" data-view="${this.url}"%3E%3C/div"%3E
%3Cscript src="//apps.publicintegrity.org/graphic/embed.js" type="text/javascript"%3E%3C/script%3E`);
        }
    }
};
</script>

<style>
textarea {
    font-size: 13px;
}
</style>
