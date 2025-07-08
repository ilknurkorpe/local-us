<template>
  <div>
    <div class="space-between menu">
      <breadcrumb-component :items="breadcrumbs"/>
    </div>

    <div class="black-card">
      <general-loader v-if="loading"/>

      <div v-else>
        <div class="space-between">
          <h4 class="main-title">{{ user.name }} Todos</h4>
          <form-button label="Save" @click="add = {}; visible_add = true;">
            Add
          </form-button>
        </div>
        <data-table :value="todos" responsiveLayout="scroll" class="mt-3">
          <table-column field="id" header="ID"></table-column>

          <table-column field="title" header="Title"></table-column>

          <table-column field="completed" header="Completed">
            <template #body="slotProps">
              <i :class="slotProps.data.completed ? 'pi pi-check-circle text-success' : 'pi pi-times-circle text-danger'"></i>
            </template>
          </table-column>

          <table-column field="edit" header="">
            <template #body="slotProps">
              <i class="pi pi-pencil cursor-pointer" data-html="true" title="Update"
                 @click="update_todo_id = slotProps.data.id; update_todo_title = slotProps.data.title; update_todo_completed = slotProps.data.completed; openTodoModal();"></i>
              <i class="pi pi-trash text-danger ml-3 cursor-pointer" data-html="true" title="Delete"
                 @click="update_todo_id = slotProps.data.id; deleteTodo()"></i>
            </template>
          </table-column>
        </data-table>
      </div>
    </div>


    <modal-dialog v-model:visible="visible" modal header=" " :style="{ width: '50%' }">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Title</label>
        <form-input v-model="update_todo_title" class="form-input" autocomplete="off"/>
      </div>

      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Completed</label>
        <form-check v-model="update_todo_completed" binary/>
      </div>
      <template #footer>
        <form-button label="Cancel" outlined severity="secondary" @click="visible = false">Cancel</form-button>
        <form-button label="Save" @click="updateTodo()">Update</form-button>
      </template>
    </modal-dialog>

    <modal-dialog v-model:visible="visible_add" modal header=" " :style="{ width: '50%' }">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Title</label>
        <form-input v-model="add.title" class="form-input" autocomplete="off"/>
      </div>

      <div class="flex flex-column gap-2 mb-4">
        <label for="username" class="font-semibold mb-0">Completed</label>
        <form-check v-model="add.completed" binary/>
      </div>
      <template #footer>
        <form-button label="Cancel" outlined severity="secondary" @click="visible_add = false">Cancel</form-button>
        <form-button label="Save" @click="addTodo()">Add</form-button>
      </template>
    </modal-dialog>

  </div>
</template>

<script>
import {onMounted, computed, ref} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'UserTodos',
  props: {
    user_id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    const loading = computed(() => store.state.todos.loading);
    const todos = computed(() => store.state.todos.list);
    const user = computed(() => store.state.users.user);
    const visible = ref(false);
    const visible_add = ref(false);
    const update_todo_title = ref('')
    const update_todo_completed = ref(false)
    const update_todo_id = ref(0)
    const add = ref({})
    const breadcrumbs = ref([{
      route: '/users',
      active: false,
      name: 'Users'
    }, {
      active: true,
      name: 'Todos'
    }
    ])

    onMounted(() => {
      store.dispatch('users/getUserDetail', parseInt(props.user_id));
      store.dispatch('todos/getUserTodos', parseInt(props.user_id));
      document.title = 'Todos'
    });

    const openTodoModal = () => {
      visible.value = true
    }

    const updateTodo = () => {
      visible.value = false;
      store.dispatch('todos/updateTodo', {
        id: update_todo_id.value,
        user_id: parseInt(props.user_id),
        title: update_todo_title.value,
        completed: update_todo_completed.value
      });
    }
    const deleteTodo = () => {
      store.dispatch('todos/deleteTodo', {
        id: update_todo_id.value,
        user_id: parseInt(props.user_id)
      });
    }
    const addTodo = () => {
      visible_add.value = false;
      store.dispatch('todos/addTodo', {
        user_id: parseInt(props.user_id),
        title: add.value.title,
        completed: add.value.completed ?? false,
      });
    }

    return {
      loading,
      todos,
      visible,
      update_todo_title,
      update_todo_completed,
      update_todo_id,
      user,
      visible_add,
      add,
      breadcrumbs,
      openTodoModal,
      updateTodo,
      deleteTodo,
      addTodo
    };
  },
};
</script>