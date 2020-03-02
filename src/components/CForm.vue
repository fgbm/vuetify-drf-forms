<!--suppress NpmUsedModulesInstalled -->
<script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'CForm',
    props: {
      id: {
        type: Number,
        default: -1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      initial: {
        type: Object,
        default: undefined
      }
    },
    data: () => ({
      endpoint: String
    }),
    computed: {
      ...mapGetters('vuetify_drf_forms', [
        'getVuetifyField'
      ]),
      ...mapState('vuetify_drf_forms', {
        record: state => state[this.endpoint].record
      })
    },
    created() {
      this.defaults(this.endpoint);
      if (this.id > 0) {
        // noinspection JSValidateTypes
        this.fetchRecordById({endpoint: this.endpoint, id: this.id});
      }
      for (let field in this.initial) {
        if (Object.hasOwnProperty.call(this.initial, field)) {
          this.setRecordField({endpoint: this.endpoint, field: field, value: this.initial[field]});
        }
      }
    },
    methods: {
      ...mapMutations('vuetify_drf_forms', [
        'setRecordField'
      ]),
      ...mapActions('vuetify_drf_forms', [
        'fetchRecordById',
        'defaults'
      ])
    }
  };
</script>
