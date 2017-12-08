<div class="panel">
  <div class="panel-header text-center">
    <div class="panel-title">Unlock</div>
  </div>
  <div class="panel-body">
    <div class="form-group">
      <label class="form-label">Master password</label>
      <input class="form-input" bind:value="password" type="password" on:keyup="handleKeyup(event)" />
    </div>
    <ErrorMessage message="{{message}}" />
  </div>
  <div class="panel-footer">
    <button class="btn btn-primary btn-block {{ loading ? 'loading' : '' }} {{password.length ? '' : 'disabled'}}" on:click="login()">Unlock</button>
  </div>
</div>

<script>
  import ErrorMessage from '../error-message/component.html'
  const { ipcRenderer } = window.require('electron')

  export default {
    data () {
      return {
        password: '',
        message: null,
        loading: false
      }
    },

    oncreate () {
      ipcRenderer.on('login:success', (event) => {
        this.set({ loading: false })
        this.store.set({ state: 'generate' })
			})
      ipcRenderer.on('login:error', (event, { message }) => {
        this.set({ loading: false, message })
			})
    },

    methods: {
      handleKeyup (event) {
        const password = this.get('password')
        if (event.code === 'Enter' && password.length) {
          this.set({ loading: true })
          this.login()
        }
      },
      login () {
        const password = this.get('password')
        ipcRenderer.send('login', { password })
      }
    },

    components: {
      ErrorMessage
    }
  }
</script>