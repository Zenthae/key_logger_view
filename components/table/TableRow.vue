<template>
  <tr>
    <slot />
  </tr>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TableRow extends Vue {}
</script>
