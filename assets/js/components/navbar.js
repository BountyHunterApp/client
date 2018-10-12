Vue.component('nav-bar', {
  data: function () {
    return {
      formLoginEmail: '',
      formLoginPassword: '',

      registFormName: '',
      registFormEmail: '',
      registFormPassword: '',
      registFormAvatar: ''

    }
  },
  props: ['host', 'user', 'fileAvatarRegist'],
  methods: {
    register() {
      console.log(this.registFormAvatar)

      let formData = new FormData()

      formData.append('image', this.registFormAvatar)
      formData.append('name', this.registFormName)
      formData.append('email', this.registFormEmail)
      formData.append('password', this.registFormPassword)

      console.log(formData)
      axios.post(`${this.host}/register`, formData)
        .then(data => {
          this.formLoginEmail = this.registFormEmail
          this.formLoginPassword = this.registFormPassword
          this.registFormName = ''
          this.registFormEmail = ''
          this.registFormPassword = ''
          this.registFormAvatar = ''
          console.log(data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onFileChange(event) {
      this.registFormAvatar = event.target.files[0]
    },
    login() {
      axios({
          url: `${this.host}/login`,
          method: 'POST',
          data: {
            email: this.formLoginEmail,
            password: this.formLoginPassword
          }
        })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.formLoginEmail = ''
          this.formLoginPassword = ''
          this.$emit('trigger-getdatauser')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout() {
      localStorage.removeItem('token')
      this.$emit('trigger-logout')
    }
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Bounty Hunter</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">List <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Your list</a>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0" v-if="!user">
        <input class="form-control mr-sm-2" type="text" placeholder="Email" aria-label="Search" v-model="formLoginEmail">
        <input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Search" v-model="formLoginPassword">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style="margin-right: 10px;" v-on:click="login">Login</button>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit"  data-toggle="modal" data-target="#exampleModal">Register</button>
      </div>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style="margin-right: 10px;" v-on:click="logout" v-else>Logout</button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleFormControlFile1">Avatar</label>
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" v-on:change = "onFileChange">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="email" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Full name" v-model="registFormName">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="registFormEmail">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="registFormPassword">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="register">Register</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  `
})