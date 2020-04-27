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
	components: { NavBar }
})
export default class AppLayout extends Vue {

	public constructor() {
		super();
		this.$vuetify.theme.dark = Boolean(appStore.darkMode);
	}

}
</script>

<style scoped>
</style>
