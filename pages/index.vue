<template>
  <div class="min-w-full min-h-full">
    <div class="text-right bg-blue-400">
      <file-input
        v-model="clicks"
        file-type=".json"
        class="px-4 py-2 m-2 text-white bg-blue-600 border-2 border-white hover:bg-blue-500"
      />
    </div>
    <!-- <div v-if="Object.keys(clicks).length !== 0" class="flex"> -->
    <div class="flex">
      <div class="flex-1 min-w-0">
        <mouse-chart :data="clicksBetweenDates" class="chart" />
        <keyboard-chart :data="clicksBetweenDates" class="chart" />
        <individual-key-chart :data="clicksBetweenDates" class="chart" />
      </div>
      <interval-selector
        :start-date="startDate"
        :end-date="endDate"
        class="border-l"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { isBetween } from '~/helpers';
import { Clicks } from '~/types';

@Component
export default class App extends Vue {
  clicks: Clicks = {};
  startDate = this.$dateFns.startOfYear(new Date());
  endDate = this.$dateFns.endOfYear(new Date());

  get clicksBetweenDates() {
    const filteredClicks: Clicks = {};
    Object.keys(this.clicks).forEach((key) => {
      const filteredDates: Date[] = this.clicks[key].filter((date) =>
        isBetween(date, this.startDate, this.endDate),
      );
      if (filteredDates.length !== 0) filteredClicks[key] = filteredDates;
    });
    return filteredClicks;
  }
}
</script>

<style>
.chart {
  @apply border border-black shadow m-4 p-2;
}
</style>
