import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
function LiveVideoPlayer({ url }) {
  /**
   * A video player component for displaying live video streams.
   * @param {string} url - The URL of the live video stream (HLS/RTMP/HTTP).
   */
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // If HLS stream (.m3u8) and browser doesn't support natively, prompt user.
    if (url && videoRef.current) {
      const isHls = url.endsWith(".m3u8");
      const canPlay = videoRef.current.canPlayType("application/vnd.apple.mpegurl");
      if (isHls && !canPlay) {
        setError(
          "Your browser may not support this stream format. Please use a modern browser or check URL."
        );
      } else {
        setError("");
      }
    }
  }, [url]);

  return (
    <div className="live-video-player-outer">
      <div className="live-video-player-inner">
        {url ? (
          <>
            <video
              ref={videoRef}
              src={url}
              controls
              autoPlay
              playsInline
              style={{
                borderRadius: "1rem",
                background: "#000",
                width: "min(90vw, 800px)",
                maxHeight: "70vh",
              }}
            />
            {error && (
              <div className="video-error" style={{ color: "#ffae47", marginTop: "0.5rem" }}>
                {error}
              </div>
            )}
          </>
        ) : (
          <div className="placeholder-text">
            Enter a live stream URL and click "Play"
          </div>
        )}
      </div>
    </div>
  );
}

LiveVideoPlayer.propTypes = {
  url: PropTypes.string,
};

export default LiveVideoPlayer;
