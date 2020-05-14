<template>
	<v-list-item
		link
		:to="link"
	>
		<v-list-item-icon>
			<v-icon>mdi-{{ icon }}</v-icon>
		</v-list-item-icon>

		<v-list-item-content>
			<v-list-item-title>{{ name }}</v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class MenuItem extends Vue {

	@Prop()
	public name!: string;

	@Prop()
	public icon!: string;

	@Prop()
	public link!: string;

}
</script>

<style scoped>
</style>
