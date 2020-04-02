<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Login
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-error v-if="form.errors.has('verification')" :form="form">
          {{ form.errors.get('verification') }}
          <nuxt-link :to="{name: 'verification.resend'}">Resend Verification Email</nuxt-link>
        </alert-error>
        <div class="form-group">
          <base-input
            :form="form"
            field="email"
            v-model="form.email"
            placeholder="Email"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            :form="form"
            field="password"
            inputType="password"
            v-model="form.password"
            placeholder="Password"
          ></base-input>
        </div>
        <div class="mt-4 mb-4 clearfix">
          <nuxt-link
            class="forgot-pass color-blue font-14 fw-400"
            :to="{name: 'password.email'}"> Forgot password? </nuxt-link>
        </div>
        <div class="text-right">
          <base-button :loading="form.busy">Log In</base-button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Don't have an account yet?
          <nuxt-link class="color-blue" :to="{ name: 'register' }"> Create an account</nuxt-link>
        </p>
      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
  export default {
    name: 'login',
    middleware: ['guest'],
    data() {
      return {
        form: this.$vform({
          email: '',
          password: '',
        })
      };
    },
    methods: {
      submit(field, messages) {
         this.$auth.loginWith('local', {
           data: this.form
         }).then((res) => {
           console.log(res)
         }).catch((err) => {
           this.form.errors.set(err.response.data.errors, messages);
         });
      }
    }
  }
</script>
