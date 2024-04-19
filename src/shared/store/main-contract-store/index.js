import {getHttpEndpoint} from "@orbs-network/ton-access";
import {TonClient} from "ton";
import {MainContract} from "@/shared/contracts/MainContract.ts";
import {Address} from "ton-core";

const contractAddress = 'kQAUf3sJTAJJqV7h-iN7yXnhcu-bzbniOKWb-6r2gaRO1_HE';

export const mainContractStore = {
    namespaced: true,

    state: () => ({
        tonClient: null,
        mainContract: null,
    }),

    getters: {

        getOpenContract(state) {
            if (!state.tonClient && !state.mainContract) return
            return state.mainContract;
        }
    },

    mutations: {

        setTonClient(state, tonClient) {
            state.tonClient = tonClient;
        },

        setMainContract(state, mainContract) {
            state.mainContract = mainContract;
        }

    },

    actions: {

        async initTonClient(context) {
            const endpoint = await getHttpEndpoint({network: "testnet"});
            const tonClient = new TonClient({endpoint});
            context.commit('setTonClient', tonClient);
            if (tonClient) {
                const contract = new MainContract(Address.parse(contractAddress));
                context.commit("setMainContract", tonClient.open(contract));
            }
        }
    },

}