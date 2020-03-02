<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-textarea
    :disabled="disabled || (field in options && options[field].read_only)"
    :readonly="readonly"
    :value="record[field]"
    v-bind="{...getVuetifyField({endpoint, field}), ...textareaProps}"
    @input="setRecordField({endpoint, field, value: $event})"
  />
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from './CField';

  export default {
    name: 'CTextarea',
    mixins: [CField],
    props: {
      textareaProps: {
        type: Object,
        default: null
      }
    }
  };
</script>

