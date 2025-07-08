<template>
  <div>
    <div class="space-between menu">
      <breadcrumb-component :items="breadcrumbs" />
    </div>

    <div class="black-card">
      <general-loader v-if="loading"/>

      <div v-else>
        <div class="space-between">
          <h4 class="main-title">Comments</h4>
        </div>
        <data-table :value="comments" responsiveLayout="scroll" class="mt-3">
          <table-column field="id" header="ID"></table-column>

          <table-column field="name" header="Name"></table-column>

          <table-column field="body" header="Body"></table-column>

          <table-column field="email" header="E-Mail"></table-column>
        </data-table>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, computed, ref} from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PostComments',
  props: {
    id:{
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    const loading = computed(() => store.state.comments.loading);
    const comments = computed(() => store.state.comments.list);

    const breadcrumbs = ref([{
      route:'/users',
      active: false,
      name: 'Users'
    },{
      active: true,
      name: 'Comments'
    }
    ])

    onMounted(() => {
      store.dispatch('comments/getPostComments',parseInt(props.id));
      document.title = 'Comments'
    });

    return {
      loading,
      comments,
      breadcrumbs
    };
  },
};
</script>