import { TonConnectUI } from '@tonconnect/ui'

export function useWallet() {
    return new TonConnectUI({
        manifestUrl: 'https://raw.githubusercontent.com/Boooal/ton-dapp-lessons/main/public/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-button',
        language: 'ru'
    });
}

export  async function getSender(tonConnectUI) {
    return {
        sender: {
            send: async (args) => {
                await tonConnectUI.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc().toString("base64"),
                        },
                    ],
                    validUntil: Date.now() + 5*60*1000, // 5 minutes for user to approve
                });
            }
        }
    }
}


