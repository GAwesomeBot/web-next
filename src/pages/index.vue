<template>
<v-app>
    <v-content>
        <v-container>
            <div v-if="!$fetchState.pending" class="d-flex justify-space-around flex-wrap">
                <server-card v-for="server of servers" :key="server.id" :server="server"></server-card>
            </div>
            <div v-if="$fetchState.pending" class="d-flex justify-space-around flex-wrap">
                <div v-for="n in 50" class="flex-grow-1 server-card-skeleton">
                    <v-sheet class="px-3 pt-3 pb-3 flex-grow-1" color="grey lighten-4">
                        <v-skeleton-loader type="card" class="mx-auto"></v-skeleton-loader>
                    </v-sheet>
                </div>
            </div>
        </v-container>
    </v-content>
</v-app>
</template>

<script lang="ts">
    import ServerCard from '@/components/ServerCard.vue';
    import {Component, Vue} from 'nuxt-property-decorator';
    import { serversStore } from '@/store';
    import servers from '@/store/servers';
    import { getModule } from 'vuex-module-decorators';
    import { PublicServerEntry } from "@/lib/types/PublicServerEntry";

    @Component({
        components: { ServerCard },
    })
    export default class IndexPage extends Vue {
        get servers(): PublicServerEntry[] {
            return serversStore.servers;
        }

        async fetch() {
            getModule(servers, this.$store);
            await serversStore.fetchServerList();
        }
    }
</script>

<style scoped>
    .server-card-skeleton {
        min-width: 250px;
        padding: 10px;
    }
</style>
