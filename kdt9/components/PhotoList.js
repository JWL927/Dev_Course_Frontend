export default function PhotoList({ $target, initialState, onScrollEnded }) {
    const $photoList = document.createElement("div");

    $target.appendChild($photoList);

    let isInitialize = false;

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        if (!isInitialize) {
            $photoList.innerHTML = `
            <ul class="photoList_photos"></ul>
            <button class="photoList_loadMore">Load More</button>
            `;

            isInitialize = true;
        }
        const { isLoading, photos } = this.state;

        const $photos = $photoList.querySelector(".photoList_photos");

        $photos.forEach(photo => {
            if ($photos.querySelector(`[data-id="${photo.id}"]`) === null) {
                const $li = document.createElement("li");
                $li.setAttribute("data-id", photo.id)
                $li.style = "list-style: none;";
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`;

                $photos.appendChild($li);
            }
        });
    }

    this.render();

    $photoList.addEventListener("click", (e) => {
        if (e.target.className === "photoList_loadMore" && !this.state.isLoading) {
            onScrollEnded();
        }
    })
}