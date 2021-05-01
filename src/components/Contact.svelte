<script>
  export let Information;
  import SocialMediaIcons from "./SocialMediaIcons.svelte";
</script>

<p class="prefix">Contact Info:</p>
<div class="container">
  <p>✉ {Information.email}</p>
  <p>🌎 {Information.location}</p>
</div>
<SocialMediaIcons {Information} />

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1em;
  }

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    .container {
      display: block;
    }
  }
</style>
