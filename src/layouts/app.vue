<template>
	<v-app>
		<nav-bar />
		<v-content>
			<nuxt />
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { appStore } from '@/store';
import NavBar from '@/components/navbar/NavBar.vue';

@Component({
	components: { NavBar },
})
export default class AppLayout extends Vue {

	public constructor() {
		super();
		this.$vuetify.theme.dark = Boolean(appStore.darkMode);
	}

}
</script>

<style>
	html {
		overflow-y: hidden !important;
		height: 100%;
	}
	body {
		height: inherit;
	}
	#__nuxt {
		height: inherit;
	}
	#__layout {
		height: inherit;
	}
	*::-webkit-scrollbar {
		width: 0;
	}
	.v-application::-webkit-scrollbar {
		width: 0.3em !important;
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
	.v-application {
		overflow-y: auto;
		height: 100%;
	}
</style>
