<script context="module">
  let items;
  export function preload({ params, query }) {
    return this.fetch(`articles.json`)
      .then((r) => r.json())
      .then((articles) => {
        items = articles;
      });
  }
</script>

<script>
  import { fadeIn, fadeOut } from "../../utils/pageFade";
  import { paginate } from "../../utils/Pagination/index";
  import Pagination from "../../utils/Pagination/Pagination.svelte";
  import Article from "../../components/Article.svelte";
  import { Information } from "../../information.config";

  export let articles;

  let currentPage = 1;
  let pageSize = 15;
  $: paginatedArticles = paginate({ items, pageSize, currentPage });
</script>

<svelte:head>
  <title>Articles - {Information.name} - {Information.position}</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  {#each paginatedArticles as article, index}
    {#if index}
      <hr />
    {/if}
    <Article {article} />
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
