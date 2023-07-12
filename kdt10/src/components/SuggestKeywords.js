export default function SuggestKeywords({
  $target,
  initialState,
  onKeywordSelected,
}) {
  const $suggest = document.createElement("div");
  $suggest.className = "keywords";

  $target.appendChild($suggest);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $suggest.innerHTML = `
        <ul>
            ${this.state
              .map(
                (keyword) => `
                <li>${keyword}</li>
            `
              )
              .join("")}
        </ul>
    `;

    $suggest.style.display = this.state.length > 0 ? "inline-block" : "none";
  };

  this.render();

  $suggest.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if ($li) {
      onKeywordSelected($li.textContent);
    }
  });
}
