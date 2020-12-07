<template>
  <label :for="value">
    <input
      type="radio"
      :name="name"
      :value="value"
      @change="updateValue($event.target)"
    />
    {{ value }}
  </label>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class RadioInput extends Vue {
  // Name of the group
  @Prop({ type: String, required: true }) readonly name!: string;
  // value of the radio button
  @Prop({ type: String, required: true }) readonly value!: string;

  @Emit('input')
  updateValue(target: HTMLInputElement) {
    return target.value;
  }
}
</script>
