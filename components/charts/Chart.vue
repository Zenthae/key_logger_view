<template>
  <div ref="root" class="w-full h-full"></div>
</template>

<script lang="ts">
import { Component, Ref, Prop, Watch, Vue } from 'nuxt-property-decorator';
import { generate, ChartAPI, ChartConfiguration, ChartType, Data } from 'c3';
import { cloneDeep, debounce, defaultsDeep } from 'lodash';
import { select } from 'd3';

@Component
export default class Chart extends Vue {
  $chart: any = null;

  @Ref()
  readonly root!: HTMLDivElement;

  @Prop({ type: Object, default: () => ({}) })
  readonly config!: any;

  @Prop({ type: Object, default: () => ({}) })
  readonly data!: any;

  @Prop({ type: String, default: 'bar' })
  readonly type!: string;

  @Prop({ type: String, default: '' })
  readonly text!: string;

  @Watch('text', { immediate: true })
  onTextChanged(text: string): void {
    this.title = text;
  }

  @Watch('data', { deep: true })
  readonly reloadDebounce = debounce(() => this.reload(), 50);

  readonly updateDebounce = debounce(() => this.update(), 50);

  get title(): string {
    if (!this.root) return '';
    const titleElement = this.root.querySelector('.c3-chart-arcs-title');

    if (titleElement) return titleElement.innerHTML;
    return '';
  }

  set title(val: string) {
    if (!this.root) return;
    const titleElement = this.root.querySelector('.c3-chart-arcs-title');
    if (!titleElement) return;
    titleElement.innerHTML = val;
  }

  initChart(): void {
    const args = this.getArgs();
    this.$chart = generate({
      bindto: this.root,
      ...args,
    });

    if (this.text) this.title = this.text;
    this.$emit('init', args);
  }

  getArgs(): any {
    const data = this.getData();
    const config = this.getConfig();
    return defaultsDeep({ data }, config);
  }

  getData(): Data {
    const { type } = this;
    const data = cloneDeep(this.data);
    return defaultsDeep({ type }, data);
  }

  getConfig(): ChartConfiguration {
    const config = cloneDeep(this.config);
    return defaultsDeep(config);
  }

  reload(): void {
    this.$emit('reloading');
    this.$chart.unload();
    this.$nextTick(() => {
      this.updateDebounce();
    });
  }

  update(): void {
    const data = this.getData();
    this.$chart.load(data);
    this.$emit('update', data);
  }

  mounted() {
    this.initChart();
  }

  beforeDestroy() {
    this.$chart = this.$chart.destroy();
  }
}
</script>
