<template>
  <input
    type="date"
    class="px-1 border border-black"
    :value="toYYYYMMDD(value)"
    @change="updateValue($event.target)"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class DateInput extends Vue {
  // Value of the date input
  @Prop({ type: Date, default: () => new Date() }) readonly value!: Date;

  // Must Emit on 'input' event else v-model won't work
  @Emit('input')
  updateValue(target: HTMLInputElement) {
    return target.valueAsDate;
  }

  toYYYYMMDD(date: Date) {
    return date.toISOString().split('T')[0];
  }
}
</script>
