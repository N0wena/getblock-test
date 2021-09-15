<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from './pages/MainPage.vue';

export default {
  name: 'App',

  components: {
    MainPage,
  },
};
</script>

<style lang="scss">
@import './styles/style.scss';

#app {
  min-width: 100vw;
  min-height: 100vh;
  padding: 220px;
  font-family: 'Volkorn', Helvetica, Arial, sans-serif;
  font-size: var(--font-size-normal);
  font-weight: var(--font-weight-normal);
  color: var(--color-black);
  user-select: none;

  @media (max-width: 576px) {
    padding: 64px 16px 0;
  }
}

div {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
</style>
