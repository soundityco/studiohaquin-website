// Importing Dependencies //
import React from "react";

export function Videos() {;

  return (
    <section className="videos offset-menu" id="videos">
        <div className="container">
            <div className="container-block">
                <h1 className="section-title">Music Videos</h1>
                <div className="videos-player">
                    <iframe src="https://www.youtube.com/embed/UcdPqI6maG4?rel=0" title="blurblur - BLACK PRESSURE (Official Video)"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="videos-player">
                    <iframe src="https://www.youtube.com/embed/vE2-2ohxaT0?rel=0" title="blurblur - DON'T NEED YA! (Official Video)"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Videos;