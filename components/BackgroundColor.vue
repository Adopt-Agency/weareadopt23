<template>
  <div :class="{ otherColor: isSignIn }">
    <Slot />
  </div>
</template>

<script>
export default {
  computed: {
    isSignIn() {
      return this.$route.path === "/studio";
    },
  },
};
</script>

<style scoped>
.otherColor {
  background-color: #d4d4d4; 
}
</style>
