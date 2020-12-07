<template>
  <td>
    <slot />
  </td>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TableDataCell extends Vue {}
</script>
