<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Resend Verification Email
      </h1>
      <alert-error v-if="form.errors.has('message')" :form="form">
        {{ form.errors.get('message') }}
      </alert-error>

      <alert-success :form="form">
        We have resent the verification email
      </alert-success>


      <form class="auth-form" @submit.prevent="submit">
        <div class="form-group">
          <input
            type="text"
            v-model="form.email"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
          />
        </div>

        <div class="text-right">
          <button type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
            Resend
          </button>
        </div>
      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
  export default {
    name: 'resend',
    data() {
      return {
        form: this.$vform({
          email: '',
        })
      };
    },
    methods: {
      submit() {
        this.form.post('/verification/resend')
          .then((_) => this.form.reset())
          .catch((err) => console.error(err));
      }
    }
  }
</script>

<style scoped>

</style>
