<script>
  export let project;
</script>

<div class="project">
  <div>
    <h2 class="projectName">
      {project.name}
      {#if project.category}
        <span>{project.category}</span>
      {/if}
    </h2>
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
    height: 7em;
    border-radius: 0.3em;
    width: auto;
  }

  p {
    margin: 0.75em 0;
    font-size: 1.25em;
  }

  .project {
    display: flex;
    align-items: center;
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

  h2 span {
    font-size: 0.9rem;
    color: var(--secondary);
  }

  @media (max-width: 768px) {
    .project {
      display: inline;
    }

    a {
      margin-top: 2rem;
      max-width: 8rem;
      padding: 0.3rem 0.3rem 0.1rem 0.2rem;
    }

    .links {
      margin-bottom: 1.5rem;
      text-align: center;
    }

    img {
      margin: 0 auto;
      padding: 0;
      display: flex;
      justify-content: center;
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
