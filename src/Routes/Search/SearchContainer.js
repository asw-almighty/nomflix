import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null
  };

  updateTerm = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      searchTerm: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  };

  searchByTerm = async searchTerm => {
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.searchMovies(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.searchTV(searchTerm);

      this.setState({ movieResults, tvResults });
    } catch (error) {
      this.setState({ error: "Can't find results" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      movieResults,
      tvResults,
      searchTerm,
      updateTerm,
      loading,
      error
    } = this.state;
    console.log("search", this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
