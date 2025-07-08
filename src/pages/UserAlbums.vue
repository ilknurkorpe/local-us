<template>
  <div>
    <div class="space-between menu">
      <breadcrumb-component :items="breadcrumbs" />
    </div>

    <div class="black-card">
      <general-loader v-if="loading"/>

      <div v-else>
        <div class="space-between">
          <h4 class="main-title">{{user.name}} Albums</h4>
          <form-button label="Save" @click="title = ''; add=true; update=false; visible = true;">Add</form-button>
        </div>
        <data-table :value="albums" responsiveLayout="scroll" class="mt-3">
          <table-column field="id" header="ID"></table-column>

          <table-column field="title" header="Title"></table-column>


          <table-column field="edit" header="">
            <template #body="slotProps">
              <i class="pi pi-pencil cursor-pointer" data-html="true" title="Update" @click="title=slotProps.data.title; id = slotProps.data.id; openModal();"></i>
              <i class="pi pi-trash text-danger ml-3 cursor-pointer" data-html="true" title="Delete" @click="id = slotProps.data.id; deleteModal()"></i>
            </template>
          </table-column>
        </data-table>
      </div>
    </div>


    <modal-dialog v-model:visible="visible" modal header=" " :style="{ width: '50%' }">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Title</label>
        <form-input v-model="title" class="form-input" autocomplete="off" />
      </div>
      <template #footer>
        <form-button label="Cancel" outlined severity="secondary" @click="visible = false; title='';" >Cancel</form-button>
        <form-button label="Save" @click="add ? addAlbum() : updateAlbum()">{{add ? 'Add' : 'Update'}}</form-button>
      </template>
    </modal-dialog>

  </div>
</template>

<script>
import {onMounted, computed, ref} from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UserAlbums',
  props: {
    user_id:{
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    const loading = computed(() => store.state.albums.loading);
    const albums = computed(() => store.state.albums.list);
    const user = computed(() => store.state.users.user);
    const visible = ref(false);
    const id = ref(0)
    const title = ref('')
    const add = ref(false)
    const update = ref(false)
    const breadcrumbs = ref([{
      route:'/users',
      active: false,
      name: 'Users'
    },{
      active: true,
      name: 'Albums'
    }
    ])

    onMounted(() => {
      store.dispatch('users/getUserDetail',parseInt(props.user_id));
      store.dispatch('albums/getUserAlbums',parseInt(props.user_id));
      document.title = 'Albums'
    });

    const openModal = ()=> {
      visible.value = true;
      add.value = false;
      update.value = true;
    }

    const updateAlbum = () =>{
      visible.value = false;
      store.dispatch('albums/updateAlbum', {
        id: id.value,
        user_id: parseInt(props.user_id),
        title: title.value
      });
    }
    const deleteModal = () =>{
      store.dispatch('todos/deleteTodo', {
        id: id.value,
        user_id: parseInt(props.user_id)
      });
    }
    const addAlbum = () =>{
      visible.value = false;
      store.dispatch('albums/addAlbum', {
        user_id: parseInt(props.user_id),
        title: title.value
      });
    }

    return {
      loading,
      albums,
      visible,
      user,
      id,
      title,
      breadcrumbs,
      add,
      update,
      updateAlbum,
      addAlbum,
      openModal,
      deleteModal,

    };
  },
};
</script>