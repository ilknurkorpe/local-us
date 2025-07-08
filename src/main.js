import { createApp } from 'vue';
import App from "@/App.vue";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import store from './store';
import router from './router';


import GeneralLoader from "@/components/GeneralLoader.vue";
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";
import {DataTable,Column,Dialog,InputText,Avatar,Checkbox,Button,Textarea} from "primevue";

const app = createApp(App);

app.component('general-loader',GeneralLoader)
app.component('DataTable',DataTable)
app.component('TableColumn',Column)
app.component('modal-dialog',Dialog)
app.component('form-input',InputText)
app.component('form-avatar',Avatar)
app.component('form-check',Checkbox)
app.component('form-button',Button)
app.component('form-textarea',Textarea)
app.component('breadcrumb-component',BreadcrumbComponent)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(store);
app.use(router);

app.mount('#app');