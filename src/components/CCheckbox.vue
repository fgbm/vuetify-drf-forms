<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-checkbox
          :disabled="disabled || (field in options && options[field].read_only)"
          :readonly="readonly"
          :value="record[field]"
          :indeterminate="record[field] === null"
          v-bind="{...getVuetifyField({endpoint, field}), ...checkboxProps}"
          @change="setRecordField({endpoint, field, value: $event === true})"
  />
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from './CField';

  export default {
    name: 'CCheckbox',
    mixins: [CField],
    props: {
      checkboxProps: {
        type: Object,
        default: null
      }
    }
  };
</script>

