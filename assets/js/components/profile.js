Vue.component('user-profile', {
    data: function () {
        return {

        }
    },
    props: ['currentuser'],
    methods: {

    },
    template: 
    `
        <div id="profile">
            <div id="profile-wrap">
                <div class="pulse1"></div>
                <div class="pulse2"></div>
                <div class="profile-overlay"></div>
                <div class="profile-image"></div>
                <div class="profile-name">
                    <h2>{{ currentuser.name }}<br>Goltermann<span> a berlin based graphic designer</span></h2>
                </div>
                <div class="profile-social">
                    <ul>
                        <li><a href="https://github.com/sublines" data-toggle="tooltip" title="github" target="_blank"><i class="fa fa-github"></i></a></li>
                        <li><a href="https://codepen.io/jascha" data-toggle="tooltip" title="Codepen" target="_blank"><i class="fa fa-codepen"></i></a></li>
                        <li><a href="http://jaschagoltermann.com" data-toggle="tooltip" title="Website" target="_blank"><i class="fa fa-link"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    `
})