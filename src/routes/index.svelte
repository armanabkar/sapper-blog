<script>
  import { Information } from "../information.config";
  import { fadeIn, fadeOut } from "../utils/pageFade";
</script>

<svelte:head>
  <title>{Information.name} - {Information.position}</title>
  <meta
    name="description"
    content="{Information.position} from {Information.location}"
  />
  <meta name="keywords" content={Information.keywords} />
  <meta
    name="google-site-verification"
    content="wduTXx2JFRwgDVWaT2sf0HBnOc-NzyPxkxaNj_DJVPQ"
  />
</svelte:head>

<div class="home-container" in:fadeIn out:fadeOut>
  <div class="home-copy">
    <h1 class="name">
      {Information.name}
    </h1>
    <p>
      {Information.position}
      <span class="location">from {Information.location}</span>
    </p>
  </div>
  <img alt={`globe-${Information.email}`} src="globe.svg" loading="lazy" />
</div>

<style>
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .home-copy {
    flex: 1;
    padding-bottom: 3.5rem;
    padding-left: 1rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0.3em;
  }

  p {
    font-size: 1.8em;
    line-height: 1.55;
    margin-left: 0.2rem;
    margin-top: -1.25rem;
  }

  img {
    width: 350px;
    height: 350px;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .name {
    color: var(--primary);
  }

  .location {
    color: var(--tertiary);
    display: block;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .home-container {
      position: relative;
      flex-direction: column;
      justify-content: center;
    }

    .home-copy {
      flex: 0;
      text-align: center;
      padding: 0;
      margin-top: -0.25rem;
    }

    p {
      font-size: 1.5em;
      line-height: 1.6;
      margin: -0.75rem auto 0 auto;
    }

    img {
      width: 300px;
      height: 300px;
      padding: 2rem 0 0 0;
    }

    .home-container {
      justify-content: start;
    }

    .location {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 600px) {
    img {
      width: 250px;
      height: 250px;
    }
  }
</style>
