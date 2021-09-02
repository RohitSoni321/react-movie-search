import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  type,
  setPage,
  setSelectedGenres,
  selectedGenres,
  genres,
  setGenres,
}) => {
  const fetchGenre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenre();
    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line
  }, []);
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);

    setPage(1);
  };

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: 2 }}
              size="small"
              color="primary"
              key={genre.id}
              clickable
              onDelete={() => handleRemove(genre)}
            />
          );
        })}
      {genres &&
        genres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: 2 }}
              size="small"
              clickable
              key={genre.id}
              onClick={() => handleAdd(genre)}
            />
          );
        })}
    </div>
  );
};

export default Genres;
