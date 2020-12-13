<template>
  <thead>
    <tr>
      <slot />
    </tr>
  </thead>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TableHeader extends Vue {
  // // List of value
  // @Prop({ type: Array, required: true }) readonly values!: string[];
}
</script>
