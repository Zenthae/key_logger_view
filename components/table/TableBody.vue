<template>
  <tbody>
    <slot />
  </tbody>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TableBody extends Vue {}
</script>
