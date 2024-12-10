import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const Hero = ({ searchKeyword }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTracks = async (keyword) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetch(
        `https://v1.nocodeapi.com/sanchit_wiz/spotify/hUmMYllzrAnTsziY/search?type=track&q=${keyword === "" ? "trending" : keyword}`
      );
      const JSONData = await data.json();
      setTracks(JSONData.tracks.items || []);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setError("Failed to load tracks. Please try again later.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchKeyword) {
      getTracks(searchKeyword);
    }
  }, [searchKeyword]);

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div className="hero-section py-5">
      <div className="container">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {/* Track Cards */}
        {!isLoading && tracks.length > 0 && (
          <div className="row g-4">
            {tracks.map((track) => (
              <div key={track.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={track.album.images[0]?.url || "https://via.placeholder.com/150"}
                    className="card-img-top rounded-top"
                    alt={track.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{track.name}</h5>
                    <p className="card-text text-muted small mb-2">
                      Artist: <strong>{track.album.artists[0]?.name || "Unknown"}</strong>
                    </p>
                    <p className="card-text text-muted small">
                      Release Date: {track.album.release_date || "N/A"}
                    </p>
                    {track.preview_url ? (
                      <audio src={track.preview_url} controls className="w-100" />
                    ) : (
                      <p className="text-muted small">Preview not available</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fallback for No Results */}
        {!isLoading && tracks.length === 0 && !error && (
          <div className="text-center py-5">
            <p className="text-muted">No tracks found. Try searching for something else!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;