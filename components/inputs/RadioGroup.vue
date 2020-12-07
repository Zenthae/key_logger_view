<template>
  <div>
    <radio-input
      v-for="value in values"
      :key="value"
      :name="name"
      :value="value"
      @input="updateValue($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class RadioGroup extends Vue {
  // Name of the group
  @Prop({ type: String, required: true }) readonly name!: string;
  // List of value used as radio buttons
  @Prop({ type: Array, required: true }) readonly values!: string[];
  // The selected value
  @Prop({ type: String, required: true }) readonly value!: string;
  // Legend displayed for the group
  // @Prop({ type: String }) readonly legend!: string;

  @Emit('input')
  updateValue(value: string) {
    return value;
  }
}
</script>
