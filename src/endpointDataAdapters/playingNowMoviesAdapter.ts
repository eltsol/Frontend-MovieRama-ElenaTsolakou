import { MovieProps } from "../components/organisms/MoviesList";
import { posterBasePath } from "../constants";
import { GenreList } from "../types";

export interface PlayingNowMovies {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

const playingNowMoviesAdapter = (
  { id, poster_path, title, release_date, vote_average, overview, genre_ids }: PlayingNowMovies,
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
    poster: Boolean(poster_path) ? `${posterBasePath}${poster_path}` : null,
    title,
    yearOfRelease: String(new Date(release_date).getFullYear()),
    genres: genreNames,
    voteAverage: vote_average,
    overview,
  };
};

export default playingNowMoviesAdapter;
