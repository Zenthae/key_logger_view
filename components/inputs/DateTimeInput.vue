<template>
  <div class="p-1 border border-black">
    <input
      type="date"
      class="px-1 border border-black"
      :value="toYYYMMDD(value)"
      @change="updateDate($event.target)"
    />
    <input
      type="time"
      class="px-1 border border-black"
      :value="toHHMM(value)"
      @input="updateTime($event.target)"
    />
    <button v-if="false" class="px-1 border border-black" @click="reset">
      {{ $t('reset') }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator';

@Component
export default class DateTimeInput extends Vue {
  // Value of the date input
  @Prop({ type: Date, default: () => new Date() }) readonly value!: Date;
  // Temp data, used to update date and time separately
  date: Date = this.value;

  /**
   * Required to syncronize the internal date used to concate the date and the time if the value changed outside this
   * component.
   */
  @Watch('value')
  updateTempDate() {
    this.date = this.value;
  }

  updateDate(target: HTMLInputElement) {
    const newValue = target.valueAsDate;
    this.date = this.$dateFns.set(this.date, {
      year: newValue?.getUTCFullYear(),
      month: newValue?.getUTCMonth(),
      date: newValue?.getUTCDate(),
    });
    this.updateValue();
  }

  updateTime(target: HTMLInputElement) {
    const newValue = target.valueAsDate;

    this.date = this.$dateFns.set(this.date, {
      hours: newValue?.getUTCHours(),
      minutes: newValue?.getUTCMinutes(),
    });
    this.updateValue();
  }

  toYYYMMDD(date: Date): string {
    return this.$dateFns.format(date, 'yyyy-MM-dd');
  }

  toHHMM(date: Date): string {
    return this.$dateFns.format(date, 'HH:mm');
  }

  reset() {
    this.date = new Date();
    this.updateValue();
  }

  @Emit('input')
  updateValue() {
    return this.date;
  }
}
</script>
