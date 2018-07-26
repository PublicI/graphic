<script>
import Chart from './Chart.vue';

export default {
    extends: Chart,
    props: {
        type: {
            type: String,
            default: 'scatter'
        }
    }
};
</script>
