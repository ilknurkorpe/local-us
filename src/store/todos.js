import axios from '@/plugins/axios'

const todos = {
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
        setUserTodos(state,data){
            state.list = data
        }
    },
    actions: {
        async getUserTodos({commit},data) {
            console.log(data)
            try {
                commit('setLoading', true)
                const response = await axios.get(`/users/${data}/todos`);
                commit('setUserTodos', response.data)
                commit('setLoading', false)
            } catch (err) {
                console.log(err.message)
                commit('setLoading', false)
            }
        },
        async addTodo({dispatch},data) {
            try {
                const response = await axios.post(`/users/${data.user_id}/todos`,{
                    title: data.title,
                    completed: data.completed
                });
                if(response){
                    dispatch('getUserTodos',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async updateTodo({dispatch},data){
            console.log(data)
            try {
                const response = await axios.put(`/users/${data.user_id}/todos/${data.id}`,{
                    title: data.title,
                    completed: data.completed
                });
                if(response){
                    dispatch('getUserTodos',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async deleteTodo({dispatch},data){
            try {
                const response = await axios.delete(`/users/${data.user_id}/todos/${data.id}`);
                if(response){
                    dispatch('getUserTodos',data.user_id)
                }
            } catch (err) {
                console.log(err.message)
            }
        },

    }
};

export default todos;