<template>
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <a :href="items.length === 0 ? '#' : item.route" v-bind="props.action" v-if="!item.active">
          <span v-if="item.name">{{ item.name }}</span>
          <i :class="item.icon" v-else></i>
          <span v-if="items.length === 0"> |&nbsp;&nbsp;Home Page</span>
        </a>
        <span v-else class="active-bread">{{item.name}}</span>
      </template>
    </Breadcrumb>
</template>

<script>
import {Breadcrumb} from "primevue";

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      home: {
        icon: 'pi pi-home',
        route: '/'
      }
    }
  },
  mounted(){
    console.log(this.items)
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #f4f4f4;
}
a:hover, .active-bread {
  color: #34D399;
}
</style>
