import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../component/Genres/Genres";
import CustomPagination from "../../component/Pagination/CustomPagination";
import SingleContent from "../../component/SingleContent/SingleContent";
import useGenre from "../../Hooks/useGenre";
const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setNumOfPages(data.total_pages);
    setContent(data.results);
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreforURL]);
  return (
    <div>
      <div className="pageTitle">Movies</div>
      <Genres
        type="movie"
        page={page}
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content.map((c) => {
          return (
            <SingleContent
              key={c.id}
              id={c.id}
              media_type="movie"
              title={c.title || c.name}
              vote_average={c.vote_average}
              poster={c.poster_path}
              date={c.release_date || c.first_air_date}
            />
          );
        })}
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};
export default Movies;
