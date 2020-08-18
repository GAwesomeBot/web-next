import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import servers from '@/store/servers';
import auth from '@/store/auth';
import app from '@/store/app';
import admin from '@/store/admin';

let serversStore: servers;
let authStore: auth;
let appStore: app;
let adminStore: admin;

function initialiseStores(store: Store<any>): void {
	serversStore = getModule(servers, store);
	authStore = getModule(auth, store);
	appStore = getModule(app, store);
	adminStore = getModule(admin, store);
}

export { initialiseStores, serversStore, authStore, appStore, adminStore };
