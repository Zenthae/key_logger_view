<template>
  <div ref="root" class="w-full h-full"></div>
</template>

<script lang="ts">
import { Component, Ref, Prop, Watch, Vue } from 'nuxt-property-decorator';
import { generate, ChartConfiguration, ChartType, Data, ChartAPI } from 'c3';
import { cloneDeep, debounce, defaultsDeep, get } from 'lodash';

@Component
export default class Chart extends Vue {
  chart: ChartAPI | null | undefined = null;

  @Ref()
  readonly root!: HTMLDivElement;

  @Prop({ type: Object, default: () => ({}) })
  readonly config!: ChartConfiguration;

  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Data;

  @Prop({ type: String, default: 'bar' })
  readonly type!: ChartType;

  @Watch('data', { deep: true })
  readonly updateDebounce = debounce(() => this.update(), 50);

  initChart(): void {
    const args = this.getArgs();
    this.chart = generate({
      bindto: this.root,
      ...args,
    });

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

  update(): void {
    const data = this.getData();
    const config = this.getConfig();
    // TODO: look at lodash to get a function that copy values of Object
    this.chart?.load(
      defaultsDeep({ unload: true }, { ...data }, get(config, 'axis.x', {})),
    );
    this.$emit(
      'update',
      defaultsDeep({ unload: true }, { ...data }, get(config, 'axis.x', {})),
    );
  }

  mounted() {
    this.initChart();
  }

  beforeDestroy() {
    this.chart = this.chart?.destroy();
  }
}
</script>
