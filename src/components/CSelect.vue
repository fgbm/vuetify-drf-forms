<!--
При использовании поля на типе данных choice, данные о доступных значениях берутся из API.
Для передачи параметров списка необходимо использовать параметр selectProps
-->
<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <v-select
    :disabled="disabled || (field in options && options[field].read_only)"
    :readonly="readonly"
    :value="record[field]"
    v-bind="{...getVuetifyField({endpoint, field}), ...selectProps}"
    @input="setRecordField({endpoint, field, value: $event})"
  />
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
  import CField from '@/components/CField';

  export default {
    name: 'CSelect',
    mixins: [CField],
    props: {
      selectProps: {
        type: Object,
        default: null
      }
    }
  };
</script>

