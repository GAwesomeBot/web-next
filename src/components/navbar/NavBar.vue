<template>
	<v-app-bar class="gab-app-bar" absolute>
		<v-toolbar-title style="text-align: center;" color="white">
			GAwesomeBot
		</v-toolbar-title>
		<v-spacer />
		<nav-bar-link link="/" icon="home" name="Home" />
		<nav-bar-link link="/activity" icon="comments" name="Activity" />
		<nav-bar-link link="/extensions" icon="bolt" name="Extensions" />
		<nav-bar-link link="/wiki" icon="book" name="Wiki" />
		<nav-bar-link link="/blog" icon="rss" name="Blog" />
		<nav-bar-user-profile :links="links" />
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'nuxt-property-decorator';
import NavBarLink from '@/components/navbar/NavBarLink.vue';
import NavBarUserProfile from '@/components/navbar/NavBarUserProfile.vue';

@Component({
	components: { NavBarLink, NavBarUserProfile }
})
export default class AppLayout extends Vue {

	@Inject()
	public links = [
		{ to: '/activity', name: 'User Settings', icon: 'user-cog' },
		{ to: '/dashboard', name: 'Admin Console', icon: 'cogs' },
		{ to: '/maintainer', name: 'Maintainer Console', icon: 'wrench' }
	];

}
</script>

<style>
	.v-toolbar {
		flex-grow: 0!important;
	}
	.gab-app-bar {
		background-color: transparent !important;
		color: white !important;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.14),
		0px 4px 5px 0px rgba(0, 0, 0, 0.10),
		0px 1px 10px 0px rgba(0, 0, 0, 0.08) !important;
	}
	.gab-app-bar .v-toolbar__content {
		padding-bottom: 0;
		padding-top: 0;
	}
</style>
