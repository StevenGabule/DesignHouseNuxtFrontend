<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Change Password
      </h1>
      <form class="auth-form" @submit.prevent="reset">
        <alert-success :form="form">
          {{ status }}
          <p>
            <nuxt-link to="/login">Proceed to login</nuxt-link>
          </p>
        </alert-success>
        <div class="form-group">
          <input
            type="text"
            readonly
            name="email"
            v-model="form.email"
            class="form-control form-control-lg font-14 fw-300 "
            :class="{'is-invalid' : form.errors.has('email') }"
            placeholder="Email"
          />
          <has-error :form="form" field="email"/>
        </div>

        <div class="form-group">
          <input
            type="password"
            name="password"
            v-model="form.password"
            class="form-control form-control-lg font-14 fw-300 "
            :class="{'is-invalid' : form.errors.has('password') }"
            placeholder="New Password"
          />
          <has-error :form="form" field="password"/>
        </div>

        <div class="form-group">
          <input
            type="password"
            name="password_confirmation"
            v-model="form.password_confirmation"
            class="form-control form-control-lg font-14 fw-300 "
            :class="{'is-invalid' : form.errors.has('password_confirmation') }"
            placeholder="Confirm Password"
          />
          <has-error :form="form" field="password_confirmation"/>
        </div>

        <div class="text-right">
          <button type="submit" :disabled="form.busy"
                  class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Reset Password
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          <nuxt-link class="color-blue"
                     :to="{ name: 'login' }">
            Back to login
          </nuxt-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ResetEmail',
    data() {
      return {
        status: '',
        form: this.$vform({
          email: '',
          password: '',
          password_confirmation: '',
          token: ''
        })
      };
    },
    methods: {
      reset() {
       this.form.post('/password/reset')
         .then((res) => {
           this.status = res.data.status;
           this.form.reset();
         })
         .catch((err) => console.error(err));
      }
    },
    created() {
      console.log(this.$route.query);
      this.form.email = this.$route.query.email;
      this.form.token = this.$route.params.token;
    }
  }
</script>

<style scoped>

</style>
