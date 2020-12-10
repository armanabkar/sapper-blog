<script>
  import { Projects } from "./projects";
</script>

<style>
  img {
    border-radius: 8px;
    height: 11rem;
    margin: 1rem 0rem 0rem 0.5rem;
  }

  .project {
    display: flex;
    justify-content: space-between;
  }

  a {
    border: 3px solid #6b63ffd8;
    text-decoration: none;
    font-weight: bold;
    color: #6c63ff;
    padding: 0.3rem;
    transition: color linear 0.15s;
    border-radius: 3px;
  }

  a:hover {
    background-color: #6c63ff;
    color: whitesmoke;
  }

  @media (max-width: 1020px) {
    .project {
      display: inline;
    }

    a {
      margin-top: 2rem;
      display: block;
      max-width: 8rem;
      margin-left: 0.5rem;
    }

    img {
      border-radius: 8px;
      max-height: 20rem;
    }
  }
</style>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div class="container">
  <h1>Projects</h1>
  {#each Projects as project, index}
    <h2>{project.name}</h2>
    <div class="project">
      <p>{project.description}</p>
      <img src={project.imageUrl} alt="Project" />
    </div>
    <a href={project.code} target="_blank">Source Code</a>
    <hr />
  {/each}
</div>
