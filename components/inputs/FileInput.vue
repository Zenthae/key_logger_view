<template>
  <label class="inline-block cursor-pointer">
    <input
      type="file"
      class="hidden"
      :accept="fileType"
      @change="updateValue($event.target)"
    />
    Choose a file
  </label>
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Vue } from 'nuxt-property-decorator';

@Component
export default class fileInput extends Vue {
  // Type of files that are accepted. (extension)
  @Prop({ type: String, required: true }) readonly fileType!: string;
  // The value of the file input
  @Prop({ type: Object, required: true }) readonly value!: Object;

  @Emit('input')
  updateValue(target: HTMLInputElement) {
    const file = target.files![0];
    if (file) return file.text().then((content) => JSON.parse(content));
    return this.value;
  }
}
</script>
