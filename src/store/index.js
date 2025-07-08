import { createStore } from 'vuex';
import users from './users';
import todos from './todos';
import albums from './albums';
import post from './post';
import comments from './comments';

const store = createStore({
    modules: {
        users,
        todos,
        albums,
        post,
        comments
    },
});

export default store;