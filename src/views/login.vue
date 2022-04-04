<template>
    <section class="login-main-container flex">
        <div class="tasko-logo-login">
            <img
                src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648495274/ujlrratduzckpypdosan.jpg"
                alt
            />
            <h1>Tasko</h1>
        </div>
        <div class="login-container">
            <h1>Log in to Tasko</h1>
            <input v-model="user.username" placeholder="Enter username" type="text" />
            <input
                v-model="user.password"
                placeholder="Enter password"
                type="password"
                name="password"
                autocomplete="on"
            />
            <button @click.stop.prevent="login">Log in</button>
            <a>OR</a>
            <div class="google-btn">
                <img
                    src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg"
                    alt
                />
                <span>Continue with Google</span>
            </div>
            <hr />
            <p @click.stop.prevent="goToSignup">Sign up for an account</p>
        </div>
    </section>
</template>


<script>
export default {

    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    computed: {

    },
    methods: {
        goToSignup() {
            this.$router.push(`/signup`)
        },
        login() {
            if (!this.user.username || !this.user.password) return 
            this.$store.dispatch({ type: 'login', user: this.user })
            this.user = {
                username: '',
                password: '',
            }
            this.$router.push(`/board`)
        },
    },
    components: {
    },
}
</script>