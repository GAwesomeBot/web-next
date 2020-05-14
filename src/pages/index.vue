<template>
	<div>
		<app-header>
			<h1 class="display-3">
				GAwesomeBot
			</h1>
		</app-header>
		<v-container fluid />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppHeader from '@/components/header/AppHeader.vue';

@Component({
	components: { AppHeader },
	layout: 'app',
})
export default class IndexPage extends Vue {}
</script>

<style scoped>
</style>
