import axios from '@/plugins/axios'

const albums = {
    namespaced: true,
    state() {
        return {
            loading: true,
            list: []
        };
    },
    mutations: {
        setLoading(state,data){
            state.loading =  data;
        },
        setPostComments(state,data){
            state.list = data
        }
    },
    actions: {
        async getPostComments({commit},data) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`/posts/${data}/comments`);
                commit('setPostComments', response.data)
                commit('setLoading', false)
            } catch (err) {
                console.log(err.message)
                commit('setLoading', false)
            }
        }
    }
};

export default albums;