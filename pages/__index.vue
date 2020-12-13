<template>
  <div>
    <file-input file-type=".json" @datachanged="dataChanged" />
    <bar :chart-data="chartData" :options="chartOptions" />
    <radio-group
      name="interval"
      :values="['all', 'day', 'week', 'month', 'year']"
    />
    <date-input v-model="startDate" />
    <date-input v-model="endDate" />
    <!-- <button @click="reroll">Reroll</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

type FlattenedClicks = [string, Date][];

@Component
export default class App extends Vue {
  // chartData: ChartData | null = null;
  clicks: Clicks = {};
  startDate: Date = new Date();
  endDate: Date = new Date();

  chartOptions = {
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
    responsive: true,
  };

  dataChanged(data: Clicks) {
    this.clicks = data;
  }

  beforeMount() {
    // Call Graph for the first time here.
    // this.reroll();
  }

  get chartData() {
    return {
      labels: this.filteredLabels,
      datasets: [{ label: '# of click', data: this.nbOfClick }],
    };
  }

  // values
  // Flatten the raw data to make it usable
  get flattenedClicks(): FlattenedClicks {
    const values: FlattenedClicks = [];
    for (const [key, value] of Object.entries(this.clicks)) {
      value.forEach((date) => values.push([key, new Date(date)]));
    }
    return values;
  }

  // a
  // Filter the flatted data by the specified startDate and endDate.
  get clicksBetweenDates(): FlattenedClicks {
    return this.flattenedClicks.filter((v) => {
      return v[1] >= this.startDate && v[1] <= this.endDate;
    });
  }

  // b
  // Return the labels (keycode) of the filtered data.
  get filteredLabels(): string[] {
    // return this.clicksBetweenDates
    //   .map((v) => v[0])
    //   .filter((v, i, self) => self.indexOf(v) === i);

    return Object.keys(this.formattedData);
  }

  // Format the flattened data back to {key: Date[]} format.
  get formattedData(): Clicks {
    return this.clicksBetweenDates.reduce(
      (acc: Clicks, curr: [string, Date]) => {
        if (acc[curr[0]] === undefined) {
          acc[curr[0]] = Array.from([curr[1]]);
        } else {
          acc[curr[0]].push(curr[1]);
        }
        return acc;
      },
      {}
    );
  }

  get nbOfClickByKeycode(): { [index: string]: number } {
    return Object.fromEntries(
      this.filteredLabels.map((key: string) => [
        key,
        this.formattedData[key].length,
      ])
    );
  }

  get nbOfClick(): number[] {
    const nbClick: number[] = [];
    for (const [key, value] of Object.entries(this.nbOfClickByKeycode)) {
      nbClick.push(value);
    }
    return nbClick;
  }

  // getRandomInt(): number {
  //   return Math.floor(Math.random() * 100);
  // }

  // reroll() {
  //   this.chartData = {
  //     labels: [
  //       'January',
  //       'February',
  //       'March',
  //       'April',
  //       'May',
  //       'June',
  //       'July',
  //       'August',
  //       'September',
  //       'October',
  //       'November',
  //       'December',
  //     ],
  //     datasets: [
  //       {
  //         label: 'GitHub Commits',
  //         backgroundColor: '#f87979',
  //         data: [
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //           this.getRandomInt(),
  //         ],
  //       },
  //     ],
  //   };
  // }
}
</script>
