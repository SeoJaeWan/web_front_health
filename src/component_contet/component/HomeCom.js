import React from "react";
import { HomeForm, Img, Home, Thumblist } from "../style/HomeCom_style.js";
import { Link } from "react-router-dom";
import ReactHelmet from "../../containers/common/ReactHelmet.js";
import { Container } from "../style/Container_style.js";

const HomeCom = () => {
  return (
    <>
      <ReactHelmet title="Health &amp; See" />
      <Container>
        <HomeForm>
          <div className="leftCon">
            <h2 className="title">Health&amp;See</h2>
            <p className="title2">"나만의 작은 트레이너"</p>
            <button type="button" className="startButton">
              <Link to="/Training">시작하기</Link>
            </button>
            <ul className="lng">
              <li>
                <Img src={require("../../Images/Main/react-logo.png")} alt="" />
              </li>
              <li>
                <Img src={require("../../Images/Main/Ml5.png")} alt="" />
              </li>
              <li>
                <Img src={require("../../Images/Main/nodejs.png")} alt="" />
              </li>
              <li>
                <Img src={require("../../Images/Main/p5.png")} alt="" />
              </li>
            </ul>
          </div>
          <Home
            out="visible"
            src={require("../../Images/Login/H&S.png")}
            alt=""
          />
        </HomeForm>
      </Container>
    </>
  );
};

export default HomeCom;
