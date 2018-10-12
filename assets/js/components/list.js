Vue.component('list-bounty', {
    data: function () {
        return {
            allList: []
        }
    },
    props: ['needreset'],
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
        <div class="card col-md-4 col-sm-4 col-12 mt-3 "  style="width: 15rem; text-align: center" v-for="list in allList">
            <img class="card-img-top mt-4" :src="list.avatar"
                alt="Card image cap" style="height: 300px; width: 300px; margin: 0 auto">
            <div class="card-body">
                <h3 class="card-title">{{list.name}}</h3>
                    <h5 class="card-title">Gender: {{list.gender}}</h5>
                <h5 class="card-title">Age: {{list.age}}</h5>
                <h5 class="card-title">Hair Color: {{list.hairColor}}</h5>
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
    </div>`
})