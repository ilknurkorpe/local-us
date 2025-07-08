import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../pages/UserList.vue';
import UserTodos from '../pages/UserTodos.vue';
import UserAlbums from '../pages/UserAlbums.vue';
import UserPosts from '../pages/UserPosts.vue';
import PostComments from '../pages/PostComments.vue';
import HomePage from "@/pages/HomePage.vue";
import NotFound from '@/pages/NotFound.vue';

const routes = [
   {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },{
        path: '/users',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/users/:user_id/todos',
        name: 'UserTodos',
        component: UserTodos,
        props: true
    },
    {
        path: '/users/:user_id/albums',
        name: 'UserAlbums',
        component: UserAlbums,
        props: true
    },
    {
        path: '/users/:user_id/posts',
        name: 'UserPosts',
        component: UserPosts,
        props: true
    },
    {
        path: '/posts/:id/comments',
        name: 'PostComments',
        component: PostComments,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;