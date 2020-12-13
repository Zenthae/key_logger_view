<template>
  <div class="text-center">
    <RadioGroup
      v-model="interval"
      name="intervalMouse"
      :values="['années', 'mois', 'semaines', 'jours']"
    />
    <div v-if="Object.keys(value).length !== 0">
      <Chart
        v-if="interval === 'années'"
        :data="{ json: { ...yearlyMouseClick } }"
        type="bar"
      />
      <Chart
        v-else-if="interval === 'mois'"
        :data="{ json: { ...monthlyMouseClick } }"
        type="bar"
      />
      <Chart
        v-else-if="interval === 'semaines'"
        :data="{ json: { ...weeklyMouseClick } }"
        type="bar"
      />
      <Chart
        v-else-if="interval === 'jours'"
        :data="{ json: { ...dailyMouseClick } }"
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

  // get mouseClicksNumber(): ChartData {
  //   const final: ChartData = {};
  //   keys(this.mouseClicks).map((key) => {
  //     final[key] = this.value[key].length;
  //   });
  //   return final;
  // }

  get mouseClicks(): Clicks {
    const { LeftClick = [], RightClick = [], MiddleClick = [] } = {
      ...this.value,
    };
    return { LeftClick, RightClick, MiddleClick };
  }

  get yearlyMouseClick(): ChartData {
    // iterate over all dates
    // take year and add 1 to result at year key
    // return result
    return reduce<Clicks, ChartData>(
      this.mouseClicks,
      (prev, curr) => {
        curr.forEach((v) => {
          const year = this.$dateFns.format(new Date(v), 'yyyy');
          prev[year] = (prev[year] || 0) + 1;
        });
        return prev;
      },
      {}
    );
  }

  get monthlyMouseClick(): ChartData {
    return reduce<Clicks, ChartData>(
      this.mouseClicks,
      (prev, curr) => {
        curr.forEach((v) => {
          const mounth = this.$dateFns.format(new Date(v), 'yyyy-MM');
          prev[mounth] = (prev[mounth] || 0) + 1;
        });
        return prev;
      },
      {}
    );
  }

  get weeklyMouseClick(): ChartData {
    return reduce<Clicks, ChartData>(
      this.mouseClicks,
      (prev, curr) => {
        curr.forEach((v) => {
          const mounth = this.$dateFns.format(new Date(v), 'yyyy-ww');
          prev[mounth] = (prev[mounth] || 0) + 1;
        });
        return prev;
      },
      {}
    );
  }

  get dailyMouseClick(): ChartData {
    return reduce<Clicks, ChartData>(
      this.mouseClicks,
      (prev, curr) => {
        curr.forEach((v) => {
          const day = this.$dateFns.format(new Date(v), 'yyyy-MM-dd');
          prev[day] = (prev[day] || 0) + 1;
        });
        return prev;
      },
      {}
    );
  }
}
</script>
