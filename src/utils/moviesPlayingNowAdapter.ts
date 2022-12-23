import { MovieProps } from "../components/movies/MoviesList";
import { posterBasePath } from "./constants";
import { GenreList } from "./types";

export interface MoviesPlayingNow {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  poster_path: string | null;
}

const moviesPlayingNowAdapter = (
  { id, poster_path, title, release_date, vote_average, overview, genre_ids }: MoviesPlayingNow,
  genreList: GenreList
): MovieProps => {
  let genreNames: string[] = [];
  genre_ids.forEach((genreId) => {
    const genreFound = genreList.find(({ id }) => id === genreId);
    if (genreFound) {
      genreNames.push(genreFound.name);
    }
  });

  return {
    id: String(id),
    title,
    overview,
    vote_average,
    genres: genreNames,
    release_date: String(new Date(release_date).getFullYear()),
    poster_path: Boolean(poster_path) ? `${posterBasePath}${poster_path}` : null,
  };
};

export default moviesPlayingNowAdapter;
