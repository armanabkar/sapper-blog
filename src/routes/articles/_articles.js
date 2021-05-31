import all from "../../content/articles/*.md";

export default all
  .map((article) => ({
    ...article,
    html: article.html.replace(/^\t{3}/gm, ""),
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));
