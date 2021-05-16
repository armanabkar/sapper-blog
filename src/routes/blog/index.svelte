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
  import { paginate } from "../../utils/Pagination/index";
  import Pagination from "../../utils/Pagination/Pagination.svelte";
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
  {#each paginatedPosts as post, index}
    {#if index}
      <hr />
    {/if}
    <Post {post} />
  {/each}
  <hr />
  <Pagination
    class="paginator"
    totalItems={items.length}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
  />
</div>
