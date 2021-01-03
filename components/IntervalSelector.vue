<template>
  <div>
    <h2 class="px-8 py-1 text-xl text-white bg-green-400">
      {{ $t('date_range') }}
    </h2>
    <div class="px-2">
      <label>{{ $t('from') }}</label>
      <date-time-input v-model="startDate" />
      <label>{{ $t('to') }}</label>
      <date-time-input v-model="endDate" />
    </div>
    <div class="flex flex-col text-left">
      <button class="btn">{{ $t('all_time') }}</button>
      <button class="btn">{{ $t('today') }}</button>
      <button class="btn">{{ $t('yesterday') }}</button>
      <button class="btn">{{ $t('last_week') }}</button>
      <button class="btn">{{ $t('last_month') }}</button>
      <button class="btn">{{ $t('last_year') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class IntervalSelector extends Vue {
  @Prop({ type: Date, required: true })
  readonly startDate!: Date;

  @Prop({ type: Date, required: true })
  readonly endDate!: Date;
}
</script>

<style>
.btn {
  @apply py-2;
}
</style>
