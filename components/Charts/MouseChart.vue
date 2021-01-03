<template>
  <div class="text-center">
    {{ $t('mouse_chart') }}
    <calendar-chart :data="mouseClicks" />
  </div>
</template>

<script lang="ts">
import pick from 'lodash/pick';
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
