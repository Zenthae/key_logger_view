<template>
  <div ref="root"></div>
</template>

<script lang="ts">
import { ChartAPI, ChartType, Data, generate } from 'c3';
import { debounce, defaultsDeep } from 'lodash';
import { Component, Prop, Ref, Vue, Watch } from 'nuxt-property-decorator';

@Component
export default class ChartBase extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly categories!: string[];

  @Prop({ type: Object, default: () => ({}) })
  readonly colors!: Record<string, string | d3.RGBColor | d3.HSLColor>;

  @Prop({ type: Object, required: true })
  readonly data!: Data;

  @Prop({ type: Boolean, default: true })
  readonly interaction!: boolean;

  @Prop({ type: String, default: 'bar' })
  readonly type!: ChartType;

  @Prop({ type: Boolean, default: false })
  readonly zoom!: boolean;

  @Ref('root') readonly root!: HTMLDivElement;

  chart: ChartAPI | null | undefined = null;

  initChart() {
    this.chart = generate({
      bindto: this.root,
      interaction: {
        enabled: this.interaction,
      },
      data: defaultsDeep(
        { colors: this.colors, labels: true, type: this.type },
        this.data,
      ),
      axis: {
        x: {
          type: 'category',
          categories: this.categories,
          // min: 0,
        },
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
      grid: {
        y: {
          show: true,
        },
      },
      tooltip: {
        grouped: false,
      },
      zoom: {
        enabled: this.zoom,
      },
    });
  }

  get reloadArgs(): any {
    const { url, json, rows, columns } = this.data;
    return {
      url,
      json,
      rows,
      columns,
      categories: this.categories,
      colors: this.colors,
      type: this.type,
      unload: true,
    };
  }

  @Watch('data')
  @Watch('type')
  @Watch('interaction')
  @Watch('categories')
  @Watch('colors')
  readonly updateDebounce = debounce(() => this.update(), 100);

  update() {
    this.$nextTick(() => {
      this.chart?.load(this.reloadArgs);
      this.$emit('update', this.reloadArgs);
    });
  }

  mounted() {
    this.initChart();
  }

  beforeDestroy() {
    this.chart = this.chart?.destroy();
  }
}
</script>
