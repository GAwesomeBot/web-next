import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import servers from '@/store/servers';

let serversStore: servers;

function initialiseStores(store: Store<any>): void {
	serversStore = getModule(servers, store);
}

export { initialiseStores, serversStore };
