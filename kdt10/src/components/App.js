import Header from "./Header.js";
import { request } from "../utils/api.js";
import SuggestKeywords from "./SuggestKeywords.js";
import SearchResults from "./SearchResults.js";
import debounce from "../utils/debounce.js";
import { getItem, setItem } from "../utils/storage.js";

export default function App({ $target }) {
  this.state = {
    keyword: "",
    keywords: [],
    images: [],
  };

  this.cache = getItem("keywords_cache", {});

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.keyword !== nextState.keyword) {
      header.setState({
        keyword: this.state.keyword,
      });
    }
    suggestKeywords.setState({
      keywords: this.state.keywords,
    });

    if (this.state.images.length > 0) {
      searchResults.setState(this.state.images);
    }
  };

  const header = new Header({
    $target,
    initialState: {
      keyword: this.state.keyword,
    },
    onKeywordInput: debounce(async (keyword) => {
      if (keyword.trim().length > 1) {
        let keywords = null;

        if (this.cache[keyword]) {
          keywords = this.cache[keyword];
        } else {
          keywords = await request(`/keywords?q=${keyword}`);
          this.cache[keyword] = keywords;
          setItem("keywords_cache", this.cache);
        }

        this.setState({
          ...this.state,
          keywords,
        });
      }
    }, 500),
    onEnter: () => {
      fetchImage();
    },
  });

  const suggestKeywords = new SuggestKeywords({
    $target,
    initialState: {
      keywords: this.state.keywords,
      cursor: -1,
    },
    onKeywordSelected: (keyword) => {
      this.setState({
        ...this.state,
        keyword,
        keywords: [],
      });

      fetchImage();
    },
  });

  const searchResults = new SearchResults({
    $target,
    initialState: this.state.images,
  });

  const fetchImage = async () => {
    const { data } = await request(`/search?q=${this.state.keyword}`);

    console.log(data);

    this.setState({
      ...this.state,
      images: data,
      keywords: [],
    });
  };
}
