<script>
  import ThemeToggle from "../components/UI/ThemeToggle.svelte";
  import Header from "../components/UI/Header.svelte";
  import { Information } from "../information";

  export let segment;
</script>

<div class="layout">
  <Header {segment} {Information} />

  <main>
    <slot />
  </main>

  <footer>
    {#if segment !== undefined}
      <div class="theme-toggle">
        <ThemeToggle />
      </div>
    {/if}
    <span> &copy; {new Date().getFullYear()} {Information.name} </span>
  </footer>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-height: 100vh;
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

  .theme-toggle {
    position: absolute;
    left: 1rem;
  }
</style>
