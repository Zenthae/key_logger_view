<template>
  <div>
    <FileInput v-model="fileContent" file-type=".json" />
    <DateInput v-model="date" />
    <RadioGroup v-model="letter" :values="['a', 'b']" name="letter" />
    <Table class="border-collapse table-auto">
      <TableHeader>
        <TableHeaderCell
          v-for="value in ['KeyCode', 'NbClicks']"
          :key="value"
          :value="value"
        />
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell
            v-for="value in ['1', '2']"
            :key="value"
            class="border"
          >
            {{ value }}
          </TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Clicks } from '~/types';

@Component
export default class components extends Vue {
  fileContent: Clicks = {};
  date: Date = new Date();
  letter: string = '';
}
</script>
