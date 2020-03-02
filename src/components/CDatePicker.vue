<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <!--  <v-text-field-->
  <!--    :disabled="disabled || (field in options && options[field].read_only)"-->
  <!--    :readonly="readonly"-->
  <!--    :value="record[field]"-->
  <!--    v-bind="{...getVuetifyField({endpoint, field}), ...textFieldProps}"-->
  <!--    @input="setRecordField({endpoint, field, value: $event})"-->
  <!--  />-->
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
              @update="setRecordField({endpoint, field, value: $event})"
      />
    </template>
    <DatetimePicker
            ref="picker"
            :value="record[field]"
            min="1950-01-01"
            v-bind="datePickerProps"
            @change="setRecordField({endpoint, field, value: $event})"
    />
  </v-menu>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from '@/components/CField';
  import DatetimePicker from 'vuetify-datetime-picker';
  import {mdiCalendar} from '@mdi/js';

  export default {
    name: 'CDatePicker',
    mixins: [CField],
    components: {DatetimePicker},
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
      }
    },
    data() {
      return {
        menu: false
      };
    },
    mounted() {
      if (this.maxNow) {
        this.datePickerProps = {...this.datePickerProps, max: new Date().toISOString().substr(0, 10)};
      }
    }
  };
</script>

