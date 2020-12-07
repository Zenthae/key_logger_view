<template>
  <div>
    Home Page, go to
    <nuxt-link to="components"><code>'/components'</code></nuxt-link> to see
    test the different components.
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class App extends Vue {}
</script>
