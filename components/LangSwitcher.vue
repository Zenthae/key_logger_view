<template>
  <div>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</nuxt-link
    >
  </div>
</template>

<script lang="ts">
import { NuxtVueI18n } from 'nuxt-i18n/types';
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class LangSwitcher extends Vue {
  get availableLocales() {
    return (this.$i18n.locales as NuxtVueI18n.Options.LocaleObject[]).filter(
      (i) => i.code !== this.$i18n.locale,
    );
  }
}
</script>
