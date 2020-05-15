<template>
	<v-card class="permissions-card">
		<span class="overline">
			<v-icon x-small>mdi-{{ icon }}</v-icon>
			{{ title }}
		</span>
		<div class="permissions-tab">
			<v-checkbox
				v-model="read"
				append-icon="mdi-magnify"
				label="Read Access"
				@change="recalc($event)"
			/>
			<v-divider
				:class="{ 'active-permission-line': write }"
			/>
			<v-checkbox
				v-model="write"
				append-icon="mdi-pencil"
				label="Write Access"
				@change="recalc($event)"
			/>
			<v-divider
				v-if="adminOption"
				:class="{ 'active-permission-line': admin }"
			/>
			<v-checkbox
				v-if="adminOption"
				v-model="admin"
				append-icon="mdi-wrench"
				label="Admin Access"
				@change="recalc($event)"
			/>
		</div>
	</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Level extends Vue {

	public read = false;
	public write = false;
	public admin = false;

	@Prop()
	public title!: string;

	@Prop()
	public icon!: string;

	@Prop()
	public adminOption!: boolean | null;

	public recalc(val: boolean) {
		if (val) {
			this.read = this.read || this.write || this.admin;
			this.write = this.write || this.admin;
		} else {
			this.admin = this.read && this.write && this.admin;
			this.write = this.read && this.write;
		}
	}


}
</script>

<style scoped>
	.permissions-tab .v-divider {
		margin-top: calc(20px + 12px);
	}

	.permissions-tab .v-divider.active-permission-line {
		border-color: var(--v-primary-base);
	}

	.permissions-tab {
		display: flex;
		justify-content: space-between !important;
	}

	.permissions-card {
		background-color: var(--v-secondary-darken1) !important;
		padding: 12px 12px 0 12px;
	}
</style>

<style>
	.admin-level .v-expansion-panel-content__wrap {
		padding-right: 0;
		padding-left: 0;
	}
</style>
