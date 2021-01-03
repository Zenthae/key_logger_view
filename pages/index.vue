<template>
  <div>
    <div class="flex flex-row items-center text-white bg-blue-400">
      <lang-switcher
        class="ml-2 bg-blue-600 border-2 hover:bg-inherit border-inherit"
      />

      <file-input
        v-model="clicks"
        file-type=".json"
        class="px-4 py-2 m-2 ml-auto bg-blue-600 border-2 border-white hover:bg-blue-500"
      />
    </div>
    <div v-if="Object.keys(clicks).length !== 0" class="flex flex-row">
      <!-- <div class="flex flex-row"> -->
      <div class="flex-1 min-w-0">
        <mouse-chart :data="clicksBetweenDates" class="chart" />
        <keyboard-chart :data="clicksBetweenDates" class="chart" />
        <individual-key-chart :data="clicksBetweenDates" class="chart" />
      </div>
      <interval-selector :interval="interval" class="border-l" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { isBetween } from '~/helpers';
import { Clicks, Interval } from '~/types';

@Component
export default class App extends Vue {
  clicks: Clicks = {};
  // startDate = this.$dateFns.startOfYear(new Date());
  // endDate = this.$dateFns.endOfYear(new Date());
  interval: Interval = {
    startDate: this.$dateFns.startOfYear(new Date()),
    endDate: this.$dateFns.endOfYear(new Date()),
  };

  get clicksBetweenDates() {
    const filteredClicks: Clicks = {};
    Object.keys(this.clicks).forEach((key) => {
      const filteredDates: Date[] = this.clicks[key].filter((date) =>
        isBetween(date, this.interval.startDate, this.interval.endDate),
      );
      if (filteredDates.length !== 0) filteredClicks[key] = filteredDates;
    });
    return filteredClicks;
  }

  // intervalChanged(data: any) {
  //   this.startDate = data.startDate;
  //   this.endDate = data.endDate;
  // }
}
</script>

<style>
.chart {
  @apply border border-black shadow m-4 p-2;
}
</style>
