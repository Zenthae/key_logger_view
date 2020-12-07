<template>
  <th :scope="scope">{{ value }}</th>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class TableHeaderCell extends Vue {
  // Value of the th
  @Prop({ type: String, required: true }) readonly value!: string;
  // Scope of the th
  @Prop({ type: String }) readonly scope!: string;
}
</script>
