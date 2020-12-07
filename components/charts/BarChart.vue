<script lang="ts">
import { ChartOptions } from 'chart.js';
import { Bar, mixins } from 'vue-chartjs';
import { Component, mixins as Mixins, Prop } from 'nuxt-property-decorator';

@Component({
  extends: Bar,
})
export default class BarChart extends Mixins(mixins.reactiveProp, Bar) {
  @Prop() options!: ChartOptions;

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
}
</script>
