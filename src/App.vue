<script setup>
import {useWallet} from "./shared/lib/ton-connect/useWallet.js";
import {onMounted} from "vue";

onMounted(() => {
  useWallet();
})

</script>

<template>
  <div class="app">
    <div id="ton-connect-button" class="wallet-button"></div>
  </div>

</template>

<style scoped>
.app {
  height: 80vh;
  width: 80vw;
  background: #888888;
}

.wallet-button {
  padding: 1rem;
}
</style>
