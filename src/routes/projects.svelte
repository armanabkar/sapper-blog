<script>
  import { Projects, Information } from "../information.config";
  import { fadeIn, fadeOut } from "../utils/pageFade";
  import { paginate, PaginationNav } from "svelte-easy-paginate";
  import Project from "../components/Project.svelte";

  let items = Projects;
  let currentPage = 1;
  let pageSize = 13;
  $: paginatedProjects = paginate({ items, pageSize, currentPage });
</script>

<svelte:head>
  <title>Projects - {Information.name} - {Information.position}</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  {#if currentPage === 1}
    <h2 class="title">
      Some of my personal projects and open-source contributions:
    </h2>
  {:else}
    <h2 class="title">Page {currentPage}</h2>
  {/if}
  {#each paginatedProjects as project}
    <Project {project} />
  {/each}
  {#if items.length > pageSize}
    <PaginationNav
      totalItems={items.length}
      {pageSize}
      {currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage={(e) => (currentPage = e.detail.page)}
    />
  {/if}
</div>
