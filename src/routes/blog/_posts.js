import all from "../../content/posts/*.md";

export default all
  .map((post) => ({ ...post, html: post.html.replace(/^\t{3}/gm, "") }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));
