<script>
  export let Information;

  import Nav from "./Nav.svelte";

  export let segment;
</script>

<header>
  <Nav {segment} />
</header>

<style>
  header {
    display: flex;
    margin: 0 auto;
    max-width: 1400px;
    padding: 0.9em 2em;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    header {
      padding: 0.8em 2em;
    }
  }
</style>
