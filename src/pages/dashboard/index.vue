<template>
	<div>
		<app-header
			:search-bar="true"
		>
			<h1 class="display-1">
				GAwesomeBot Dashboard
			</h1>
			<h1 class="title">
				Server Selector
			</h1>
		</app-header>
		<v-container fluid>
			<v-row>
				<v-col cols="2" />
				<v-col cols="8" align="center">
					<v-row
						v-for="guilds of rows"
						:key="guilds[0].id"
						justify="center"
					>
						<guild-selector
							v-for="guild of guilds"
							:key="guild.id"
							:guild="guild"
						/>
					</v-row>
				</v-col>
				<v-col cols="2" />
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { appStore } from '@/store';
import { Guild } from '@/lib/types/admin/Guild';
import { getGuilds } from '@/services/dashboard';

import AppHeader from '@/components/header/AppHeader.vue';
import GuildSelector from '@/components/dashboard/GuildSelector.vue';

@Component({
	components: { AppHeader, GuildSelector },
	layout: 'app',
	middleware: ['auth'],
})
export default class DashboardIndexPage extends Vue {

	public get searchQuery() {
		return appStore.searchQuery?.toLowerCase();
	}

	private guilds: Guild[] = [];

	private get filteredGuilds(): Guild[] {
		return this.guilds.filter(guild => !this.searchQuery || guild.name.toLowerCase().includes(this.searchQuery));
	}

	public get rows(): Guild[][] {
		const rows: Guild[][] = [];
		const { filteredGuilds } = this;
		for (const [i] of Object.entries(filteredGuilds)) {
			if (Number(i) % 6 === 0) rows.push([]);
			rows[rows.length - 1].push(filteredGuilds[Number(i)]);
		}
		return rows;
	}

	public async fetch() {
		const guilds = await getGuilds();
		const sortedGuilds = guilds.sort((a, b) => a.name.localeCompare(b.name));
		for (const guild of sortedGuilds) {
			this.guilds.push(guild);
		}
	}

}
</script>

<style scoped>
</style>
