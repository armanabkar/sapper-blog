<script>
  import Header from "../components/Header.svelte";

  export let segment;
</script>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-height: 100vh;
    background-color: #fafafa;
  }

  main {
    flex: 1;
    position: relative;
    margin: 0 auto;
    max-width: 1400px;
    padding: 1em 2em;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
  }

  footer {
    color: rgb(151, 151, 151);
    font-size: 1em;
    font-family: Rubik, sans-serif;
    margin: 1em auto 0 auto;
    max-width: 1400px;
    padding: 1em 2em;
    text-align: center;
    width: 100%;
    letter-spacing: 0.1rem;
  }
</style>

<div class="layout">
  <Header {segment} />

  <main>
    <slot />
  </main>

  <footer><span> &copy; {new Date().getFullYear()} Arman Abkar </span></footer>
</div>
