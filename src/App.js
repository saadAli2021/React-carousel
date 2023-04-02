import "./App.css";
import { useState, useEffect } from "react";
import data from "./data";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
function App() {
  const [reviews, setReviews] = useState(data);
  const [cindex, setcIndex] = useState(0);

  useEffect(() => {
    if (cindex < 0) setcIndex(reviews.length - 1);
    if (cindex >= reviews.length) setcIndex(0);
  }, [cindex]);

  useEffect(() => {
    let autoslider = setInterval(() => {
      setcIndex(cindex + 1);
    }, 3000);

    return () => {
      clearInterval(autoslider);
    };
  }, [cindex]);

  return (
    <section className="section">
      <div className="heading">
        <h1>
          <span>/</span> Reviews
        </h1>
      </div>
      <section className="contentsection">
        {reviews.map((review, index) => {
          let position = "nextSlide";

          if (index === cindex) {
            position = "currentSlide";
          }
          if (
            index === cindex - 1 ||
            (cindex == 0 && index === reviews.length - 1)
          ) {
            position = "prevSlide";
          }

          const { id, name, image, title, quote } = review;
          return (
            <article key={id} className={`singleReview ${position}`}>
              <img src={image} alt="image" />
              <h4 className="name">{name}</h4>
              <p className="title">{title}</p>
              <p className="description">{quote}</p>
            </article>
          );
        })}

        <button className="btn left" onClick={() => setcIndex(cindex - 1)}>
          <FaAngleLeft />
        </button>
        <button className="btn right" onClick={() => setcIndex(cindex + 1)}>
          <FaAngleRight />
        </button>
      </section>
    </section>
  );
}

export default App;
