<script>
  export let Information;
  import SocialMediaIcons from "./SocialMediaIcons.svelte";
</script>

<hr />
<div class="container">
  <div>
    <p class="sub">Contact Info:</p>
    <p>✉ {Information.email}</p>
  </div>
  <div>
    <p>☎ {Information.phone}</p>
    <p class="location">🌴 {Information.location}</p>
  </div>
</div>
<footer class="icons">
  <SocialMediaIcons {Information} />
</footer>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  hr {
    margin-bottom: 1rem;
  }

  .sub {
    font-weight: bold;
    font-style: italic;
    color: var(--primary);
    margin-right: 0.5rem;
  }

  .location {
    text-align: center !important;
  }

  @media (max-width: 768px) {
    .container {
      display: block;
    }

    hr {
      display: none;
    }
  }

  .icons {
    display: flex;
    justify-content: center;
    height: 2rem;
    position: relative;
    bottom: -2rem;
  }
</style>
