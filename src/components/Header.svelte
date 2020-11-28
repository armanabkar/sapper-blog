<script>
  import Logo from "./Logo.svelte";
  import Nav from "./Nav.svelte";

  export let segment;
</script>

<style>
  header {
    display: flex;
    margin: 0 auto;
    max-width: 1400px;
    padding: 1.5em 2em 1.5em 2em;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    header {
      padding: 1em 2em 1.5em 2em;
    }
  }
</style>

<header>
  <Logo />
  <Nav {segment} />
</header>
