<template>
  <div class="text-right">
    <button
      class="p-2 text-gray-700 bg-white border border-black rounded"
      @click="goBack"
    >
      <svg width="24" height="24" viewBox="0 0 16 16" class="inline">
        <path
          d="M9 4 L5 8 L9 12"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
      <span class="my-1">{{ $t('back') }}</span>
    </button>
    <ChartBase
      :data="{
        columns: [graphValues.data],
        onclick: onClick,
      }"
      :categories="graphValues.categories"
      :type="'bar'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import defaults from 'lodash/defaults';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { DataPoint } from 'c3';
import { Clicks } from '~/types';
import { isBetween } from '~/helpers';

type GraphValues = {
  data?: [string | number, ...number[]];
  categories?: string[];
};

type FilteredDataByDate = { [index: number]: number };

@Component
export default class CalendarChart extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Clicks;

  date: number[] = [];

  /**
   * Return the selected year
   */
  get year(): number {
    return this.date[0];
  }

  /**
   * Return the selected mounth
   */
  get month(): number {
    return this.date[1];
  }

  /**
   * Return the selected day
   */
  get day(): number {
    return this.date[2];
  }

  /**
   * Return the selected hour
   */
  get hour(): number {
    return this.date[3];
  }

  /**
   * Function fired when a bar is clicked.
   *
   */
  onClick(d: DataPoint) {
    // Return when the last sub array get selected
    // return if minute already selected
    if (this.date.length >= 4) return;

    const v = this.graphValues.categories![d.x];

    // When selecting a moutn, directly pushing the month index because it's displayed in "MMM" format
    // and it start at 0 (0-11: Jan-Dec)
    if (this.date.length === 1) this.date.push(d.x);
    // parsing the category of the column when not selecting a month
    else this.date.push(parseInt(v));
  }

  /**
   * Allow the user to go back by one level.
   *
   * Order : _year < month < day < hour < minute_
   */
  goBack(): void {
    if (this.date.length > 0) this.date.pop();
    this.$emit('goBack', this.date);
  }

  /**
   * Return the values displayed on the graph depending on wihch date (sub array) is selected
   */
  get graphValues(): GraphValues {
    switch (this.date.length) {
      case 0:
        // Years
        return {
          data: [`${this.$t('total')}`, ...Object.values(this.yearlyData)],
          categories: Object.keys(this.yearlyData),
        };
      case 1:
        // Months
        return {
          data: [`${this.year}`, ...Object.values(this.monthlyData)],
          categories: Object.keys(this.monthlyData).map((v) =>
            this.$dateFns.format(
              new Date(this.year, parseInt(v)), // Don't need to add 1 because the constructor of date start at 0 for months
              'MMM',
            ),
          ),
        };
      case 2:
        // Days
        return {
          data: [
            `${this.year}-${this.month + 1}`,
            ...Object.values(this.dailyData).slice(
              1,
              Object.values(this.dailyData).length,
            ),
          ],
          categories: Object.keys(this.dailyData).slice(
            1,
            Object.keys(this.dailyData).length,
          ),
        };
      case 3:
        // Hours
        return {
          data: [
            `${this.year}-${this.month + 1}-${this.day}`,
            ...Object.values(this.hourlyData),
          ],
          categories: Object.keys(this.hourlyData),
        };
      case 4:
        // Minutes
        return {
          data: [
            `${this.year}-${this.month + 1}-${this.day}:${this.hour}h`,
            ...Object.values(this.minuteData),
          ],
          categories: Object.keys(this.minuteData),
        };
      default:
        // When their is an error
        return { data: ['null'], categories: [] };
    }
  }

  /**
   * Return the data filtered by years
   */
  get yearlyData(): FilteredDataByDate {
    return reduce<Clicks, FilteredDataByDate>(
      this.data,
      (prev, curr) => {
        forEach(curr, (v) => {
          const year = this.$dateFns.getYear(v);
          prev[year] = (prev[year] | 0) + 1;
        });
        return prev;
      },
      {},
    );
  }

  /**
   * Return the data filtered by months (of the selected year)
   */
  get monthlyData(): FilteredDataByDate {
    const values = reduce<Clicks, FilteredDataByDate>(
      this.data,
      (prev, curr) => {
        forEach(curr, (v) => {
          const startOfYear = this.$dateFns.startOfYear(new Date(this.year, 0));
          const endOfYear = this.$dateFns.endOfYear(new Date(this.year, 0));
          if (isBetween(v, startOfYear, endOfYear)) {
            const month = this.$dateFns.getMonth(v); //  months start at 0 !!!
            prev[month] = (prev[month] | 0) + 1;
          }
        });
        return prev;
      },
      {},
    );
    return defaults(values, Array(12).fill(null));
  }

  /**
   * Return the data filtered by day (of the selected month)
   */
  get dailyData(): FilteredDataByDate {
    const values = reduce<Clicks, FilteredDataByDate>(
      this.data,
      (prev, curr) => {
        forEach(curr, (v) => {
          const startOfMonth = this.$dateFns.startOfMonth(
            new Date(this.year, this.month),
          );
          const endOfMonth = this.$dateFns.endOfMonth(
            new Date(this.year, this.month),
          );
          if (isBetween(v, startOfMonth, endOfMonth)) {
            const day = this.$dateFns.getDate(v); //  days start at 1 !!!
            prev[day] = (prev[day] | 0) + 1;
          }
        });
        return prev;
      },
      {},
    );
    return defaults(
      values,
      Array(
        this.$dateFns.getDaysInMonth(new Date(this.year, this.month)) + 1, // Add 1 because months start at 1 when arrays start at 0
      ).fill(null),
    );
  }

  /**
   * Return the data filtered by hour (of the selected month)
   */
  get hourlyData(): FilteredDataByDate {
    const values = reduce<Clicks, FilteredDataByDate>(
      this.data,
      (prev, curr) => {
        forEach(curr, (v) => {
          const startOfDay = this.$dateFns.startOfDay(
            new Date(this.year, this.month, this.day),
          );
          const endOfDay = this.$dateFns.endOfDay(
            new Date(this.year, this.month, this.day),
          );
          if (isBetween(v, startOfDay, endOfDay)) {
            const hour = this.$dateFns.getHours(v);
            prev[hour] = (prev[hour] | 0) + 1;
          }
        });
        return prev;
      },
      {},
    );
    return defaults(values, Array(24).fill(null));
  }

  /**
   * Return the data filtered by minutes (of the selected hour)
   */
  get minuteData(): FilteredDataByDate {
    const values = reduce<Clicks, FilteredDataByDate>(
      this.data,
      (prev, curr) => {
        forEach(curr, (v) => {
          // Start of the selected hour
          const start = this.$dateFns.startOfHour(
            new Date(this.year, this.month, this.day, this.hour),
          );

          // End of the selected hour
          const end = this.$dateFns.endOfHour(
            new Date(this.year, this.month, this.day, this.hour),
          );

          // If the current date (v) is between the selected hour (start - end)
          // + 1 to the corresponding minute
          if (isBetween(v, start, end)) {
            const time = this.$dateFns.getMinutes(v);
            prev[time] = (prev[time] | 0) + 1;
          }
        });
        return prev;
      },
      {},
    );
    return defaults(values, Array(60).fill(null));
  }
}
</script>
