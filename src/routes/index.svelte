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
    <h1>
      <span class="greet">Hi, I'm </span><span class="name"
        >{Information.name}</span
      >
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
    min-height: 400px;
  }

  .home-copy {
    flex: 1;
    padding-bottom: 3rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1.8em;
    line-height: 1.55;
    margin-left: 0.2rem;
    margin-top: -0.3rem;
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

  @media (max-width: 834px) {
    .home-container {
      position: relative;
      flex-direction: column;
      justify-content: center;
    }

    .home-copy {
      flex: 0;
      text-align: center;
      padding: 0;
      margin-top: -0.1rem;
    }

    .name {
      display: block;
    }

    p {
      font-size: 1.5em;
      line-height: 1.6;
      margin: 0 auto;
    }

    img {
      width: 300px;
      height: 300px;
      padding: 2rem 0 0 0;
    }

    .home-container {
      justify-content: start;
    }

    .greet {
      font-size: 0.9em;
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
