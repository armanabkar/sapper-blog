<script>
  import { fadeIn, fadeOut } from "../utils/pageFade";
</script>

<svelte:head>
  <title>Arman Abkar</title>
  <meta name="description" content="Software Developer from Isfahan, Iran" />
  <meta
    name="keywords"
    content="Arman Abkar, Full-Stack, Web Developer, React, Vue, Node.js"
  />
  <meta
    name="google-site-verification"
    content="wduTXx2JFRwgDVWaT2sf0HBnOc-NzyPxkxaNj_DJVPQ"
  />
</svelte:head>

<div class="home-container" in:fadeIn out:fadeOut>
  <div class="home-copy">
    <h1>Hi, I'm <a class="name" href="about">Arman Abkar</a></h1>
    <p>
      Software Developer
      <span class="location">from Isfahan, Iran</span>
    </p>
  </div>

  <figure>
    <img alt="Person typing on laptop" src="undraw_programming_2svr.svg" />
    <figcaption>
      Illustration thanks to
      <a href="https://undraw.co" rel="noopener noreferrer" target="_blank"
        >Undraw</a
      >
    </figcaption>
  </figure>
</div>

<footer class="icons">
  <div>
    <a
      href="https://www.linkedin.com/in/armanabkar/"
      target="_blank"
      aria-label="Linkedin"
      rel="noopener noreferrer"><i class="fab fa-linkedin-in fa-2x" /></a
    >
    <a
      class="logo"
      aria-label="Github"
      href="https://github.com/armanabkar"
      target="_blank"
      rel="noopener noreferrer"><i class="fab fa-github fa-2x" /></a
    >
    <a
      class="logo"
      aria-label="StackOverflow"
      href="https://stackoverflow.com/users/12696103/arman-abkar"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab fa-stack-overflow fa-2x" />
    </a>
    <a
      class="logo"
      aria-label="Twitter"
      href="https://twitter.com/armanabkar"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab fa-twitter fa-2x" />
    </a>
    <a
      class="logo"
      aria-label="Instagram"
      href="https://www.instagram.com/armanabkar/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab fa-instagram fa-2x" />
    </a>
  </div>
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
    padding-bottom: 2rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1.5em;
    line-height: 1.5;
    letter-spacing: 0.02rem;
    margin-left: 0.2rem;
    margin-top: -0.1rem;
  }

  figure {
    margin: 0 1em;
    padding-top: 2rem;
    margin-bottom: 0.5rem;
    text-align: center;
    color: var(--grey);
    padding-bottom: 1rem;
  }

  figcaption {
    font-size: 0.8em;
    font-style: italic;
  }

  img {
    width: 100%;
    max-width: 400px;
    padding-top: 1.5rem;
  }

  .name {
    color: var(--primary);
    transition: color linear 0.15s;
    text-decoration: none;
  }

  .name:hover {
    color: var(--secondary);
  }

  .logo {
    margin-left: 0.5rem;
  }

  .location {
    color: var(--grey);
    display: block;
    font-size: 0.9rem;
  }

  .icons {
    margin: 0 auto;
    padding: 0;
    height: 2rem;
    position: relative;
    bottom: -2rem;
  }

  @media (max-width: 768px) {
    .home-container {
      flex-direction: column;
      margin: 0;
    }

    .home-copy {
      flex: 0;
      padding-bottom: 1.3em;
      text-align: center;
    }

    .name {
      display: block;
    }

    p {
      font-size: 1.2em;
      line-height: 1.5;
      margin: 0 auto;
    }

    img {
      max-width: 300px;
      margin-top: 0;
      padding-top: 0;
    }

    figure {
      padding-top: 0;
      padding-bottom: 4rem;
    }

    .icons {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .home-container {
      margin-bottom: 6.5rem;
    }

    .home-copy {
      flex: 0;
      padding-bottom: 0;
      text-align: center;
    }

    figure {
      padding-top: 1.1rem;
      padding-bottom: 1.5rem;
    }
  }
</style>
