<script>
  import Nav from "./Nav.svelte";

  export let segment;
</script>

<style>
  header {
    display: flex;
    margin: 0 auto;
    max-width: 1400px;
    padding: 0.9em 2em 1.5em 2em;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    header {
      padding: 0.8em 2em 1.5em 2em;
    }
    .hidden-mob {
      display: none;
    }
  }

  a {
    align-items: flex-start;
    display: flex;
    flex: 1;
    font-family: Rubik, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    color: #2196f3;
    text-decoration: none;
    padding: 10px 5px;
    display: block;
    position: relative;
    letter-spacing: 0.1rem;
  }
</style>

<header>
  {#if segment !== undefined}<a class="hidden-mob" href=".">Arman Abkar</a>{/if}
  <Nav {segment} />
</header>
