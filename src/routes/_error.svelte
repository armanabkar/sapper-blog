<script>
  export let status;
  export let error;
  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>Oops! Something went wrong... - {status}</title>
</svelte:head>
<div class="container">
  {#if status === 404}
    <h2>Ooops!</h2>
    <h2>We can't seem to find the page you're looking for...</h2>
  {:else}
    <h2>{status}</h2>
    <h2>{error.message}</h2>
  {/if}

  {#if dev && error.stack}
    <p>{error.stack}</p>
  {/if}

  <a href=".">Go to Home Page</a>
</div>

<style>
  h2 {
    margin: 2rem 0;
  }

  a {
    font-weight: 500;
  }
</style>
