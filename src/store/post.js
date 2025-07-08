import axios from '@/plugins/axios'

const post = {
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
        setUserPosts(state,data){
            state.list = data
        }
    },
    actions: {
        async getUserPosts({commit},data) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`/posts`,{
                    params:{
                        userId: data
                    }
                });
                commit('setUserPosts', response.data)
                commit('setLoading', false)
            } catch (err) {
                console.log(err.message)
                commit('setLoading', false)
            }
        },
        async addPost({dispatch},data) {
            try {
                const response = await axios.post(`/posts`,{
                    title: data.title,
                    body: data.body,
                    userId: data.user_id
                });
                if(response){
                    dispatch('getUserPosts',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async updatePost({dispatch},data){
            console.log(data)
            try {
                const response = await axios.put(`/posts/${data.id}`,{
                    body: data.body,
                    userId: data.user_id,
                    title: data.title
                });
                if(response){
                    dispatch('getUserPosts',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async deletePost({dispatch},data){
            try {
                const response = await axios.delete(`/posts/${data.id}`);
                if(response){
                    dispatch('getUserPosts',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },

    }
};

export default post;