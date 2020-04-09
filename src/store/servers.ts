import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import axios from 'axios';

import { PublicServerEntry } from '@/lib/types/PublicServerEntry';

@Module({
	name: 'servers',
	stateFactory: true,
	namespaced: true
})
export default class Servers extends VuexModule {

	public servers: PublicServerEntry[] = [];

	@Mutation
	public setServerList(servers: PublicServerEntry[]) {
		servers.forEach(server => this.servers.push(server));
	}

	@Mutation
	public banServer(id: string) {
		const index = this.servers.findIndex(server => server.id === id);
		this.servers.splice(index, 1);
	}

	@Action({ rawError: true })
	public async fetchServerList() {
		const res = await axios.get('https://gawesomebot.com/api/servers');
		const servers = res.data.data as PublicServerEntry[];
		this.context.commit('setServerList', servers);
	}

}
