<template>
  <div>
    <div class="text-right bg-blue-400">
      <FileInput
        v-model="clicks"
        class="px-4 py-2 m-2 text-white bg-blue-600 border-2 border-white hover:bg-blue-500"
        file-type=".json"
      />
    </div>
    <div
      class="flex flex-row flex-wrap p-1 m-2 border border-black justify-evenly"
    >
      <DateTimeInput v-model="startDate" />
      <!-- <span class="flex-auto" /> -->
      <DateTimeInput v-model="endDate" />
    </div>
    <main class="flex mx-4 my-2 flex-nowrap">
      <div class="flex-1 box">
        <KeyboardChart :value="clicks" />
      </div>
      <div class="flex-1 box">
        <MouseChart :value="clicks" />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

@Component
export default class first extends Vue {
  clicks: Clicks = {};
  startDate: Date = this.$dateFns.startOfDay(new Date());
  endDate: Date = this.$dateFns.endOfDay(new Date());

  // randomColor() {
  //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
  // }

  // get test() {
  //   return Object.entries(this.clicks);
  // }

  // get clicksBetweenDates() {
  //   const filteredClicks: Clicks = {};
  //   Object.keys(this.clicks).forEach((key) => {
  //     const filteredDates: Date[] = this.clicks[key].filter(
  //       (date) =>
  //         this.$dateFns.isBefore(new Date(date), this.endDate) &&
  //         this.$dateFns.isAfter(new Date(date), this.startDate)
  //     );
  //     if (filteredDates.length !== 0) filteredClicks[key] = filteredDates;
  //   });
  //   return filteredClicks;
  // }

  // get totalClicks() {
  //   let total: number = 0;
  //   Object.values(this.clicksBetweenDates).map(
  //     (keyArray) => (total += keyArray.length)
  //   );
  //   return total;
  // }

  // get clicksCountPerKey() {
  //   return Object.entries(this.clicksBetweenDates).reduce<{
  //     [index: string]: number;
  //   }>((acc, curr) => {
  //     acc[curr[0]] = curr[1].length;
  //     return acc;
  //   }, {});
  // }

  // get flattenedClicks() {
  //   const flattenedClicks: [string, Date][] = [];
  //   Object.keys(this.clicks).forEach((key) =>
  //     this.clicks[key].forEach((date) =>
  //       flattenedClicks.push([key, new Date(date)])
  //     )
  //   );
  //   return flattenedClicks;
  // }
}
</script>

<style>
.box {
  @apply p-1 m-1 border border-black shadow;
}
</style>
