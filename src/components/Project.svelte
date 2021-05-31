<script>
  export let project;
</script>

<div class="project">
  <div>
    <h2 class="projectName">{project.name}</h2>
    <p>
      {project.description}
    </p>
    <div class="links">
      <a href={project.code} target="_blank">Source Code</a>
      {#if project.live}
        <span class="spacer" />
        <a href={project.live} target="_blank">Live Demo</a>
      {:else if project.npm}
        <span class="spacer" />
        <a href={project.npm} target="_blank">npm</a>
      {/if}
    </div>
  </div>
  {#if project.imageUrl}
    <img src={project.imageUrl} alt={project.name} loading="lazy" />
  {/if}
</div>
<hr />

<style>
  img {
    margin: 0 0 0 3rem;
    height: 8rem;
    border-radius: 0.3em;
    width: auto;
  }

  p {
    margin: 0.9em 0;
  }

  .project {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .projectName {
    color: var(--primary);
    letter-spacing: 0.02rem;
    margin-top: 0;
  }

  .spacer {
    margin: 0 0.5rem;
  }

  a {
    font-size: 1.1em;
    font-weight: 500;
  }

  @media (max-width: 768px) {
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
      transform: scale(2) rotate(0.01deg);
      transform: scale(2) rotate(0.01deg);
    }
  }
</style>
