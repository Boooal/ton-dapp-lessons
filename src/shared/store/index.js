import {createStore} from "vuex";

import {walletStore} from "./wallet-store/index.js";
import {mainContractStore} from "./main-contract-store/index.js";

export default createStore({
    modules: {
        wallet: walletStore,
        mainContract: mainContractStore,
    }
});