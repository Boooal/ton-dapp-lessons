<script setup>
import {useWallet} from "./shared/lib/ton-connect/useWallet.js";
import {computed, onMounted, ref, watch} from "vue";
import {getOpenContract} from "./shared/lib/ton-client/tonClient.js";
import {fromNano, toNano} from "ton-core";

const openedContract = ref(null);
const contractData = ref(null);
const contractAddress = ref(null);
const contractBalance = ref();
const updateContractDataInterval = ref()
const wallet = ref();

async function sendIncrement() {
  return openedContract.value?.sendIncrement(sender, toNano('0.05'), 5);
}

const sender = computed(() => {
  return getSender(wallet);
})


onMounted(async () => {
  wallet.value = useWallet();
  openedContract.value = await getOpenContract();
});


watch(openedContract, async (newContract) => {
  if (!newContract) return;
  clearInterval(updateContractDataInterval.value);
  setInterval(async () => {
    const val = await newContract.getData();
    contractData.value = {
      counter_value: val.number,
      recent_sender: val.recent_sender,
      owner_address: val.owner_address,
    };
    contractAddress.value = newContract.address.toString();
    const balance = await newContract.getBalance();
    if (balance.balance > 0) {
      contractBalance.value = fromNano(balance.balance)
    }
  }, 5000);

})


</script>

<template>
  <div class="app">
    <div id="ton-connect-button" class="wallet-button"></div>
    <div v-if="contractAddress">{{ contractAddress }}</div>
    <div v-if="contractBalance">{{ contractBalance }}</div>
    <div v-if="contractData">
      <div>{{ contractData.counter_value }}</div>
      <div>{{ contractData.recent_sender }}</div>
      <div>{{ contractData.owner_address }}</div>
    </div>
    <button @click="sendIncrement">Increment</button>
    <button v-if="wallet?.connected">Increment wow</button>
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
