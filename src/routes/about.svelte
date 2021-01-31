<script>
  import { fadeIn, fadeOut } from "../utils/pageFade";
  import Contact from "../components/Contact.svelte";
  import Skills from "../components/Skills.svelte";
</script>

<svelte:head>
  <title>About Me</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  <h2 class="title">A brief summary about myself:</h2>
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
  <Skills />
  <Contact />
</div>

<style>
  @media (max-width: 1020px) {
    .container {
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
