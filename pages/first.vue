<template>
  <div>
    <div class="text-right bg-blue-500">
      <FileInput
        v-model="clicks"
        class="px-4 py-2 m-2 text-white bg-blue-600 border-2 border-white hover:bg-blue-500"
        file-type=".json"
      />
    </div>
    <main class="flex flex-wrap">
      <div class="box">
        <h2>Filtres</h2>
        <div class="flex flex-col">
          <label class="underline"> Debut : </label>
          <DateInput v-model="startDate" />
          <label class="underline"> Fin : </label>
          <DateInput v-model="endDate" />
        </div>
      </div>
      <div class="box">
        <!-- {{ clicksCountPerKey }} -->
      </div>
      <div class="box">
        <!-- {{ clicksBetweenDates }} -->
      </div>
      <div class="box">
        <DoughnutChart
          :chart-data="{
            datasets: [
              {
                data: Object.values(clicksCountPerKey),
                backgroundColor: Object.keys(clicksCountPerKey).map((v) =>
                  randomColor()
                ),
              },
            ],
            labels: Object.keys(clicksCountPerKey),
          }"
          :options="{
            reactive: true,
            maintainAspectRatio: false,
            legend: { display: false },
          }"
        />
      </div>
      <div class="box">
        <!-- {{ test }} -->
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import { Clicks } from '~/types';

@Component
export default class first extends Vue {
  clicks: Clicks = {};
  startDate: Date = startOfDay(new Date());
  endDate: Date = endOfDay(new Date());

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  get test() {
    return Object.entries(this.clicks);
  }

  get clicksBetweenDates() {
    const filteredClicks: Clicks = {};
    Object.keys(this.clicks).forEach((key) => {
      const filteredDates: Date[] = this.clicks[key].filter(
        (date) =>
          isBefore(new Date(date), this.endDate) &&
          isAfter(new Date(date), this.startDate)
      );
      if (filteredDates.length !== 0) filteredClicks[key] = filteredDates;
    });
    return filteredClicks;
  }

  get totalClicks() {
    let total: number = 0;
    Object.values(this.clicksBetweenDates).map(
      (keyArray) => (total += keyArray.length)
    );
    return total;
  }

  get clicksCountPerKey() {
    return Object.entries(this.clicksBetweenDates).reduce<{
      [index: string]: number;
    }>((acc, curr) => {
      acc[curr[0]] = curr[1].length;
      return acc;
    }, {});
  }

  get flattenedClicks() {
    const flattenedClicks: [string, Date][] = [];
    Object.keys(this.clicks).forEach((key) =>
      this.clicks[key].forEach((date) =>
        flattenedClicks.push([key, new Date(date)])
      )
    );
    return flattenedClicks;
  }
}
</script>

<style>
.box {
  @apply p-1 m-1 border border-black shadow;
}
</style>
