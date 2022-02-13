import Vue from 'vue';
import Vuex from 'vuex';
import {
    apiLogin,
    // apiLogout
} from '@/api/user'
// import { setToken } from '@/utils/auth'
// import { apiSelectWallet } from "@/api/wallet";

Vue.use(Vuex)

const actions = {
    login({ commit }, value) {
        const { username, password } = value
        return new Promise((resolve, reject) => {
            apiLogin({ userid: username.trim(), password: password }).then(response => {
                const { data } = response
                if (data) {
                    commit("SET_USER", data)
                    sessionStorage.setItem('user', JSON.stringify(data))

                } else {
                    reject()
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout(context) {
        context.commit("SET_USER", '')
        sessionStorage.removeItem('user')
    },
    walletUp({ commit }, value) {
        commit("SET_WALLET_UP", value)
    },
    walletDown({ commit }, value) {
        commit("SET_WALLET_DOWN", value)
    } ,
}

const mutations = {
    SET_USER: (state, value) => {
        state.user = value
    },
    SET_WALLET_UP: (state, value) => {
        state.user.userAmount += value
    },
    SET_WALLET_DOWN: (state, value) => {
        state.user.userAmount -= value
    },
}

const state = {
    user: JSON.parse(window.sessionStorage.getItem('user')),
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})