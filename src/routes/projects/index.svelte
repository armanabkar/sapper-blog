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
  {#each paginatedProjects as project}
    <h2 class="projectName">{project.name}</h2>
    <div class="project">
      <div>
        <p>
          {project.description}<br />
          {#if project.technologies}
            {#each project.technologies as technology}
              <span class="technology">{technology}</span>
            {/each}
          {/if}
        </p>
        <div class="links">
          <a href={project.code} target="_blank">Source Code</a>
          {#if project.live}
            <span class="spacer" />
            <a href={project.live} target="_blank">Live Demo</a>
          {/if}
        </div>
      </div>
      <img src={project.imageUrl} alt="Project" />
    </div>
    <hr />
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

<style>
  img {
    margin: 2rem 0 0 2rem;
    max-height: 8.5rem;
    border-radius: 5px;
  }

  .project {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .technology {
    font-size: 0.8rem;
    margin-right: 0.9rem;
    color: var(--grey);
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

  .projectName {
    color: var(--primary);
    letter-spacing: 0.02rem;
  }

  .spacer {
    margin: 0 0.5rem;
  }

  @media (max-width: 768px) {
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
      padding: 0.3rem 0.3rem 0.1rem 0.2rem;
    }

    .links {
      margin: -0.5rem auto 1.5rem auto;
    }

    img {
      max-height: 20rem;
      max-width: 85%;
      margin: 0;
      padding: 0;
    }
  }

  @media (min-width: 768px) {
    img {
      transition: -webkit-transform 0.4s;
      transition: transform 0.4s;
    }
    img:hover {
      transform: scale(1.8) rotate(0.01deg);
      transform: scale(1.8) rotate(0.01deg);
    }
  }
</style>
