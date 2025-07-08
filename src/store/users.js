import axios from '@/plugins/axios'

const users = {
    namespaced: true,
    state() {
        return {
            loading: true,
            list: [],
            user: {}
        };
    },
    mutations: {
        setLoading(state,data){
          state.loading =  data;
        },
        setUserList(state,data){
          state.list = data
        },
        setUser(state,data){
          state.user = data
        }
    },
    actions: {
        async getUsers({commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get('/users');
                commit('setUserList', response.data)
                commit('setLoading', false)
            } catch (err) {
                console.log(err)
                commit('setLoading', false)
            }
        },
        async getUserDetail({commit},data) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`/users/${data}`);
                commit('setUser', response.data)
                commit('setLoading', false)
            } catch (err) {
                console.log(err)
                commit('setLoading', false)
            }
        },
    }
};

export default users;