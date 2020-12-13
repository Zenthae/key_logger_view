<template>
  <div class="text-center">
    <RadioGroup
      v-model="interval"
      name="intervalMouse"
      :values="['années', 'mois', 'semaines', 'jours']"
    />
    <div v-if="Object.keys(value).length !== 0">
      <Chart
        :data="{ json: { ...selectedData }, labels: true, order: null }"
        :config="{
          zoom: { enabled: true },
        }"
        type="bar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { forEach, forIn, keys, reduce, values } from 'lodash';
import { Clicks, Interval } from '~/types';

type ChartData = { [index: string]: number };

@Component
export default class MouseChart extends Vue {
  @Prop({ type: Object, default: {} }) readonly value!: Clicks;

  interval: Interval = 'années';

  // get mouseClicksNumber(): ChartData {
  //   const final: ChartData = {};
  //   keys(this.mouseClicks).map((key) => {
  //     final[key] = this.value[key].length;
  //   });
  //   return final;
  // }
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
      {}
    );
  }
}
</script>
