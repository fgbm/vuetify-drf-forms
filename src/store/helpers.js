import Vue from 'vue';

export function checkEndpoint(state, endpoint) {
  if (!(endpoint in state)) {
    Vue.set(state, endpoint, {});
  }
}
