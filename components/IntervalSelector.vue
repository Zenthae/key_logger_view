<template>
  <div>
    <h2 class="px-8 py-1 text-xl text-white bg-green-400">
      {{ $t('date_range') }}
    </h2>
    <div class="px-2">
      <label>{{ $t('from') }}</label>
      <date-time-input v-model="interval.startDate" />
      <label>{{ $t('to') }}</label>
      <date-time-input v-model="interval.endDate" />
    </div>
    <div class="flex flex-col">
      <button class="btn" @click="allTime">{{ $t('all_time') }}</button>
      <button class="btn" @click="today">{{ $t('today') }}</button>
      <button class="btn" @click="yesterday">{{ $t('yesterday') }}</button>
      <button class="btn" @click="lastWeek">{{ $t('last_week') }}</button>
      <button class="btn" @click="lastMonth">{{ $t('last_month') }}</button>
      <button class="btn" @click="lastYear">{{ $t('last_year') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Interval } from '~/types';

@Component
export default class IntervalSelector extends Vue {
  // @Prop({ type: Date, required: true })
  // readonly startDate!: Date;

  // @Prop({ type: Date, required: true })
  // readonly endDate!: Date;

  @Prop({ type: Object, required: true })
  readonly interval!: Interval;

  allTime() {
    this.interval.startDate = new Date(this.$dateFns.minTime);
    this.interval.endDate = new Date(this.$dateFns.maxTime);
  }

  today() {
    this.interval.startDate = this.$dateFns.startOfDay(new Date());
    this.interval.endDate = this.$dateFns.endOfDay(new Date());
  }

  yesterday() {
    this.interval.startDate = this.$dateFns.startOfYesterday();
    this.interval.endDate = this.$dateFns.endOfYesterday();
  }

  lastWeek() {
    this.interval.startDate = this.$dateFns.subWeeks(
      this.$dateFns.startOfWeek(new Date(), {
        weekStartsOn: 1,
      }),
      1,
    );
    this.interval.endDate = this.$dateFns.subWeeks(
      this.$dateFns.endOfWeek(new Date(), {
        weekStartsOn: 1,
      }),
      1,
    );
  }

  lastMonth() {
    this.interval.startDate = this.$dateFns.subMonths(
      this.$dateFns.startOfMonth(new Date()),
      1,
    );
    this.interval.endDate = this.$dateFns.subMonths(
      this.$dateFns.endOfMonth(new Date()),
      1,
    );
  }

  lastYear() {
    this.interval.startDate = this.$dateFns.subYears(
      this.$dateFns.startOfYear(new Date()),
      1,
    );
    this.interval.endDate = this.$dateFns.subYears(
      this.$dateFns.endOfYear(new Date()),
      1,
    );
  }
}
</script>

<style>
.btn {
  @apply py-2;
}
</style>
