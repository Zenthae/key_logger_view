<template>
  <div class="text-center">
    <RadioGroup
      v-model="interval"
      name="intervalMouse"
      :values="['années', 'mois', 'semaines', 'jours']"
    />
    <div v-if="Object.keys(value).length !== 0">
      <Chart
        :data="{ json: { total: Object.values(selectedData) } }"
        :config="{
          axis: {
            x: {
              type: 'category',
              categories: Object.keys(selectedData),
            },
          },
          zoom: { enabled: true },
          title: {
            text: 'Boutons sourie',
          },
        }"
        type="bar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { reduce } from 'lodash';
import { Clicks, Interval } from '~/types';

type ChartData = { [index: string]: number };

@Component
export default class MouseChart extends Vue {
  @Prop({ type: Object, default: {} }) readonly value!: Clicks;

  interval: Interval = 'années';

  get selectedData(): ChartData {
    if (this.interval === 'années') return this.getFilteredByDate('yyyy');
    if (this.interval === 'mois') return this.getFilteredByDate('yyyy-MM');
    if (this.interval === 'semaines') return this.getFilteredByDate('yyyy-ww');
    if (this.interval === 'jours') return this.getFilteredByDate('yyyy-MM-dd');
    return {};
  }

  get mouseClicks(): Clicks {
    const { LeftClick = [], RightClick = [], MiddleClick = [] } = {
      ...this.value,
    };
    return { LeftClick, RightClick, MiddleClick };
  }

  getFilteredByDate(format: string): ChartData {
    return reduce<Clicks, ChartData>(
      this.mouseClicks,
      (prev, curr) => {
        curr.forEach((v) => {
          const _date = this.$dateFns.format(new Date(v), format);
          prev[_date] = (prev[_date] || 0) + 1;
        });
        return prev;
      },
      {},
    );
  }
}
</script>
