<script>
  import DarkModeToggle from "../components/DarkModeToggle.svelte";
  import Header from "../components/Header.svelte";

  export let segment;
</script>

<div class="layout">
  <Header {segment} />

  <main>
    <slot />
  </main>

  <footer>
    {#if segment == "about"}
      <div>
        <DarkModeToggle />
      </div>
    {/if}
    <span> &copy; {new Date().getFullYear()} Arman Abkar </span>
  </footer>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-height: 100vh;
    background-color: var(--white);
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
    background-color: var(--white);
  }

  footer {
    color: var(--grey);
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
