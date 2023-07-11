export default function PhotoList({ $target, initialState, onScrollEnded }) {
    const $photoList = document.createElement("div");

    $target.appendChild($photoList);

    let isInitialize = false;

    this.state = initialState;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.state.isLoading) {
                if (this.state.totalCount > this.state.photos.length) {
                    onScrollEnded();
                }
            }
        })
    }, {
        threshold: 0.5,
    })

    let $lastLi = null;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        if (!isInitialize) {
            $photoList.innerHTML = `
            <ul class="photoList_photos"></ul>
            `;

            isInitialize = true;
        }
        const { photos } = this.state;

        const $photos = $photoList.querySelector(".photoList_photos");

        photos.forEach(photo => {
            if ($photos.querySelector(`[data-id="${photo.id}"]`) === null) {
                const $li = document.createElement("li");
                $li.setAttribute("data-id", photo.id)
                $li.style = "list-style: none; min-height: 800px;";
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`;

                $photos.appendChild($li);
            }
        });

        const $nextLi = $photos.querySelector("li:last-child");

        if ($nextLi !== null) {
            if ($lastLi !== null) {
                observer.unobserve($lastLi);
            }

            $lastLi = $nextLi;
            observer.observe($lastLi);
        }
    }

    

    this.render();

    window.addEventListener("scroll", () => {
        const { isLoading, totalCount, photos } = this.state;
        const isScrollEnded = (window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight;

        if (isScrollEnded && !isLoading && photos.length < totalCount) {
            onScrollEnded();
        }
    })
}