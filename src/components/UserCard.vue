<template>
    <div class="wrapper">
      <div class="profile">
        <img src="/images/icons/profile.png" class="thumbnail">
        <h3 class="name">{{user.name}} {{user.surname}}</h3>
        <a class="w-full title" :href="`mailto:${user.email}`">({{user.email}})</a>
        <a class="w-full text-center description no-underline" :href="user.website" target="_blank"><span class="font-bold">Website:</span> {{user.website}}</a>
        <p class="description"><span class="font-bold">Company:</span> {{user.company.name}}</p>
        <p class="description"><span class="font-bold">Address:</span> {{user.address.street}} / {{user.address.city}}</p>
      </div>

      <div class="divider"></div>

      <div class="social-icons">
        <div class="icon">
          <router-link :to="`/users/${user.id}/todos`"><i class="pi pi-list"></i></router-link>
          <p class="mt-3 mb-0">Todos</p>
        </div>

        <div class="icon">
          <router-link :to="`/users/${user.id}/albums`"><i class="pi pi-map"></i></router-link>
          <p class="mt-3 mb-0">Albums</p>
        </div>

        <div class="icon">
          <router-link :to="`/users/${user.id}/posts`"><i class="pi pi-image"></i></router-link>
          <p class="mt-3 mb-0">Posts</p>
        </div>
      </div>

      <div class="divider"></div>

      <a class="a-light w-full call" :href="`tel:${user.phone}`">
        <i class="pi pi-phone mr-2"></i>
          Contact
      </a>
    </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      default: ()=> {}
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: fit-content;
  background: #18181b;
  transition: background 0.6s ease;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, .4);
}

.wrapper .profile {
  margin-top: 1rem;
  position: relative;
}
.wrapper .profile .check {
  position: absolute;
  right: 105px;
  top: 95px;
}
.wrapper .profile .thumbnail {
  width: 124px;
  height: 124px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5em;
  border-radius: 100%;
  box-shadow: 0 13px 26px rgba(0, 0, 0, .2), 0 3px 6px rgba(0, 0, 0, .2);
}
.wrapper .profile .name {
  color: #ccd6dd;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
.wrapper .profile .title {
  display: block;
  color: #7c8097;
  font-size: 0.75em;
  font-weight: 300;
  text-align: center;
  padding-top: 0.5em;
  padding-bottom: 0.7em;
  letter-spacing: 1.5px;
}
.wrapper .profile .description {
  color: #ccd6dd;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1.3em;
}
.wrapper .profile .w-full {
  display: flex;
  justify-content: center;
}
.call {
  color: #fff;
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 300;
  border-radius: 70px;
  box-shadow: 0 13px 26px rgba(0, 0, 0, .2), 0 3px 6px rgba(0, 0, 0, .2);

}
.wrapper .social-icons {
  display: flex;
  justify-content: space-between;
}
.wrapper .social-icons .icon {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wrapper .social-icons .icon a {
  color: #fff;
  width: 60px;
  height: 60px;
  font-size: 28px;
  line-height: 60px;
  text-align: center;
  border-radius: 30px;
}
.wrapper .social-icons .icon i {
  font-size: 1rem;
}
.wrapper .social-icons .icon:nth-of-type(1) a {
  background: linear-gradient(to bottom right, #18181b, #3B555D);
}
.wrapper .social-icons .icon:nth-of-type(2) a {
  background: linear-gradient(to bottom right, #203035, #5E929F);
}
.wrapper .social-icons .icon:nth-of-type(3) a {
  background: linear-gradient(to bottom right, #37646f, #82CFE1);
}
.wrapper .social-icons .icon h4 {
  color: #080911;
  font-size: 1em;
  margin-top: 1.3em;
  margin-bottom: 0.2em;
}
.wrapper .social-icons .icon p {
  color: #f9f9f9;
  font-size: 12px;
}
.divider {
  background-color: #232323;
  height: 1px;
  width: 100%;
  margin: 1rem 0;
}
</style>