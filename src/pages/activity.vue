<template>
	<div>
		<app-header
			:search-bar="true"
		>
			<h1 class="display-3">
				GAwesomeBot
			</h1>
		</app-header>
		<v-container>
			<div
				v-if="!$fetchState.pending"
				class="d-flex justify-space-around flex-wrap"
			>
				<server-card
					v-for="server of servers"
					:key="server.id"
					:server="server"
				/>
				<div v-if="!rendering" v-intersect.quiet="endlessScrollFetch" />
			</div>
			<div
				v-if="$fetchState.pending || loading || rendering"
				class="d-flex justify-space-around flex-wrap"
			>
				<div
					v-for="n in 50"
					:key="n"
					class="flex-grow-1 server-card-skeleton"
				>
					<v-sheet
						class="px-3 pt-3 pb-3 flex-grow-1"
						:color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`"
					>
						<v-skeleton-loader
							type="card"
							class="mx-auto"
						/>
					</v-sheet>
				</div>
			</div>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { serversStore, appStore } from '@/store';
import servers from '@/store/servers';
import { PublicServerEntry } from '@/lib/types/PublicServerEntry';
import ServerCard from '@/components/ServerCard.vue';
import AppHeader from '@/components/header/AppHeader.vue';

@Component({
	components: { ServerCard, AppHeader },
	layout: 'app',
})
export default class ActivityPage extends Vue {

	public loading = false;
	public rendering = true;

	public get searchQuery() {
		return appStore.searchQuery?.toLowerCase();
	}

	public get servers(): PublicServerEntry[] {
		return serversStore.servers.filter(server => !this.searchQuery || server.name.toLowerCase().includes(this.searchQuery));
	}

	public async fetch() {
		getModule(servers, this.$store);

		if (this.servers.length) return;

		await serversStore.fetchServerList();
	}

	public mounted() {
		setTimeout(() => {
			this.rendering = false;
		}, 1000);
	}

	public destroyed() {
		serversStore.limitServerList();
	}

	public async endlessScrollFetch() {
		if (this.loading || this.$fetchState.pending) return;
		this.loading = true;
		getModule(servers, this.$store);
		console.log('Scroll fetch');
		await serversStore.fetchServerList();
		this.loading = false;
	}

}
</script>

<style scoped>
	.server-card-skeleton {
		min-width: 300px;
		padding: 10px;
	}
</style>
