Vue.component('list-bounty', {
    data: function(){
        return {
            allList: []
        }
    },
    props: [''],
    methods: {

    },
    created(){
        axios({
            method: 'GET',
            url: 'http://localhost:3000/bounty'
        })
        .then((result) => {
            console.log(result.data.data);
            if(result.data){
                this.allList = result.data.data
            } else {
                console.log('no bounty data');
            }
        }).catch((err) => {
            console.log(err);
        });
       },
    template: `
    <div class="container-fluid">
        <div class="row">
        <div class="card col-md-3 col-sm-4 col-12 mr-3 mt-3 "  style="width: 15rem; text-align: center" v-for="list in allList">
            <img class="card-img-top" :src="list.avatar"
                alt="Card image cap" style="height: 300px; width: 300px; margin: 0 auto">
            <div class="card-body">
                <h3 class="card-title">{{list.name}}</h3>
                    <h5 class="card-title">{{list.gender}}</h5>
                <h5 class="card-title">{{list.age}}</h5>
                <h5 class="card-title">Hair Color: {{list.hairColor}}</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-4">
                    
                    </div>
                <div class="col-sm-4">
                    <div class="fb-share-button card-link" data-href="https://storage.googleapis.com/bountyhunter/1539269853811adult-beard-boy-220453.jpg"
                        data-layout="button_count"></div>
                </div>
                <div class="col-sm-4"><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Help us to find someone https://storage.googleapis.com/bountyhunter/1539269853811adult-beard-boy-220453.jpg"
                        data-size="large">Tweet</a></div>
                </div>
            </div>
        </div>
        </div>
    </div>`
})