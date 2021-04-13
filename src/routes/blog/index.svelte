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
  import Post from "../../components/Post.svelte";
  import { Information } from "../../information.config";

  export let posts;

  let currentPage = 1;
  let pageSize = 15;
  $: paginatedPosts = paginate({ items, pageSize, currentPage });
</script>

<svelte:head>
  <title>Blog - {Information.name} - {Information.position}</title>
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
    <Post {post} />
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
