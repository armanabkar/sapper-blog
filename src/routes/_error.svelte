<script>
  export let status;
  export let error;
  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>
<div>
  {#if status === 404}
    <h1>Ooops!</h1>
    <h2>We can't seem to find the page you're looking for...</h2>
  {:else}
    <h2>{status}</h2>
    <h2>{error.message}</h2>
  {/if}

  {#if dev && error.stack}
    <h2>{error.stack}</h2>
  {/if}

  <a href=".">Go to Home Page</a>
</div>

<style>
  div {
    text-align: left;
  }

  h2 {
    margin: 2rem 0;
  }

  a {
    color: inherit;
    transition: color linear 0.15s;
    text-decoration: none;
    box-shadow: inset 0 -0.12em 0 var(--primary);
    -webkit-transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  a:hover {
    box-shadow: inset 0 -1.5em 0 var(--primary);
    color: var(--white);
  }

  @media (max-width: 768px) {
    div {
      text-align: center;
    }
  }
</style>
