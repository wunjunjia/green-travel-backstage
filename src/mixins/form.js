export default {
  methods: {
    trim(field) {
      this.formData[field] = this.formData[field].trim();
    },
  },
};