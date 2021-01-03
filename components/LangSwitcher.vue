<template>
  <select
    id="lang-select"
    name="language"
    @change="switchLocal($event.target.value)"
  >
    <option
      v-for="local in availableLocales"
      :key="local.code"
      :value="local.code"
      :selected="local.code === $i18n.locale"
    >
      {{ local.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { NuxtVueI18n } from 'nuxt-i18n/types';
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class LangSwitcher extends Vue {
  get availableLocales() {
    return this.$i18n.locales as NuxtVueI18n.Options.LocaleObject[];
  }

  switchLocal(event: any) {
    this.$router.push(this.switchLocalePath(event));
  }
}
</script>
