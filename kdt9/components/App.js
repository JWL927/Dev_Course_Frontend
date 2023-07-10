import PhotoList from "./PhotoList.js"
import { request } from "../utils/api.js";

// const DUMMY_DATA = [
//     {
//         id: 1,
//         imageUrl: "https://abc.com",
//     },
//     {
//         id: 2,
//         imageUrl: "https://def.com",
//     },
//     {
//         id: 3,
//         imageUrl: "https://ghi.com",
//     },
// ]

export default function App({ $target }) {
    const $h1 = document.createElement("h1");
    $h1.textContent = "Cat Photos";
    $target.appendChild($h1);

    this.state = {
        limit: 5,
        nextStart: 0,
        photos: [],
        isLoading: false,
    }

    const photoList = new PhotoList({
        $target,
        initialState: {
            photos: this.state.photos,
            isLoading: this.state.isLoading,
        },
        onScrollEnded: async () => {
            await fetchPhotos();
        },
    })

    this.setState = (nextState) => {
        this.state = nextState;
        photoList.setState({
            photos: nextState.photos,
            isLoading: this.state.isLoading,
        });
    }

    const fetchPhotos = async () => {
        this.setState({
            ...this.state,
            isLoading: true,
        })
        const { limit, nextStart } = this.state;
        const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`);
        this.setState({
            ...this.state,
            nextStart: nextStart + limit,
            photos: this.state.photos.concat(photos),
            isLoading: false,
        })
    }

    fetchPhotos();
}