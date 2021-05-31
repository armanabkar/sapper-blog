<script>
  export let Information;
</script>

<p>
  {#if Information.experiences.length > 0}
    <span class="prefix">Experiences:</span>
    {#each Information.experiences as experience}
      <br />
      <span>
        {experience.position} in {experience.company} |
        {experience.location} | {experience.date}
      </span>
    {/each}
  {/if}
</p>
