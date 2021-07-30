<script>
  export let Information;
</script>

<p>
  <span class="prefix">Experiences:</span>
  {#each Information.experiences as experience}
    <br />
    <span>
      {@html experience.title}
    </span>
    <br />
    <span style="font-size: 0.95em;">{@html experience.description}</span>
  {/each}
</p>
