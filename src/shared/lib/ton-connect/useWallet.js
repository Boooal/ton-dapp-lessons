import { TonConnectUI } from '@tonconnect/ui'

export function useWallet() {
    const tonConnectUI = new TonConnectUI({
        manifestUrl: 'https://alievdenis1.github.io/nutritiolntime/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-button',
        language: 'ru'
    });

    // const unsubscribe = tonConnectUI.onStatusChange(walletInfo => {
    //     const friendlyWalletAddress = walletInfo?.account?.address ? toUserFriendlyAddress(walletInfo.account.address) : ''
    //     const sessionStore = useSessionStore()
    //     sessionStore.walletAddress = friendlyWalletAddress
    //     sessionStore.setWalletAddress(friendlyWalletAddress)
    //     sessionStore.setWalletInfo(walletInfo)
    //     sessionStore.setAuthorized(true)
    // })
    //
    // return { unsubscribe }
}