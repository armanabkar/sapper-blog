<script>
  export let project;
</script>

<h2 class="projectName">{project.name}</h2>
<div class="project">
  <div>
    <p>
      {project.description}<br />
      {#if project.topics}
        {#each project.topics as topic}
          <span class="topic">{topic}</span>
        {/each}
      {/if}
    </p>
    <div class="links">
      <a class="link" href={project.code} target="_blank">Source Code</a>
      {#if project.live}
        <span class="spacer" />
        <a class="link" href={project.live} target="_blank">Live Demo</a>
      {:else if project.npm}
        <span class="spacer" />
        <a class="link" href={project.npm} target="_blank">npm</a>
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
    margin: 2rem 0 0 2rem;
    max-height: 8.5rem;
    border-radius: 0.3em;
    width: auto;
  }

  .project {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .topic {
    font-size: 0.8rem;
    margin-right: 0.9rem;
    color: var(--grey);
  }

  .projectName {
    color: var(--primary);
    letter-spacing: 0.02rem;
  }

  .spacer {
    margin: 0 0.5rem;
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
