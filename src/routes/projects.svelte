<script>
  import { Projects, Information } from "../information.config";
  import { fadeIn, fadeOut } from "../utils/pageFade";
  import { paginate } from "../utils/Pagination/index";
  import Pagination from "../utils/Pagination/Pagination.svelte";
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
  <br />
  {#each paginatedProjects as project}
    <Project {project} />
  {/each}
  <Pagination
    totalItems={items.length}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
  />
</div>
