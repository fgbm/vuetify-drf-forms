<!--suppress NpmUsedModulesInstalled -->
<template>
  <div>
    <slot v-if="!isHidden" />
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'CField',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      endpoint: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      hiddenIfEmpty: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters('vietify-drf-forms', ['getVuetifyField', 'getRecord', 'isSuccess', 'getOptions']),
      isHidden() {
        return this.hiddenIfEmpty === true &&
          (!Object.hasOwnProperty.call(this.record, this.field) || this.record[this.field] === null);
      },
      record() {
        return this.getRecord(this.endpoint);
      },
      options(){
        return this.getOptions(this.endpoint);
      }
    },
    methods: mapMutations('vietify-drf-forms', ['setRecordField'])
  };
</script>
