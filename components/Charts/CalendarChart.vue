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
import { defaults, forEach, reduce } from 'lodash';
import { DataPoint } from 'c3';
import { Clicks } from '~/types';
import { isBetween } from '~/helpers';

type GraphValues = {
  data?: [string | number, ...number[]];
  categories?: (string | number)[];
};

type FilteredDataByDate = { [index: number]: number };

@Component
export default class MouseChart extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Clicks;

  date: number[] = [];

  get year(): number {
    return this.date[0];
  }

  get month(): number {
    return this.date[1];
  }

  get day(): number {
    return this.date[2];
  }

  onClick(d: DataPoint) {
    if (this.date.length >= 3) return; // return if hour already selected
    const v = this.graphValues.categories![d.x];
    if (this.date.length !== 1)
      // Because months name are displayed instead of index
      this.date.push(typeof v === 'string' ? parseInt(v) : v);
    else this.date.push(d.x);
  }

  get graphValues(): GraphValues {
    switch (this.date.length) {
      case 0: // Years
        return {
          data: [
            this.$t('total').toString(),
            ...Object.values(this.yearlyData),
          ],
          categories: Object.keys(this.yearlyData),
        };
      case 1: // Months
        return {
          data: [this.year.toString(), ...Object.values(this.monthlyData)],
          categories: Object.keys(this.monthlyData).map((v) =>
            this.$dateFns.format(
              new Date(this.year, parseInt(v)), // Don't need to add 1 because the constructor of date start at 0 for months
              'MMM',
            ),
          ),
        };
      case 2: // Days
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
      case 3: // Hours
        return {
          data: [
            `${this.year}-${this.month + 1}-${this.day}`,
            ...Object.values(this.hourlyData),
          ],
          categories: Object.keys(this.hourlyData),
        };
      default:
        return { data: ['null'], categories: [] };
    }
  }

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
            const hour = this.$dateFns.getHours(v); //  days start at 1 !!!
            prev[hour] = (prev[hour] | 0) + 1;
          }
        });
        return prev;
      },
      {},
    );
    return defaults(values, Array(24).fill(null));
  }

  goBack(): void {
    if (this.date.length > 0) this.date.pop();
    this.$emit('goBack', this.date);
  }
}
</script>
