<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-checkbox
          :disabled="disabled || (field in options && options[field].read_only)"
          :readonly="readonly"
          :value="record[field]"
          v-bind="{...getVuetifyField({endpoint, field}), ...checkboxProps}"
          @change="setRecordField({endpoint, field, value: $event === true})"
  />
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from '@/components/CField';

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

