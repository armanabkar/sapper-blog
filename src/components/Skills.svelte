<script>
  export let Information;
</script>

<p>
  <span class="prefix">Skills:</span>
  {#each Information.skills as skill}
    <br />
    <span>{skill}</span>
  {/each}
</p>
<p>
  <span class="prefix">Education and Certificates:</span>
  {#each Information.education as education}
    <br />
    <span style="font-size: 0.95em;">
      {@html education}
    </span>
  {/each}
</p>
<p>
  <span class="prefix">Links:</span><br /><a href="projects">Projects</a>
  | <a href="/articles">Articles</a>
</p>

<style>
  a {
    font-weight: 500;
  }
</style>
