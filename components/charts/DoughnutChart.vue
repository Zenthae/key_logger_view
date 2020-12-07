<script lang="ts">
import { ChartOptions } from 'chart.js';
import { Doughnut, mixins } from 'vue-chartjs';
import { Component, mixins as Mixins, Prop } from 'nuxt-property-decorator';

@Component({
  extends: Doughnut,
})
export default class DoughnutChart extends Mixins(
  mixins.reactiveProp,
  Doughnut
) {
  @Prop() options!: ChartOptions;

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
}
</script>
