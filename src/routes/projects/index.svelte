<script>
  import { Projects } from "./projects";
  import { fadeIn, fadeOut } from "../../utils/pageFade";
  import { paginate, PaginationNav } from "svelte-easy-paginate";

  let items = Projects;
  let currentPage = 1;
  let pageSize = 13;
  $: paginatedProjects = paginate({ items, pageSize, currentPage });
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  {#if currentPage === 1}
    <h2 class="title">
      Some of my personal projects and open-source contributions:
    </h2>
  {:else}
    <h2 class="title">Page {currentPage}</h2>
  {/if}
  {#each paginatedProjects as project, index}
    <h2>{project.name}</h2>
    <div class="project">
      <p>{project.description}</p>
      <img src={project.imageUrl} alt="Project" />
    </div>
    <div class="links">
      <a href={project.code} target="_blank">Source Code</a>
      {#if project.live}
        <a href={project.live} target="_blank">Live Demo</a>
      {/if}
    </div>
    <hr />
  {/each}
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
  img {
    max-height: 11.5rem;
    max-width: 18.5rem;
    padding: 2rem 0 0 1rem;
  }

  .project {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  a {
    border: 3px solid var(--primary);
    text-decoration: none;
    font-weight: bold;
    color: var(--primary);
    padding: 0.3rem;
    transition: color linear 0.15s;
    border-radius: 3px;
    text-align: center;
  }

  a:hover {
    background-color: var(--primary);
    color: whitesmoke;
  }

  @media (max-width: 1020px) {
    .container {
      text-align: center;
      margin: 0 auto;
    }

    .project {
      display: inline;
    }

    a {
      margin: 2rem auto 0 auto;
      max-width: 8rem;
      padding: 0.4rem;
    }

    .links {
      margin-top: 2rem;
    }

    img {
      max-height: 20rem;
      padding: 0;
    }
  }
</style>
