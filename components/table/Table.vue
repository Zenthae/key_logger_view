<template>
  <table>
    <slot />
  </table>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Table extends Vue {}
</script>
