<style>
  figure {
    float: right;
    margin: -3em -7em 2em 2em;
    max-width: 350px;
    color: rgb(146, 146, 146);
  }

  figure img {
    border-radius: 8px;
  }

  @media (max-width: 1020px) {
    figure {
      float: none;
      margin: 0 auto 2em;
      max-width: 400px;
    }
    .container {
      text-align: center;
      margin: 0 0.5rem;
    }
  }

  .skills {
    font-weight: bold;
    font-style: italic;
    font-size: 1.2rem;
    color: #564eff;
    margin-right: 0.5rem;
  }

  .logo {
    margin-left: 0.5rem;
  }

  .location {
    font-size: 0.9rem;
    margin: 1rem 0 0 0;
    padding: 0;
    color: #aaa;
  }
</style>

<svelte:head>
  <title>About Me</title>
</svelte:head>

<div class="container">
  <h1>About</h1>
  <figure>
    <img
      src="rsz_florian-klauer-489-unsplash.jpg"
      alt="Image of a vintage typewriter." />
    <span>Illustration thanks to
      <a href="https://undraw.co" target="_blank">Undraw</a>
    </span>
  </figure>
  <p>
    Creative, well-experienced Web Developer who is committed and passionate
    about learning cutting-edge technologies. Specialized in React, Vue and
    Angular and most of the Front End frameworks, libraries, methodologies and
    developing RESTful/GraphQL APIs in order to build responsive and cross
    browser web applications with high level of functionality and interactive
    features that will affect directly on business growth.
  </p>
  <p>Cross platform mobile app developer.</p>
  <p>
    I've worked with a variety of languages and technologies, especially
    JavaScript & Python.
  </p>
  <p>
    <span class="skills">Skills:</span>
    JavaScript, Python, C#, React, Vue, Angular, Svelte, Node.js, Django,
    GraphQL, Docker
  </p>
  <p>✉ armanabkar@gmail.com</p>
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
  <a class="logo" href="https://www.instagram.com/armanabkar/" target="_blank">
    <i class="fab fa-instagram fa-2x" />
  </a>
  <p class="location">🌴 Santa Monica, California</p>
</div>
