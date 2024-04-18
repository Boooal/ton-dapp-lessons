import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";
import { Address } from "ton-core";

import { MainContract } from "../../contracts/MainContract.ts";

export async function useTonClient() {
    const endpoint = await getHttpEndpoint({network: "testnet"});
    console.log('endpoint', endpoint);
    return new TonClient({endpoint});
}

export async function getOpenContract() {
    const client = await useTonClient();
    if (!client) return;
    const contract = new MainContract(
        Address.parse('kQAUf3sJTAJJqV7h-iN7yXnhcu-bzbniOKWb-6r2gaRO1_HE')
    );
    return client.open(contract);
}

