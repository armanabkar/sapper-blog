<script>
  export let Information;
</script>

<span class="prefix">Experiences:</span>
{#each Information.experiences as experience}
  <h3>{experience.position}</h3>
  <h4>
    {experience.company} - {experience.location} <br />
    <span class="date">{experience.date}</span>
  </h4>
{/each}

<style>
  h3 {
    margin: 1rem 0 0 0;
    font-size: 1.3rem;
  }

  h4 {
    font-weight: 400;
    font-size: 1rem;
  }

  .date {
    font-size: 0.9rem;
  }
</style>
