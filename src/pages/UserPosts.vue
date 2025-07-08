<template>
  <div>
    <div class="space-between menu">
      <breadcrumb-component :items="breadcrumbs"/>
    </div>

    <div class="black-card">
      <general-loader v-if="loading"/>

      <div v-else>
        <div class="space-between">
          <h4 class="main-title">{{ user.name }} Posts</h4>
          <form-button label="Save" @click="add = {}; visible_add = true;">Add</form-button>
        </div>
        <data-table :value="posts" responsiveLayout="scroll" class="mt-3">
          <table-column field="id" header="ID"></table-column>

          <table-column field="title" header="Title"></table-column>

          <table-column field="body" header="Body"></table-column>

          <table-column field="edit" header="">
            <template #body="slotProps">
              <div class="flex align-items-center flex-row gap-3">
                <router-link :to="`/posts/${slotProps.data.id}/comments`">
                  <i class="pi pi-star-fill cursor-pointer" data-html="true" title="Comments"></i>
                </router-link>
                <i class="pi pi-pencil cursor-pointer" data-html="true" title="Update"
                   @click="id = slotProps.data.id; update_title = slotProps.data.title; update_body = slotProps.data.body; openModal();"></i>
                <i class="pi pi-trash text-danger cursor-pointer" data-html="true" title="Delete"
                   @click="id = slotProps.data.id; deletePost()"></i>
              </div>
            </template>
          </table-column>
        </data-table>
      </div>
    </div>

    <modal-dialog v-model:visible="visible" modal header=" " :style="{ width: '50%' }">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Title</label>
        <form-input v-model="update_title" class="form-input" autocomplete="off"/>
      </div>

      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Body</label>
        <form-textarea rows="5" v-model="update_body"/>
      </div>
      <template #footer>
        <form-button label="Cancel" outlined severity="secondary" @click="visible = false">Cancel</form-button>
        <form-button label="Save" @click="updatePost()">Update</form-button>
      </template>
    </modal-dialog>

    <modal-dialog v-model:visible="visible_add" modal header=" " :style="{ width: '50%' }">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Title</label>
        <form-input v-model="add.title" class="form-input" autocomplete="off"/>
      </div>

      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Body</label>
        <form-textarea v-model="add.body" class="form-input" autocomplete="off"/>
      </div>
      <template #footer>
        <form-button label="Cancel" outlined severity="secondary" @click="visible_add = false">Cancel</form-button>
        <form-button label="Save" @click="addPost()">Add</form-button>
      </template>
    </modal-dialog>

  </div>
</template>

<script>
import {onMounted, computed, ref} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'UserPosts',
  props: {
    user_id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    const loading = computed(() => store.state.post.loading);
    const posts = computed(() => store.state.post.list);
    const user = computed(() => store.state.users.user);
    const add = ref({})
    const update_title = ref('')
    const update_body = ref('')
    const id = ref(null);
    const visible = ref(false);
    const visible_add = ref(false);
    const breadcrumbs = ref([{
      route: '/users',
      active: false,
      name: 'Users'
    }, {
      active: true,
      name: 'Posts'
    }
    ])

    onMounted(() => {
      store.dispatch('users/getUserDetail', parseInt(props.user_id));
      store.dispatch('post/getUserPosts', parseInt(props.user_id));
      document.title = 'Posts'
    });

    const openModal = () => {
      visible.value = true
    }

    const updatePost = () => {
      visible.value = false;
      store.dispatch('post/updatePost', {
        id: id.value,
        user_id: parseInt(props.user_id),
        body: update_body.value,
        title: update_title.value
      });
    }
    const deletePost = () => {
      store.dispatch('post/deletePost', {
        id: id.value,
        user_id: parseInt(props.user_id)
      });
    }
    const addPost = () => {
      visible_add.value = false;
      store.dispatch('post/addPost', {
        user_id: parseInt(props.user_id),
        title: add.value.title,
        body: add.value.body
      });
    }

    return {
      loading,
      posts,
      visible,
      user,
      visible_add,
      add,
      id,
      update_title,
      update_body,
      breadcrumbs,
      addPost,
      openModal,
      updatePost,
      deletePost
    };
  },
};
</script>