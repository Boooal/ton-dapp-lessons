import {TonConnectUI} from "@tonconnect/ui";
import {toNano} from "ton-core";

const manifestUrl = 'https://raw.githubusercontent.com/Boooal/ton-dapp-lessons/main/public/tonconnect-manifest.json';
const buttonRootId = 'ton-connect-button';
const language = 'ru'

export const walletStore = {
    namespaced: true,

    state: () => ({
        tonConnectUI: null,
        unsubscribe: null,
        connected: false,
        balance: toNano('0.00')
    }),

    getters: {

        getWallet: (state) => {
            return state.tonConnectUI
        },

        connected: (state) => {
            return state.connected;
        },

        getSender(state) {
            if (!state.tonConnectUI) return;
            return {
                send: async (args) => {
                    await state.tonConnectUI.sendTransaction({
                        messages: [
                            {
                                address: args.to.toString(),
                                amount: args.value.toString(),
                                payload: args.body?.toBoc().toString("base64"),
                            },
                        ],
                        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                    });
                }
            }
        },
    },
    mutations: {

        setTonConnectUI(state, tonConnectUI) {
            state.tonConnectUI = tonConnectUI;
        }

    },
    actions: {

        async initTonConnectUI(context) {
            const tonConnectUI = new TonConnectUI({
                manifestUrl,
                buttonRootId,
                language
            });

            context.commit('setTonConnectUI', tonConnectUI);

            if (context.state.unsubscribe) return;
            context.state.unsubscribe = tonConnectUI.onStatusChange(
                wallet => {
                    context.state.connected = context.state.tonConnectUI.connected;
                }
            );
        },


    },


}
