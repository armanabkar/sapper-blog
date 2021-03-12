<script>
  import SocialMediaIcons from "../components/SocialMediaIcons.svelte";
  import { Information } from "../information";
  import { fadeIn, fadeOut } from "../utils/pageFade";
</script>

<svelte:head>
  <title>{Information.name}</title>
  <meta
    name="description"
    content="{Information.position} from {Information.location}"
  />
  <meta
    name="keywords"
    content="{Information.name}, {Information.position}, {Information
      .skills[0]}, {Information[4]}, {Information[5]}"
  />
  <meta
    name="google-site-verification"
    content="wduTXx2JFRwgDVWaT2sf0HBnOc-NzyPxkxaNj_DJVPQ"
  />
</svelte:head>

<div class="home-container" in:fadeIn out:fadeOut>
  <div class="home-copy">
    <h1>Hi, I'm <a class="name" href="about">{Information.name}</a></h1>
    <p>
      {Information.position}
      <span class="location">from {Information.location}</span>
    </p>
  </div>

  <img alt="globe-armanabkar" src="globe.svg" />
</div>

<footer class="icons">
  <SocialMediaIcons {Information} />
</footer>

<style>
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 0;
    min-height: 400px;
  }

  .home-copy {
    flex: 1;
    padding-bottom: 1.5rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1.6em;
    line-height: 1.5;
    letter-spacing: 0.02rem;
    margin-left: 0.2rem;
    margin-top: -0.1rem;
  }

  img {
    width: 350px;
    height: 350px;
    padding: 1rem;
  }

  .name {
    color: var(--primary);
    transition: color linear 0.15s;
    text-decoration: none;
  }

  .name:hover {
    color: var(--secondary);
  }

  .location {
    color: var(--grey);
    display: block;
    font-size: 1rem;
  }

  .icons {
    margin: 0 auto;
    padding: 0;
    height: 2rem;
    position: relative;
    bottom: -2rem;
  }

  @media (max-width: 834px) {
    .home-container {
      position: relative;
      flex-direction: column;
      margin: 0 auto;
      justify-content: center;
    }

    .home-copy {
      flex: 0;
      text-align: center;
      padding: 0;
    }

    .name {
      display: block;
    }

    p {
      font-size: 1.3em;
      line-height: 1.5;
      margin: 0 auto;
    }

    img {
      width: 250px;
      height: 250px;
      margin: 0;
      padding: 2rem 0 0 0;
    }

    .icons {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .home-container {
      justify-content: start;
    }
  }
</style>
