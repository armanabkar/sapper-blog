<script>
  import { fadeIn, fadeOut } from "../utils/pageFade";
  import Contact from "../components/Contact.svelte";
  import Skills from "../components/Skills.svelte";
  import { Information } from "../information.config";
  import Experiences from "../components/Experiences.svelte";
</script>

<svelte:head>
  <title>{Information.name} - {Information.position}</title>
  <meta
    name="description"
    content="{Information.position} from {Information.location}"
  />
  <meta name="keywords" content={Information.keywords} />
  <meta
    name="google-site-verification"
    content="wduTXx2JFRwgDVWaT2sf0HBnOc-NzyPxkxaNj_DJVPQ"
  />
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  <h2 class="name">
    {Information.name}
  </h2>
  {#each Information.about as info}
    <p>
      {@html info}
    </p>
  {/each}
  <Experiences {Information} />
  <Skills {Information} />
  <Contact {Information} />
</div>

<style>
  .name {
    color: var(--primary);
    font-weight: 600;
    margin: 1em 0 1rem 0;
    font-size: 2.1em;
  }
</style>
