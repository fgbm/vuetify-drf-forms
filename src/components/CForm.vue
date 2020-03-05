<!--suppress NpmUsedModulesInstalled -->
<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

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
      ...mapGetters('vietify-drf-forms', ['getVuetifyField', 'getRecord', 'isSuccess']),
      record() {
        return this.getRecord(this.endpoint);
      },
      success() {
        return this.isSuccess(this.endpoint);
      }
    },
    watch: {
      id() {
        this.fetchData();
      }
    },
    created() {
      this.defaults(this.endpoint);
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      ...mapMutations('vietify-drf-forms', ['setRecordField']),
      ...mapActions('vietify-drf-forms', ['fetchRecordById', 'defaults']),
      fetchData() {
        if (this.id > 0) {
          // noinspection JSValidateTypes
          this.fetchRecordById({endpoint: this.endpoint, id: this.id});
        }
        for (let field in this.initial) {
          if (Object.hasOwnProperty.call(this.initial, field)) {
            this.setRecordField({endpoint: this.endpoint, field: field, value: this.initial[field]});
          }
        }
      }
    }
  };
</script>
