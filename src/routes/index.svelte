<style>
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 2em 0;
    min-height: 400px;
  }

  .home-copy {
    flex: 1;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 1.4em;
    line-height: 1.5;
  }

  figure {
    margin: 0 1em;
    text-align: center;
  }

  figcaption {
    font-size: 0.8em;
    font-style: italic;
  }

  img {
    width: 100%;
    max-width: 400px;
  }

  .name {
    color: #564eff;
    text-shadow: 0px 1px 3px #0000001f;
    transition: color linear 0.15s;
  }

  .name:hover {
    color: #36393b;
  }

  @media (max-width: 1020px) {
    p {
      font-size: 1.2em;
    }

    img {
      max-width: 300px;
    }
  }

  @media (max-width: 800px) {
    .home-container {
      flex-direction: column;
    }

    .home-copy {
      flex: 0;
      padding-bottom: 2em;
      text-align: center;
    }

    .name {
      display: block;
    }
  }
</style>

<svelte:head>
  <title>Arman Abkar</title>
  <meta
    name="description"
    content="Full-Stack Web Developer from Santa Monica, California" />
  <meta
    name="keywords"
    content="Arman Abkar, Full-Stack, Web Developer, React, Vue, Node.js" />
</svelte:head>

<div class="home-container">
  <div class="home-copy">
    <h1>Hi, I'm <span class="name">Arman Abkar</span></h1>
    <p>Full-Stack Web Developer</p>
    <p><a href="about">About Me</a></p>
    <a href="https://www.linkedin.com/in/armanabkar/" target="_blank"><i
        class="fab fa-linkedin-in fa-2x" /></a>
    <a href="https://github.com/armanabkar" target="_blank"><i
        class="fab fa-github fa-2x" /></a>
    <a
      href="https://stackoverflow.com/users/12696103/arman-abkar"
      target="_blank">
      <i class="fab fa-stack-overflow fa-2x" />
    </a>
    <a href="https://twitter.com/armanabkar" target="_blank">
      <i class="fab fa-twitter fa-2x" />
    </a>
    <a href="https://www.instagram.com/armanabkar/" target="_blank">
      <i class="fab fa-instagram fa-2x" />
    </a>
  </div>

  <figure>
    <img alt="Person typing on laptop" src="undraw_programmer_imem.svg" />
    <figcaption>
      Illustration thanks to
      <a href="https://undraw.co" target="_blank">Undraw</a>
    </figcaption>
  </figure>
</div>
