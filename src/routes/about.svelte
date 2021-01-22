<script>
  import { fadeIn, fadeOut } from "../components/pageFade";
</script>

<svelte:head>
  <title>About Me</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  <h1>About</h1>
  <p>
    Creative & experienced Software Developer who is committed and passionate
    about learning cutting-edge technologies. Specialized in JavaScript, Python
    and most of the FrontEnd frameworks, libraries, methodologies and
    RESTful/GraphQL APIs in order to build responsive and cross platform
    applications with high level of functionality and interactive features that
    will affect directly on business growth.
  </p>
  <p>
    I've worked with a variety of languages and technologies, especially
    JavaScript & Python.
  </p>
  <p>
    <span class="skills">Skills:</span>
    JavaScript, Python, C#, Go, React, Vue, Angular, Svelte, Blazor, Node.js, Django,
    GraphQL, Ionic, React Native, Flutter, Docker.
  </p>
  <hr />
  <p>☎ +98 936 386 8196</p>
  <p>✉ armanabkar@gmail.com</p>
  <a href="https://www.linkedin.com/in/armanabkar/" target="_blank"
    ><i class="fab fa-linkedin-in fa-2x" /></a
  >
  <a class="logo" href="https://github.com/armanabkar" target="_blank"
    ><i class="fab fa-github fa-2x" /></a
  >
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
  <p class="location">🌴 Los Angeles, California</p>
  <figure>
    <img
      src="undraw_code_thinking_1jeh.svg"
      alt="Image of a vintage typewriter."
    />
    <span
      >Illustration thanks to
      <a href="https://undraw.co" target="_blank">Undraw</a>
    </span>
  </figure>
</div>

<style>
  figure {
    float: right;
    margin: -11em 0 2em 2em;
    max-width: 300px;
    color: rgb(146, 146, 146);
    text-align: right;
  }

  figure img {
    margin-bottom: 1rem;
  }

  figure span {
    font-size: 0.8rem;
  }

  @media (max-width: 1020px) {
    figure {
      display: none;
    }
    .container {
      text-align: center;
      margin: 0 auto;
    }

    hr {
      display: none;
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
    font-size: 1rem;
    margin: 1.5rem 0 0 0;
    padding: 0;
    color: #aaa;
  }

  /* h3 {
    margin: 1rem 0 0 0;
  } */
</style>
