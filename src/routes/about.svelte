<script>
  import { fadeIn, fadeOut } from "../utils/pageFade";
  import Contact from "../components/Contact.svelte";
  import Skills from "../components/Skills.svelte";
  import { Information } from "../information";
  // import Experiences from "../components/Experiences.svelte";
</script>

<svelte:head>
  <title>About - {Information.name}</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  <h2 class="title">A brief summary about myself:</h2>
  <p>
    {Information.about[0]}
  </p>
  <p>
    {Information.about[1]}
  </p>
  <Skills {Information} />
  <!-- <Experiences {Information} /> -->
  <Contact {Information} />
</div>

<style>
  @media (max-width: 768px) {
    .container {
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
