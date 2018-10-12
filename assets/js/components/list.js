Vue.component('list-bounty', {
    data: function () {
        return {
            allList: [],
            info: '',
            bountyId: '',
            detailBounty: {}
        }
    },
    props: ['needreset', 'currentuser'],
    methods: {
        getData() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/bounty'
            })
            .then((result) => {
                if (result.data) {
                    this.allList = result.data.data
                } else {
                    console.log('no bounty data');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getDetail(id) {
            console.log('masuk')
            axios({
                url: `http://localhost:3000/bounty/detail/${id}`,
                method: "GET",
                headers: {
                  token: localStorage.getItem("token")
                }
            })
            .then(data => {
                this.detailBounty = data.data.data
            })
            .catch(err => {
                console.log(err);
            });
        },
        saveId(id) {
            this.bountyId = id
        },
        sendInfo() {
            axios({
                url: `http://localhost:3000/bounty/sendinfo/${this.bountyId}`,
                method: 'post',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    info: this.info
                }
            })
            .then(data => {
                this.bountyId = ''
                console.log(data.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    created() {
        this.getData()
    },
    watch: {
        needreset() {
            if (this.needreset) {
                console.log('reset data')
                this.getData()
            }
        }
    },
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="card col-md-4 col-sm-4 col-12 mt-3 "  style="width: 15rem; text-align: center" v-for="list in allList" v-on:click="getDetail(list._id)" data-toggle="modal" data-target="#detailModal">
                <img class="card-img-top mt-4" :src="list.avatar"
                    alt="Card image cap" style="height: 300px; width: 300px; margin: 0 auto">
                <div class="card-body">
                    <h3 class="card-title">{{list.name}}</h3>
                        <h5 class="card-title">Gender: {{list.gender}}</h5>
                    <h5 class="card-title">Age: {{list.age}}</h5>
                    <h5 class="card-title">Hair Color: {{list.hairColor}}</h5>
                    <button v-if='list.userId !== currentuser.id' style='height:40px' data-toggle="modal" data-target="#sendinfo" @click='saveId(list._id)'>Send Information</button>
                    <div v-else style='height:40px'></div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="fb-share-button card-link" :data-href="list.avatar" data-layout="button_count"></div>
                        </div>
                        <div class="col-sm-4">
                            <a class="twitter-share-button" :href="'https://twitter.com/intent/tweet?text=Help us to find someone ' + list.avatar "  data-size="large">Tweet</a>
                        </div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-info">Get Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="sendinfo" tabindex="-1" role="dialog" aria-labelledby="sendinfoLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sendinfoLabel">Send Information</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="info">Information</label>
                        <textarea type="text" class="form-control" id="info" placeholder="Please add detailed information here" v-model="info" rows='3'></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="sendInfo">Send Information</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Detail Bounty</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Photo: </h5>
            <img :src="detailBounty.avatar"></img>
            <h5> Name: </h5>
            <h3>{{detailBounty.name}}</h3>
            <h5> Age: </h5>
            <h4> {{detailBounty.age}} </h4>
            <h5> Hair color: </h5>
            <h4> {{detailBounty.hairColor}} </h4>
            <h5> Detail: </h5>
            <h4> {{detailBounty.detail}} </h4>
            <h5> Last seen: </h5>
            <h4> {{detailBounty.lastseen}} </h4>
            <h5> Bounty Price: </h5>
            <h4> $ {{detailBounty.bountyPrice}} Usd</h4>
            <h5> Contact Info: </h5>
            <h4> {{detailBounty.contactInfo}} </h4>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
      
    </div>`
});