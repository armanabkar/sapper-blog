<script>
  export let Information;
</script>

<p>
  <span class="prefix">Skills:</span><br class="hidden" />
  {Information.skills} <br /> You can find some of my personal projects
  <a href="/projects">here</a>.
</p>
<p>
  <span class="prefix">Interests:</span><br class="hidden" />
  {Information.interests}
</p>

<style>
  @media (min-width: 768px) {
    .hidden {
      display: none;
    }
  }
</style>
