<script>
  export let Information;
</script>

<div>
  <img loading="lazy" src={Information.profilePicture} alt={Information.name} />
  <p>
    Hi, I'm
    <strong>{Information.name}</strong>, a {Information.position} from {Information.location}.
    You can follow me on
    <a href={Information.socialMedia.Twitter} target="_blank">Twitter</a>
    or
    <a href={Information.socialMedia.Instagram} target="_blank">Instagram</a>,
    see some of my work on
    <a href={Information.socialMedia.Github} target="_blank">GitHub</a>, or read
    more about me on
    <a href={Information.socialMedia.LinkedIn} target="_blank">LinkedIn</a>.
    <br />
    Please feel free to reach me at
    <a href={"mailto: " + Information.email}>{Information.email}</a>.
  </p>
</div>

<style>
  div {
    align-items: center;
    display: flex;
    border: 2px dashed var(--primary);
    border-radius: 8px;
    padding: 0 0.5rem;
  }

  img {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 8px;
    margin-right: 0.7rem;
    margin-bottom: 0.1rem;
  }

  @media only screen and (max-width: 768px) {
    img {
      display: none;
    }
    div {
      text-align: center;
    }
  }

  p {
    font-size: 1.125rem;
  }

  strong {
    color: var(--primary);
  }
</style>
