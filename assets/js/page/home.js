var app = new Vue({
  el: '#app',
  data: {
    host: 'http://localhost:3000',
    currentUser: null
  },
  created() {
    let token = localStorage.getItem('token')

    if (token) {
      this.getUserData()
    }
  },
  methods: {
    resetCurrentUser() {
      this.currentUser = null
    },
    getUserData() {
      axios({
          url: `${this.host}/users`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          this.currentUser = data.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})