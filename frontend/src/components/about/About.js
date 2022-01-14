import React from "react";
import "./about.css";

const About = () => {
  return (
    <section class="team-page">
      <div class="creators">
        <h3>
          <span>CREATED</span>BY
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet harum
          corporis recusandae cupiditate voluptate reprehenderit vel natus quam
          adipisci, excepturi nam nisi perferendis eligendi necessitatibus
          tenetur nesciunt, debitis impedit! Mollitia!
        </p>
        <a
          href="https://github.com/ManishBisht777"
          class="hire-us"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hire Me
        </a>
      </div>

      <div class="container">
        <div class="card">
          <img src="./cat1.jpg" alt="img" />
        </div>
      </div>
    </section>
  );
};

export default About;
