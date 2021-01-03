<template>
  <label class="inline-block cursor-pointer">
    <input
      type="file"
      class="hidden"
      :accept="fileType"
      @change="updateValue($event.target)"
    />
    {{ $t('choose_file') }}
  </label>
</template>

<script lang="ts">
import { forEach } from 'lodash';
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

@Component
export default class fileInput extends Vue {
  // Type of files that are accepted. (extension)
  @Prop({ type: String, required: true }) readonly fileType!: string;
  // The value of the file input
  @Prop({ type: Object, required: true }) readonly value!: Object;

  @Emit('input')
  updateValue(target: HTMLInputElement) {
    const file = target.files![0];
    if (file)
      return file.text().then((content) => {
        const data: Clicks = JSON.parse(content);
        const sortedKEys = Object.keys(data).sort();

        const sorted = sortedKEys.reduce<Clicks>((obj, curr) => {
          obj[curr] = data[curr].sort((a, b) => {
            return new Date(a).getTime() - new Date(b).getTime();
          });
          return obj;
        }, {});

        // Transform dates in string format to date object
        forEach(sorted, (dates) =>
          forEach(
            dates,
            (date, index, collection) => (collection[index] = new Date(date)),
          ),
        );

        return sorted;
      });
    return this.value;
  }
}
</script>
