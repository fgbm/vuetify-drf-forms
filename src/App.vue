<template>
  <div id="app">
    <CCheckbox endpoint="ya.ru" field="name" />
  </div>
</template>

<script>
  import Vue from 'vue';
  import CCheckbox from '@/components/CCheckbox';

  Vue.use(CCheckbox);

  export default {
    name: 'App',
    components: {
      CCheckbox
    }
  };
</script>

