describe("index.js", () => {
  it("loads without crashing", () => {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.id = "root";
    body.appendChild(container);
    require("./index");
  });
});
