<script>
  export let Information;
</script>

{#if Information.experiences.length > 0}
  <p>
    <span class="prefix">Experiences:</span>
    {#each Information.experiences as experience}
      <p>
        <strong>{experience.position}</strong> in {experience.company} <br />
        <span class="date">{experience.location} | {experience.date}</span>
      </p>
    {/each}
  </p>
{/if}

<style>
  .date {
    font-size: 0.9rem;
  }
</style>
