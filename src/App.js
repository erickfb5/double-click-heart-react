import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

const App = () => {
  const [timesClicked, setTimesClicked] = useState(0);

  const handleClick = (e) => {
    let clickTime = e.timeStamp;
    let lastClickTime = e.currentTarget.getAttribute("data-clickTime") || 0;

    if (clickTime - lastClickTime < 800) {
      createHeart(e);
      e.currentTarget.setAttribute("data-clickTime", 0);
    } else {
      e.currentTarget.setAttribute("data-clickTime", clickTime);
    }
  };

  const createHeart = (e) => {
    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart");

    const rect = e.currentTarget.getBoundingClientRect();
    const xInside = e.clientX - rect.left;
    const yInside = e.clientY - rect.top;

    heart.style.top = `${yInside}px`;
    heart.style.left = `${xInside}px`;

    e.currentTarget.appendChild(heart);

    setTimesClicked((prevTimesClicked) => prevTimesClicked + 1);

    setTimeout(() => heart.remove(), 1000);
  };

  return (
    <div className="container">
      <h3>
        Double click on the image to <FontAwesomeIcon icon={faHeart} />
      </h3>
      <small>You liked it {timesClicked} times</small>
      <div className="loveMe" onClick={handleClick} />
    </div>
  );
};

export default App;
