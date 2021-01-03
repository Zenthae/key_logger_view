<template>
  <calendar-chart :data="mouseClicks" />
</template>

<script lang="ts">
import { pick } from 'lodash';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

@Component
export default class MouseChart extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Clicks;

  get mouseClicks(): Clicks {
    return pick(this.data, ['LeftClick', 'MiddleClick', 'RightClick']);
  }
}
</script>
