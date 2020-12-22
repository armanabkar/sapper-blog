<script>
  import { fadeIn, fadeOut } from "../components/pageFade";
</script>

<style>
  figure {
    float: right;
    margin: 1em -6em 2em 2em;
    max-width: 350px;
    color: rgb(146, 146, 146);
  }

  figure img {
    margin-bottom: 1rem;
  }

  @media (max-width: 1020px) {
    figure {
      float: none;
      margin: 0 auto 2em auto;
      max-width: 350px;
    }
    .container {
      text-align: center;
      margin: 0 auto;
    }
    figure img {
      padding-top: 0;
    }
  }

  .skills {
    font-weight: bold;
    font-style: italic;
    font-size: 1.2rem;
    color: #2196f3;
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

<div class="container" in:fadeIn out:fadeOut>
  <h1>About</h1>
  <figure>
    <img
      src="undraw_web_developer_p3e5.svg"
      alt="Image of a vintage typewriter." />
    <span>Illustration thanks to
      <a href="https://undraw.co" target="_blank">Undraw</a>
    </span>
  </figure>
  <p>
    Creative & experienced Full-Stack Web Developer who is committed and
    passionate about learning cutting-edge technologies. Specialized in React,
    Vue and Angular and most of the FrontEnd frameworks, libraries,
    methodologies and developing RESTful/GraphQL APIs in order to build
    responsive and cross platform applications with high level of functionality
    and interactive features that will affect directly on business growth.
  </p>
  <p>
    I've worked with a variety of languages and technologies, especially
    JavaScript & Python.
  </p>
  <p>
    <span class="skills">Skills:</span>
    JavaScript, Python, C#, React, Vue, Angular, Svelte, Node.js, Django,
    GraphQL, Ionic, React Native, Flutter, Docker
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
  <p class="location">🌴 Somewhere, California</p>
</div>
