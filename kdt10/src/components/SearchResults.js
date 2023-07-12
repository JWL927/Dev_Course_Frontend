export default function SearchResults({ $target, initialState }) {
  const $searchResults = document.createElement("div");
  $searchResults.className = "searchResults";

  $target.appendChild($searchResults);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $searchResults.innerHTML = `
        ${this.state
          .map(
            (result) => `
            <div class="image">
                <img src="${result.url}" />
            </div>
        `
          )
          .join("")}
    `;
  };

  this.render();
}
