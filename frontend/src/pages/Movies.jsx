import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
    const movies = useSelector((state) => state.stream_me.movies);
    const genres = useSelector((state) => state.stream_me.genres);
    const genresLoaded = useSelector((state) => state.stream_me.genresLoaded);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "movies" }));
        }
    }, [genresLoaded]);

    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid);
        else navigate("/login");
    });

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type='movie' />
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies;