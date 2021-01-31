describe("Sapper template app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to /about", () => {
    cy.get("nav a").contains("about").click();
    cy.url().should("include", "/about");
  });

  it("navigates to /blog", () => {
    cy.get("nav a").contains("blog").click();
    cy.url().should("include", "/blog");
  });

  it("navigates to /projects", () => {
    cy.get("nav a").contains("projects").click();
    cy.url().should("include", "/projects");
  });
});
