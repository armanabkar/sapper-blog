<script>
  export let Information;
  import SocialMediaIcons from "./SocialMediaIcons.svelte";
</script>

<hr />
<div class="container">
  <div>
    <p class="prefix">Contact Info:</p>
    <p>✉ {Information.email}</p>
  </div>
  <p>🌴 {Information.location}</p>
</div>
<SocialMediaIcons {Information} />

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  hr {
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .container {
      display: block;
    }

    hr {
      display: none;
    }

    p {
      margin: 0.25rem 0;
    }
  }
</style>
