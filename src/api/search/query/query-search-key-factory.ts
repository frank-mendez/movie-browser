const searchKeys = {
  movies: ["movies"],
  movieList: () => [...searchKeys.movies, "list"],
  movieCollection: (params: string) => [...searchKeys.movieList(), params],
};

export default searchKeys;
