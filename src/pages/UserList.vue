<template>
  <div>
    <div class="space-between menu">
      <breadcrumb-component :items="breadcrumbs" />
    </div>

    <general-loader v-if="loading"/>

    <div class="grid" v-else>
      <div class="col-4" v-for="user in users" :key="user.id">
        <UserCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed,ref } from 'vue';
import { useStore } from 'vuex';
import UserCard from "@/components/UserCard.vue";

export default {
  name: 'UserList',
  components: {UserCard},
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.users.loading);
    const users = computed(() => store.state.users.list);
    const breadcrumbs = ref([{
      route:'/users',
      active: true,
      name: 'Users'
    }])

    onMounted(() => {
      store.dispatch('users/getUsers');
      document.title = 'Users'
    });

    return {
      loading,
      users,
      breadcrumbs
    };
  },
};
</script>