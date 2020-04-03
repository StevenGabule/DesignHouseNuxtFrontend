<template>
  <div>
    <section class="hero text-center bg-secondary text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Upload a design
        </h1>
      </div>
    </section>
    <!-- Upload Shot -->
    <div class="upload-shot">
      <div class="container">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div class="alert alert-danger" v-if="error">
                  <p>An error occurred during the upload process</p>
                  <p>{{ error }}</p>
                </div>
                <slim-cropper :options="slimOptions">
                  <input type="file" name="image">
                </slim-cropper>
                <div class="text-success caption-sm mt-2">
                  <i class="fas fa-spinner fa-spin" v-if="uploading"></i>
                </div>
              </div>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400">
                Your image dimension must be least 800pp x 600px in size. Also the image size should be a
                maximum of 2MB. Please resize your file accordingly before you upload.
              </p>
            </div>
          </div><!-- end of col-md-5 -->
        </div><!-- end of row -->
      </div><!-- end of container -->
    </div>
  </div>
</template>

<script>
  import SlimCropper from '@/components/slim/slim.vue'

  export default {
    name: 'create',
    components: { SlimCropper },
    middleware: ['auth'],
    data() {
      return {
        slimOptions: {
          service: this.slimService,
          post: 'output',
          defaultInputName: 'image',
          minSize: '800,600',
          label: 'Select image...',
          maxFileSize: 2 // 2mb
        },
        uploading: false,
        error: ''
      }
    },
    methods: {
      slimService(formData, progress, success, failure, slim) {
        this.uploading = true
        this.$axios.post('/designs', formData).then((res) => {
          this.$router.push({
            name: 'designs.edit',
            params: { id: res.data.id }
          });
        }).catch((err) => {
          const message = err.response.data.errors
          this.error = message[Object.keys(message)[0]][0]
          failure(500)
          this.uploading = false
        })
          .finally(() => this.uploading = false)
      }
    }
  }
</script>

