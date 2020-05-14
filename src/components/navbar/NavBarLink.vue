<template>
	<v-btn
		text
		nuxt
		:to="link"
		:class="`navbar-link${active ? ' v-btn--active active-navbar-link' : ''}`"
		active-class="active-navbar-link"
		large
		v-on="on"
	>
		<v-icon small>
			fas fa-{{ icon }}
		</v-icon>
		&nbsp; {{ name }}
	</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class NavBarLink extends Vue {

	@Prop()
	public active!: boolean;

	@Prop()
	public link!: string;

	@Prop()
	public icon!: string;

	@Prop()
	public name!: string;

	@Prop()
	public on!: any;

}
</script>

<style scoped>
	.navbar-link.active-navbar-link {
		border-bottom: 0.1em solid rgba(0, 209, 178, 0.8);
		box-shadow: 0px 4px 2px -2px rgba(0, 209, 178, 0.5),
								0px 8px 4px -4px rgba(0, 209, 178, 0.3),
								0px 13px 4px -6px rgba(0, 209, 178, 0.2);
	}

	.navbar-link {
		height: 100% !important;
	}
	.navbar-link::before {
		opacity: 0 !important;
	}
</style>
