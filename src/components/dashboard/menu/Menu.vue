<template>
	<div>
		<v-navigation-drawer
			permanent
			floating
			class="dashboard-navigation-drawer"
		>
			<slot />
		</v-navigation-drawer>
	</div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Menu extends Vue {}
</script>

<style scoped>
	.dashboard-navigation-drawer {
		box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.14),
		0px -4px 5px 0px rgba(0, 0, 0, 0.10),
		0px -1px 10px 0px rgba(0, 0, 0, 0.08) !important;
		background-color: #272727 !important;
		height: calc(100vh - 128px);
		flex-shrink: 1;
		overflow-y: auto;
	}
</style>
