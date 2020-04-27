import { Mutation, VuexModule } from 'vuex-module-decorators';

interface MutatableVuexModule extends VuexModule {
	[index: string]: any;
}

const buildLocalStorageName = (mod: MutatableVuexModule, propName: string) => `${mod.constructor.name}_${propName}`;
const buildMutationName = (propName: string) => `set${propName.charAt(0).toUpperCase()}${propName.substring(1)}`;

export default function LocalStorageSyncProp(name: string) {
	return function<T extends {new(...args: any[]): { [index: string]: any }}>(target: T) {
		const mod = target.prototype as MutatableVuexModule;

		class LocalStorageMixin extends target {

			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			public [name] = localStorage.getItem(buildLocalStorageName(mod, name));

			@Mutation
			public [buildMutationName(name)](value: string | null) {
				this[name] = value;
				if (value === null) localStorage.removeItem(buildLocalStorageName(mod, name));
				else localStorage.setItem(buildLocalStorageName(mod, name), value);
			}

		}
		Object.defineProperty(LocalStorageMixin, 'name', { value: target.name });

		return LocalStorageMixin;
	};
}
