<script>
  export let Information;
</script>

{#if Information.experiences.length > 0}
  <p>
    {#each Information.experiences as experience}
      <p>
        <strong>{experience.position}</strong> in {experience.company} |
        {experience.location} | {experience.date}
      </p>
    {/each}
  </p>
{/if}

<style>
</style>
