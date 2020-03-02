<!--suppress NpmUsedModulesInstalled -->
<template>
  <div>
    <slot v-if="!isHidden" />
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapState} from 'vuex';

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
      ...mapGetters('vuetify_drf_forms', [
        'getVuetifyField'
      ]),
      ...mapState('vuetify_drf_forms', {
        record: function(state) {
          return state[this.endpoint].record;
        },
        options: function(state) {
          return state[this.endpoint].options;
        }
      }),
      isHidden() {
        return this.hiddenIfEmpty === true &&
            (!Object.hasOwnProperty.call(this.record, this.field) || this.record[this.field] === null);
      }
    },
    methods: mapMutations('vuetify_drf_forms', ['setRecordField'])
  };
</script>
