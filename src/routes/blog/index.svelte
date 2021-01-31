<script context="module">
  let items;
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        items = posts;
      });
  }
</script>

<script>
  import { fadeIn, fadeOut } from "../../utils/pageFade";
  import { paginate, PaginationNav } from "svelte-easy-paginate";

  export let posts;

  let currentPage = 1;
  let pageSize = 15;
  $: paginatedPosts = paginate({ items, pageSize, currentPage });
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  {#if currentPage === 1}
    <h2 class="title">
      Here are some of my ideas, thoughts and favourite articles:
    </h2>
  {:else}
    <h2 class="title">Page {currentPage}</h2>
  {/if}
  {#each paginatedPosts as post, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></h2>
      <p>{post.excerpt}</p>
      <div class="post-item-footer">
        <span class="post-item-date">— {post.printDate}</span>
      </div>
    </div>
  {/each}
  <hr />
  <PaginationNav
    class="paginator"
    totalItems={items.length}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
  />
</div>

<style>
  h2,
  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: var(--grey);
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }

  hr {
    margin: 3rem auto;
  }

  @media (max-width: 1020px) {
    .container {
      text-align: center;
      margin: 0 auto;
    }

    hr {
      margin: 2rem auto;
    }
  }
</style>
