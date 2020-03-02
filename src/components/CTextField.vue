<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-text-field
    :disabled="disabled || (field in options && options[field].read_only)"
    :readonly="readonly"
    :value="record[field]"
    v-bind="{...getVuetifyField({endpoint, field}), ...textFieldProps}"
    @input="setRecordField({endpoint, field, value: $event})"
  />
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from './CField';

  export default {
    name: 'CTextField',
    mixins: [CField],
    props: {
      textFieldProps: {
        type: Object,
        default: null
      }
    }
  };
</script>

