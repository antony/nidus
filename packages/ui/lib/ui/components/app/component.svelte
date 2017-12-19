<header class="navbar" style="-webkit-app-region: drag">
	<section class="navbar-section">
		<div class="logo text-center">
			<b class="navbar-brand">Nidus</b>
		</div>
		<button style="-webkit-app-region: no-drag" class="btn btn-link btn-action btn-lg float-right" on:click="logout()">
			<i class="icon icon-people"></i>
		</button>
		<button style="-webkit-app-region: no-drag" class="btn btn-link btn-action btn-lg float-right" on:click="minimize()">
			<i class="icon icon-minus"></i>
		</button>
		<button style="-webkit-app-region: no-drag" class="btn btn-link btn-action btn-lg float-right" on:click="exit()">
			<i class="icon icon-cross"></i>
		</button>
	</section>
</header>
<div class="container">
	<div class="columns">
		<div class="column col-12">
			{{#if $state === 'login'}}
			<Login />
			{{/if}}
			{{#if $state === 'setup'}}
			<Initialise />
			{{/if}}
			{{#if $state === 'generate'}}
			<Generate />
			{{/if}}
		</div>
	</div>
</div>

<style>
	.logo {
		width: 100%;
	}
</style>

<script>
	import 'spectre.css/dist/spectre.css'
	import 'spectre.css/dist/spectre-icons.css'
	import Login from '../login/component.svelte'
	import Initialise from '../initialise/component.svelte'
	import Generate from '../generate/component.svelte'
	const { ipcRenderer } = window.require('electron')

  export default {
		oncreate () {
			ipcRenderer.on('state:change', (event, { state }) => {
        this.store.set({ state })
			})
			ipcRenderer.send('application:bootstrap')
		},

		methods: {
      logout () {
        this.store.set({ state: 'login' })
			},
			exit () {
				ipcRenderer.send('application:exit')
			},
			minimize () {
				ipcRenderer.send('application:minimize')
			}
		},

		components: {
			Initialise,
			Login,
			Generate
		}
  }
</script>