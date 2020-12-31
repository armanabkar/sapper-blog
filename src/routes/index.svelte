<script>
  import { fadeIn, fadeOut } from "../components/pageFade";
</script>

<style>
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 0 0 3.7em 0;
    min-height: 400px;
  }

  .home-copy {
    flex: 1;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1.4em;
    line-height: 1.5;
    letter-spacing: 0.02rem;
  }

  figure {
    margin: 0 1em;
    padding-top: 2rem;
    text-align: center;
    color: rgb(146, 146, 146);
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
    color: #2196f3;
    transition: color linear 0.15s;
    text-decoration: none;
  }

  .name:hover {
    color: #36393b;
  }

  .logo {
    margin-left: 0.5rem;
  }

  @media (max-width: 1020px) {
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
    }

    img {
      max-width: 300px;
      margin-top: 0;
      padding-top: 0;
    }

    figure {
      padding-top: 1rem;
      padding-bottom: 1.5rem;
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
      padding-top: 1.5rem;
      padding-bottom: 0;
    }
  }
</style>

<svelte:head>
  <title>Arman Abkar</title>
  <meta
    name="description"
    content="Full-Stack Web Developer from los Angeles, California" />
  <meta
    name="keywords"
    content="Arman Abkar, Full-Stack, Web Developer, React, Vue, Node.js" />
</svelte:head>

<div class="home-container" in:fadeIn out:fadeOut>
  <div class="home-copy">
    <h1>Hi, I'm <a class="name" href="about">Arman Abkar</a></h1>
    <p>Full-Stack Web Developer</p>
    <a href="https://www.linkedin.com/in/armanabkar/" target="_blank"><i
        class="fab fa-linkedin-in fa-2x" /></a>
    <a class="logo" href="https://github.com/armanabkar" target="_blank"><i
        class="fab fa-github fa-2x" /></a>
    <a
      class="logo"
      href="https://stackoverflow.com/users/12696103/arman-abkar"
      target="_blank">
      <i class="fab fa-stack-overflow fa-2x" />
    </a>
    <a class="logo" href="https://twitter.com/armanabkar" target="_blank">
      <i class="fab fa-twitter fa-2x" />
    </a>
    <a
      class="logo"
      href="https://www.instagram.com/armanabkar/"
      target="_blank">
      <i class="fab fa-instagram fa-2x" />
    </a>
  </div>

  <figure>
    <img alt="Person typing on laptop" src="undraw_programming_2svr.svg" />
    <figcaption>
      Illustration thanks to
      <a href="https://undraw.co" target="_blank">Undraw</a>
    </figcaption>
  </figure>
</div>
