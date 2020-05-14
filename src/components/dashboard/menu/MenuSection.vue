<template>
	<div>
		<v-divider
			v-if="subheader"
		/>

		<v-list
			nav
			dense
		>
			<v-subheader
				v-if="subheader"
			>
				{{ subheader }}
			</v-subheader>
			<slot />
		</v-list>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
	components: {},
})
export default class MenuSection extends Vue {

	@Prop()
	public subheader!: string | null;

}
</script>

<style scoped>
</style>
