<script>
  import ThemeToggle from "../components/UI/ThemeToggle.svelte";
  import Header from "../components/UI/Header.svelte";
  import Loading from "../components/UI/Loading.svelte";
  import { Information } from "../information.config";
  import { stores } from "@sapper/app";
  const { preloading } = stores();

  export let segment;
</script>

<div class="layout">
  <Header {segment} {Information} />

  {#if $preloading && segment !== undefined}
    <Loading />
  {:else}
    <main>
      <slot />
    </main>

    <footer>
      {#if segment !== undefined}
        <div class="theme-toggle">
          <ThemeToggle />
        </div>
      {/if}
      <span>
        <a href="/">
          &copy; {new Date().getFullYear()}
          {Information.name}
        </a>
      </span>
    </footer>
  {/if}
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
    padding: 0 2em 1em 2em;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  footer {
    color: var(--tertiary);
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

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
