Vue.component('user-profile', {
    data: function () {
        return {
            bountyAvatar: '',
            bountyName: '',
            bountyDetail: '',
            bountyLastSeen: '',
            bountyPrice: '',
            contactInfo: ''
        }
    },
    props: ['host', 'currentuser'],
    methods: {
        onFileChange(event) {
            this.bountyAvatar = event.target.files[0]
        },
        addBounty() {
            let formData = new FormData()
            
            formData.append('image', this.bountyAvatar)
            formData.append('name', this.bountyName)
            formData.append('detail', this.bountyDetail)
            formData.append('lastSeen', this.bountyLastSeen)
            formData.append('bountyPrice', this.bountyPrice)
            formData.append('contactInfo', this.contactInfo)

            axios.post(`${this.host}/uploads`, formData)
            axios({
                method: 'post',
                url: `${this.host}/uploads`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            })
            .then(data => {
                console.log(data)
                this.bountyAvatar = '',
                this.bountyName = '',
                this.bountyDetail = '',
                this.bountyLastSeen = '',
                this.contactInfo = '',
                this.$emit('resetlist')
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
        }
    },
    template: 
    `
    <div>
        <div id="profile">
            <div id="profile-wrap">
                <div class="pulse1"></div>
                <div class="pulse2"></div>
                <div class="profile-overlay"></div>
                <div class="profile-image" v-bind:style="{background: 'url(' + currentuser.avatar + ')'}"></div>
                <div class="profile-name">
                    <h2>{{ currentuser.name }}<span style='color: transparent'>placeholder</span></h2>
                </div>
                <div class="profile-social">
                    <ul>
                        <li><button title="Add Bounty Target" data-toggle="modal" data-target="#addBountyModal"><i class="fas fa-plus-circle"></i></button></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addBountyModal" tabindex="-1" role="dialog" aria-labelledby="addBountyModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addBountyModalLabel">Add Bounty</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="avatar">Avatar</label>
                        <input type="file" id="bountyAvatar" name="avatar" accept="image/png, image/jpeg" v-on:change = "onFileChange">
                    </div>
                    <div class="form-group">
                        <label for="bountyName">Bounty Name</label>
                        <input type="text" class="form-control" id="bountyName" placeholder="Bounty Name" v-model="bountyName">
                    </div>
                    <div class="form-group">
                        <label for="bountyDetail">Bounty Detail</label>
                        <input type="text" class="form-control" id="bountyDetail" placeholder="Bounty Detail" v-model="bountyDetail">
                    </div>
                    <div class="form-group">
                        <label for="bountyLastSeen">Last Seen On</label>
                        <input type="text" class="form-control" id="bountyLastSeen" placeholder="Bounty Last Seen" v-model="bountyLastSeen">
                    </div>
                    <div class="form-group">
                        <label for="bountyPrice">Bounty Price</label>
                        <input type="text" class="form-control" id="bountyPrice" placeholder="Bounty Price" v-model="bountyPrice">
                    </div>
                    <div class="form-group">
                        <label for="contactInfo">Contact Info</label>
                        <input type="text" class="form-control" id="contactInfo" placeholder="Contact Info" v-model="contactInfo">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addBounty">Add Bounty</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    `
})