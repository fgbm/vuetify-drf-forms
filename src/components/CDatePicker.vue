<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="closeOnClick"
          transition="scale-transition"
          offset-y
          min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
              :disabled="disabled || (field in options && options[field].read_only)"
              :readonly="readonly"
              :value="record[field]"
              v-bind="{...getVuetifyField({endpoint, field}), ...textFieldProps}"
              v-on="on"
              @change="setDate"
      />
    </template>
    <v-date-picker
            ref="picker"
            no-title
            :value="record[field]"
            min="1950-01-01"
            v-bind="datePickerProps"
            :first-day-of-week="1"
            @input="setDate"
    />
  </v-menu>
</template>

<!--suppress NpmUsedModulesInstalled, JSCheckFunctionSignatures -->
<script>
  import CField from './CField';
  import {mdiCalendar} from '@mdi/js';

  export default {
    name: 'CDatePicker',
    mixins: [CField],
    props: {
      textFieldProps: {
        type: Object,
        default() {
          return {
            'prepend-icon': mdiCalendar
          };
        }
      },
      datePickerProps: {
        type: Object,
        default: null
      },
      maxNow: {
        type: Boolean,
        default: false
      },
      closeOnClick: {
        type: Boolean,
        default: false
      },
      birthday: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menu: false
      };
    },
    watch: {
      menu(val) {
        this.birthday && val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      }
    },
    mounted() {
      if (this.maxNow) {
        this.datePickerProps = {...this.datePickerProps, max: new Date().toISOString().substr(0, 10)};
      }
    },
    methods: {
      setDate(value) {
        this.setRecordField({endpoint: this.endpoint, field: this.field, value: value});
        this.menu = false;
      }
    }
  };
</script>

