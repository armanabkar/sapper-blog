<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === "development";
</script>

<style>
	h2,
	p {
		font-size: 3em;
		text-align: center;
	}

	h2 {
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	img {
		max-width: 40%;
		margin: 1rem auto 1rem auto;
	}

	a {
		border: 3px solid #2195f3d8;
		text-decoration: none;
		font-weight: bold;
		color: #2196f3;
		padding: 0.3rem;
		transition: color linear 0.15s;
		border-radius: 3px;
		text-align: center;
		max-width: 10rem;
		margin: 1.5rem auto 0 auto;
	}
	a:hover {
		background-color: #2196f3;
		color: whitesmoke;
	}

	@media (max-width: 1020px) {
		h2,
		p {
			font-size: 2em;
			text-align: center;
		}
		img {
			max-width: 70%;
			margin: 2rem auto 2rem auto;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

{#if status === 404}
	<h2>Ooops! We can't find that page.</h2>
{:else}
	<h2>{status}</h2>
{/if}

{#if status === 404}
	<img src="undraw_page_not_found_su7k.svg" alt="page not found" />
	<a href=".">Go to Home Page</a>
{:else}
	<p>{error.message}</p>
{/if}

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
