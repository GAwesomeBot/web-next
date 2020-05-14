<template>
	<v-list-group
		link
		:to="link"
		:prepend-icon="`mdi-${icon}`"
	>
		<template v-slot:activator>
			<v-list-item-title>{{ name }}</v-list-item-title>
		</template>

		<slot />
	</v-list-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class MenuItemGroup extends Vue {

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
