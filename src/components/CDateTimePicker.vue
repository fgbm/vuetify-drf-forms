<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-datetime-picker
          :disabled="disabled || (field in options && options[field].read_only)"
          :readonly="readonly"
          :value="record[field]"
          :date-picker-props="{':first-day-of-week': 1}"
          clear-text="Очистить"
          ok-text="Применить"
          v-bind="{...getVuetifyField({endpoint, field}), ...textFieldProps}"
          @input="setRecordField({endpoint, field, value: $event})"
  >
    <template slot="dateIcon">
      <v-icon v-text="mdiCalendar" />
    </template>
    <template slot="timeIcon">
      <v-icon v-text="mdiClock" />
    </template>
  </v-datetime-picker>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from './CField';
  import {mdiCalendar} from '@mdi/js';
  import {mdiClock} from '@mdi/js';

  export default {
    name: 'CDateTimePicker',
    mixins: [CField],
    props: {
      textFieldProps: {
        type: Object,
        default: null
      }
    },
    data: () => ({
      mdiCalendar,
      mdiClock
    })
  };
</script>

