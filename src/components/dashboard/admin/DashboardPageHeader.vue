<template>
	<div class="admin-page-header">
		<h1 class="display-1">
			{{ title }}
		</h1>
		<v-alert
			class="admin-page-header-hint"
			type="info"
			text
		>
			<slot />
		</v-alert>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator';
import AdminComponent from '@/lib/structures/AdminComponent';

@Component({
	components: {},
})
export default class DashboardPageHeader extends AdminComponent {

	@Prop()
	public title!: string;

}
</script>

<style scoped>
	.admin-page-header {
		margin-top: 1em;
		margin-left: 1em;
		margin-right: 1em;
	}

	.admin-page-header-hint {
		margin-top: 1em;
		margin-bottom: 1em;
	}

	@media (max-width: 1264px) {
		.admin-page-header {
			margin-left: 0;
			margin-right: 0;
		}
	}
</style>
