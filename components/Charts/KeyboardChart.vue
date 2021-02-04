<template>
  <div class="text-center">
    {{ $t('keyboard_chart') }}
    <calendar-chart :data="keyboardClicks" />
  </div>
</template>

<script lang="ts">
import omit from 'lodash/omit';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

@Component
export default class KeyboardChart extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Clicks;

  get keyboardClicks(): Clicks {
    return omit(this.data, ['LeftClick', 'MiddleClick', 'RightClick']);
  }
}
</script>
