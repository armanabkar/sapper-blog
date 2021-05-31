<script>
  export let Information;
</script>

<p>
  <span class="prefix">Skills:</span><br class="hidden" />
  {Information.skills}
</p>
<p>
  <span class="prefix">Interests:</span><br class="hidden" />
  {Information.interests}
</p>
<p>
  <span class="prefix">Links:</span><br class="hidden" /><a href="projects"
    >Projects</a
  >
  | <a href="/articles">Articles</a>
</p>

<style>
  a {
    font-weight: 500;
  }

  @media (min-width: 768px) {
    .hidden {
      display: none;
    }
  }
</style>
