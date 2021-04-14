<script>
  import { fadeIn, fadeOut } from "../utils/pageFade";
  import Contact from "../components/Contact.svelte";
  import Skills from "../components/Skills.svelte";
  import { Information } from "../information.config";
  // import Experiences from "../components/Experiences.svelte";
</script>

<svelte:head>
  <title>About - {Information.name} - {Information.position}</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  <h2 class="title">A brief summary about myself:</h2>
  {#each Information.about as info}
    <p>
      {info}
    </p>
  {/each}
  <Skills {Information} />
  <!-- <Experiences {Information} /> -->
  <Contact {Information} />
</div>
