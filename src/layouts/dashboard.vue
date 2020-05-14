<template>
	<v-app>
		<nav-bar />
		<v-content>
			<div class="admin-dashboard">
				<v-sheet class="header-sheet">
					<v-container>
						<h1>GAwesomeBot Admin Dashboard</h1>
					</v-container>
				</v-sheet>
				<admin-menu
					class="dashboard-navigation-drawer"
				>
					<menu-section>
						<menu-item
							name="Overview"
							icon="view-dashboard"
							link="/dashboard/overview"
						/>
					</menu-section>

					<menu-section
						subheader="COMMANDS"
					>
						<menu-item
							name="Command Options"
							icon="cog"
							link="/dashboard/commands/options"
						/>
						<menu-item-group
							name="Command List"
							icon="cogs"
							link="/dashboard/commands/list"
						>
							<menu-item
								name="RSS Feeds"
								link="/dashboard/commands/rss"
							/>
							<menu-item
								name="Streamers"
								link="/dashboard/commands/streamers"
							/>
						</menu-item-group>
						<menu-item
							name="API Keys"
							icon="key"
							link="/dashboard/commands/keys"
						/>
					</menu-section>
					<menu-section
						subheader="STATISTICS"
					>
						<menu-item
							name="Stats Dashboard"
							icon="gauge"
							link="/dashboard/stats/dashboard"
						/>
						<menu-item
							name="Collection Options"
							icon="shield-search"
							link="/dashboard/stats/options"
						/>
					</menu-section>
					<menu-section
						subheader="CURRENCY & ACTIVITY"
					>
						<menu-item
							name="GAwesomePoints"
							icon="star"
							link="/dashboard/currency/points"
						/>
						<menu-item
							name="XP Settings"
							icon="chevron-triple-up"
							link="/dashboard/currency/xp"
						/>
						<menu-item
							name="Ranks"
							icon="medal"
							link="/dashboard/currency/ranks"
						/>
					</menu-section>
					<menu-section
						subheader="ADMINISTRATION"
					>
						<menu-item
							name="Admin Levels"
							icon="wrench"
							link="/dashboard/admin/levels"
						/>
						<menu-item
							name="Moderation"
							icon="hand-right"
							link="/dashboard/admin/moderation"
						/>
						<menu-item
							name="Voicetext"
							icon="voicemail"
							link="/dashboard/admin/voicetext"
						/>
						<menu-item
							name="Roles"
							icon="account-group"
							link="/dashboard/admin/roles"
						/>
						<menu-item
							name="Logs"
							icon="script-text"
							link="/dashboard/admin/logs"
						/>
					</menu-section>
					<menu-section
						subheader="OTHER"
					>
						<menu-item
							name="Name Display"
							icon="tag"
							link="/dashboard/other/name"
						/>
						<menu-item
							name="Ongoing Activities"
							icon="heart-pulse"
							link="/dashboard/other/activities"
						/>
						<menu-item
							name="Public Data"
							icon="earth"
							link="/dashboard/other/public"
						/>
						<menu-item
							name="Extensions"
							icon="flash"
							link="/dashboard/other/extensions"
						/>
						<menu-item
							name="Export Config"
							icon="export"
							link="/dashboard/other/export"
						/>
					</menu-section>
				</admin-menu>
				<v-container>
					<nuxt />
				</v-container>
			</div>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { appStore } from '@/store';
import NavBar from '@/components/navbar/NavBar.vue';
import Menu from '@/components/dashboard/menu/Menu.vue';
import MenuSection from '@/components/dashboard/menu/MenuSection.vue';
import MenuItem from '@/components/dashboard/menu/MenuItem.vue';
import MenuItemGroup from '@/components/dashboard/menu/MenuItemGroup.vue';

@Component({
	components: { NavBar, AdminMenu: Menu, MenuSection, MenuItem, MenuItemGroup },
})
export default class DashboardLayout extends Vue {

	public constructor() {
		super();
		this.$vuetify.theme.dark = Boolean(appStore.darkMode);
	}

}
</script>

<style scoped>
	.admin-dashboard {
		height: 100vh;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.header-sheet {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-top: 64px;
		height: 128px;
		width: 100%;
	}
</style>

<style>
	html {
		overflow-y: auto !important;
	}
	*::-webkit-scrollbar {
		width: 0;
	}
	*:hover::-webkit-scrollbar {
		width: 0.3em;
	}
	*::-webkit-scrollbar-track {
		display: none;
	}
	*::-webkit-scrollbar-thumb {
		background-color: var(--v-secondary-lighten1);
	}
</style>
