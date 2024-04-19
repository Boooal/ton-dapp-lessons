<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {Address, fromNano, toNano} from "ton-core";
import WebApp from "@twa-dev/sdk";

const contractData = ref(null);
const contractAddress = ref(null);
const contractBalance = ref();
const updateContractDataInterval = ref()
const webApp = ref(WebApp);

const store = useStore();

const sender = computed(() => store.getters["wallet/getSender"]);
const connected = computed(() => store.getters["wallet/connected"]);
const contract = computed(() => store.getters["mainContract/getOpenContract"]);


function updateContractData() {
  if (!contract.value) return;

  clearInterval(updateContractDataInterval.value);
  setInterval(async () => {
    const val = await contract.value.getData();
    contractData.value = {
      counter_value: val.number,
      recent_sender: val.recent_sender,
      owner_address: val.owner_address,
    };
    contractAddress.value = Address.parseFriendly(contract.value.address.toString()).address;
    const balance = await contract.value.getBalance();
    if (balance.balance > 0) {
      contractBalance.value = fromNano(balance.balance)
    }
  }, 5000)
}


async function sendIncrement() {
  await contract.value?.sendIncrement(sender.value, toNano('0.05'), 5);
}

async function sendDeposit() {
  await contract.value?.sendDeposit(sender.value, toNano('0.111'));
}

async function sendWithdrawRequest() {
  await contract.value?.sendWithdrawalRequest(sender.value, toNano('0.05'), toNano('0.3'))
}

function showTelegramAlert() {
  WebApp.showAlert("hey here");
}

onMounted(async () => {
  await store.dispatch('wallet/initTonConnectUI');
  await store.dispatch('mainContract/initTonClient');
  updateContractData();
});


</script>

<template>
  <div class="app">

    <div class="wallet-button-wrap">
      <div id="ton-connect-button"></div>
    </div>


    <div class="main-contract-data">

      <p @click="showTelegramAlert">Platform {{ WebApp.platform }}</p>

      <div class="contract-data-title">Адрес контракта</div>
      <div class="contract-data-value">{{ contractAddress }}</div>

      <div class="contract-data-title">Баланс контракта</div>
      <div class="contract-data-value">{{ contractBalance }}</div>

      <div class="contract-data-title">Счетчик</div>
      <div class="contract-data-value">{{ contractData?.counter_value }}</div>

      <div class="contract-data-title">Последний отправитель</div>
      <div class="contract-data-value">{{ contractData?.recent_sender }}</div>

      <div class="contract-data-title">Адрес владельца</div>
      <div class="contract-data-value">{{ contractData?.owner_address }}</div>

    </div>

    <button
        v-if="connected"
        @click="sendIncrement"
        class="increment-button"
    >
      Increment by 5
    </button>

    <button
      v-if="connected"
      @click="sendDeposit"
      class="increment-button"
      >
      Send 0.111 TON
    </button>

    <button
      v-if="connected"
      @click="sendWithdrawRequest"
      class="increment-button"
      >
      Withdraw 0.3 TON
    </button>

  </div>

</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  background: #888888;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wallet-button-wrap {
  padding: 1rem;
}

.main-contract-data {
  font-family: "Arial", serif;
  font-weight: bold;
}

.contract-data-title {
  font-size: 1.5rem;
  color: aliceblue;
  text-align: center;
  padding: 1rem;
}

.contract-data-value {
  text-align: center;
}

.increment-button {
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 1rem;
}



</style>
