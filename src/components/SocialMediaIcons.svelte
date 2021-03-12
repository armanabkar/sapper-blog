<script>
  export let Information;

  const icons = [
    {
      href: Information.socialMedia.LinkedIn,
      ariaLabel: "Linkedin",
      iconName: "fa-linkedin-in",
    },
    {
      href: Information.socialMedia.Github,
      ariaLabel: "Github",
      iconName: "fa-github",
    },
    {
      href: Information.socialMedia.StackOverflow,
      ariaLabel: "StackOverflow",
      iconName: "fa-stack-overflow",
    },
    {
      href: Information.socialMedia.Twitter,
      ariaLabel: "Twitter",
      iconName: "fa-twitter",
    },
    {
      href: Information.socialMedia.Instagram,
      ariaLabel: "Instagram",
      iconName: "fa-instagram",
    },
  ];

  const validIcons = icons.filter((icon) => icon.href !== "");
</script>

<svelte:head>
  <script
    defer
    src="https://kit.fontawesome.com/a2d583ca91.js"
    crossorigin="anonymous"></script>
</svelte:head>

<div>
  {#each validIcons as { href, ariaLabel, iconName }}
    <a aria-label={ariaLabel} {href} target="_blank" rel="noopener noreferrer">
      <i class={"fab " + iconName + " fa-2x"} />
    </a>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
  }

  a {
    color: var(--primary);
    padding: 0 0.37rem;
  }

  a:hover {
    color: var(--secondary);
  }

  @media (max-width: 768px) {
    div {
      margin: 0 auto;
    }
  }
</style>
