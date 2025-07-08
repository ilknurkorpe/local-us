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
        setUserAlbums(state,data){
            state.list = data
        }
    },
    actions: {
        async getUserAlbums({commit},data) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`/users/${data}/albums`);
                commit('setUserAlbums', response.data)
                commit('setLoading', false)
            } catch (err) {
                console.log(err.message)
                commit('setLoading', false)
            }
        },
        async addAlbum({dispatch},data) {
            try {
                const response = await axios.post(`/users/${data.user_id}/albums`,{
                    title: data.title
                });
                if(response){
                    dispatch('getUserAlbums',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async updateAlbum({dispatch},data){
            console.log(data)
            try {
                const response = await axios.put(`/users/${data.user_id}/albums/${data.id}`,{
                    title: data.title
                });
                if(response){
                    dispatch('getUserAlbums',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async deleteAlbum({dispatch},data){
            try {
                const response = await axios.delete(`/users/${data.user_id}/albums/${data.id}`);
                if(response){
                    dispatch('getUserAlbums',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },

    }
};

export default albums;