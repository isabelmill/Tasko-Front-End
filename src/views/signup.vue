<template>
    <section class="signup-main-container flex">
        <div class="mello-logo-login">
            <img
                src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648495274/ujlrratduzckpypdosan.jpg"
                alt
            />
            <h1>Mello</h1>
        </div>
        <div class="signup-container">
            <h1>Sign up for your account</h1>
            <input placeholder="Enter email" type="email" />
            <input placeholder="Enter password" type="password" />
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
    </section>
</template>


<script>
export default {

    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        goToLogin() {
            this.$router.push(`/login`)
        }
    },
    components: {
    },
}
</script>