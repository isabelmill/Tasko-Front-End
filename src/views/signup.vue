<template>
    <section class="signup-main-container flex">
        <div class="tasko-logo-login">
            <img
                src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648495274/ujlrratduzckpypdosan.jpg"
                alt
            />
            <h1>Tasko</h1>
        </div>
        <form @submit.prevent="signup" action="signup">
            <div class="signup-container">
                <h1>Sign up for your account</h1>
                <input v-model="newUser.username" placeholder="Enter username" type="text" />
                <input v-model="newUser.fullname" placeholder="Enter full name" type="text" />
                <div z-index="0" class="password-input">
                    <input
                    v-model="newUser.password"
                    ref="password"
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    autocomplete="on"
                />
                <img v-if="!showPassword" @click="togglePassword" src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648544011/jsq38zvscccvdrfjjtr4.svg" alt="">
                <img v-if="showPassword" @click="togglePassword" src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648544013/smt79blx0tym7pk2mwc4.svg" alt="">
                </div>
                 <!-- <p @click="togglePassword" >Show / Hide</p> -->
                <button class="signup-btn">Sign up</button>
                <a>OR</a>
                <div class="google-btn">
                    <img
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg"
                        alt
                    />
                    <span>Continue with Google</span>
                </div>
                <hr />
                <p @click="goToLogin">Already have an account? Log in</p>
            </div>
        </form>
    </section>
</template>


<script>
export default {

    data() {
        return {
            showPassword: false,
            newUser: {
                fullname: '',
                username: '',
                password: '',
            }
        }
    },
    computed: {
        // loggedinUser() {
        //     return this.$store.getters.loggedinUser
        // },
    },
    methods: {
        goToLogin() {
            this.$router.push(`/login`)
        },
        signup() {
            if(!this.newUser.fullname || !this.newUser.username || !this.newUser.password) {
                console.log('sorry every input is required');
                return
            }
            this.$store.dispatch({ type: 'signup', user: this.newUser })
            this.$router.push(`/board`)
            this.newUser = {
                fullname: '',
                username: '',
                password: '',
            }
        },
        togglePassword() {
            this.showPassword = !this.showPassword
             const passwordField = this.$refs['password']
            if (passwordField.getAttribute('type') === 'password') passwordField.setAttribute('type', 'text')
            else passwordField.setAttribute('type', 'password')
        }
    },
    components: {
    },
}
</script>