<div class="panel">
  <div class="panel-header text-center">
    <div class="panel-title">
      Generate
    </div>
  </div>
  <div class="panel-body">
    <div class="form-group">
      <label class="form-label">Enter seed</label>
      <input class="form-input" bind:value="keyword" type="text" on:keyup="handleKeyup(event)" />
    </div>
    <div>
      {{#if generated}}
      <div class="divider text-center" data-content="GENERATED"></div>

      {{#each ['simple', 'complex', 'readable'] as kind}}
        <div class="tile">
          <div class="tile-content">
            <div class="tile-title"><b>{{kind}}</b></div>
            <div class="tile-subtitle">{{generated[kind]}}</div>
          </div>
          <div class="tile-action">
            <button class="btn btn-primary btn-action btn-lg" on:click="copy(generated[kind])">
              <i class="icon icon-share"></i>
            </button>
          </div>
        </div>
      {{/each}}
      {{/if}}
    </div>
  </div>
  <div class="panel-footer">
    <button class="btn btn-primary btn-block {{ loading ? 'loading' : '' }} {{keyword.length && changed ? '' : 'disabled'}}" on:click="generate(event)">Generate</button>
  </div>
</div>

<style>
  .tile {
    margin: 2vh 0;
  }
  .tile > .tile-action {
    visibility: hidden;
  }
  .tile:hover > .tile-action {
    visibility: visible;
  }
  .tile-title {
    text-transform: capitalize;
  }
  .tile-subtitle {
    margin: 1vh 0;
  }
</style>

<script>
  const { ipcRenderer, clipboard } = window.require('electron')

  export default {
    data () {
      return {
        generated: null,
        changed: false,
        keyword: '',
        loading: false
      }
    },

    oncreate () {
      ipcRenderer.on('generate:results', (event, { simple, complex, readable }) => {
        this.set({ loading: false, generated: { simple, complex, readable } })
			})
    },

    methods: {
      handleKeyup (event) {
        this.set({ changed: true })
        const keyword = this.get('keyword')
        if (event.code === 'Enter' && keyword.length) {
          this.generate()
        }
      },
      generate () {
        const keyword = this.get('keyword')
        this.set({ changed: false, loading: true })
        ipcRenderer.send('generate', { keyword })
      },
      copy (text) {
        clipboard.writeText(text)
      }
    }
  }
</script>