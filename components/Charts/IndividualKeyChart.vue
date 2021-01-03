<template>
  <div>
    <chart-base
      id="individual-key"
      :data="{ json: { ...individualKeyClicks } }"
      :zoom="true"
      type="bar"
    />
  </div>
</template>

<script lang="ts">
import { omit, orderBy, reduce } from 'lodash';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

type Data = { [index: string]: number };

interface ToArray extends Array<{ key: string; values: Date[] }> {}

@Component
export default class IndividualKey extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Clicks;

  get individualKeyClicks(): Data {
    const data: Clicks = omit(this.data, [
      'LeftClick',
      'MiddleClick',
      'RightClick',
    ]);

    const toArray = reduce<Clicks, ToArray>(
      data,
      (prev, curr, key) => {
        prev.push({ key, values: curr });
        return prev;
      },
      [],
    );

    const sorted = orderBy(toArray, [(o) => o.values.length], 'desc');

    return reduce(
      sorted,
      (prev: Data, curr) => {
        prev[curr.key] = curr.values.length;
        return prev;
      },
      {},
    );
  }
}
</script>

<style>
#individual-key g.tick text {
  display: none !important;
}

#individual-key .c3-chart-bar:nth-child(odd) .c3-bar-0 {
  /* transform: translate(-5px, 0); */

  /* transform: scaleX(2); */
}

#individual-key .c3-chart-bar:nth-child(even) .c3-bar-0 {
  /* transform: translate(5px, 0); */

  /* transform: scale(0.99, 1); */
}
</style>
