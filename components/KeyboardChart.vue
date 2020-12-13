<template>
  <div class="text-center">
    <RadioGroup
      v-model="interval"
      name="intervalKeyboard"
      :values="['années', 'mois', 'semaines', 'jours']"
    />
    <div v-if="Object.keys(value).length !== 0">
      <Chart
        v-if="interval === 'années'"
        :data="{ json: { ...keyboardClicks } }"
        type="bar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { keys } from 'lodash';
import { Clicks, Interval } from '~/types';

@Component
export default class KeyboardChart extends Vue {
  @Prop({ type: Object, default: {} }) readonly value!: Clicks;

  interval: Interval = 'années';

  get keyboardClicks(): { [index: string]: number } {
    const final: { [index: string]: number } = {};
    keys(this.value).map((key) => {
      if (
        key !== 'LeftClick' &&
        key !== 'MiddleClick' &&
        key !== 'RightClick'
      ) {
        final[key] = this.value[key].length;
      }
    });
    return final;
  }
}
</script>
