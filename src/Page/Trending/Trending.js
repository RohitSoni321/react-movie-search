import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Trending.css";
import SingleContent from "../../component/SingleContent/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";
const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content.map((c) => {
          return (
            <SingleContent
              key={c.id}
              id={c.id}
              media_type={c.media_type}
              title={c.title || c.name}
              vote_average={c.vote_average}
              poster={c.poster_path}
              date={c.release_date || c.first_air_date}
            />
          );
        })}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};
export default Trending;
