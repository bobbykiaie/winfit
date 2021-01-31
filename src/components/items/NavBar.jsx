import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import styled from "styled-components";
import { useAuth } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleLogOut = async () => {
    logout();
  };
  const Styles = styled.div`
    .centerNav {
      justify-content: center;
    }
    .Navbar {
      backgroundcolor: black;
    }
    .link {
      text-decoration: none;
      color: white;
      text-align: right;
    }
  `;

  return (
    <>
      <Styles>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://lh3.googleusercontent.com/Gf2Og5OgKV8wUdiJaUqjuNM24UmzOD3V3yGAaLbDSGAKCQ-G-L0s55-aVGxVtigQ8a0vqk0cr_grBp4AwfRhAN2BJIRWscJT4BUD9R5uiHI4mUVEb7sA6MA3w62e5-dV6vA0aqftWee60x1UjH_6jnPJtpFsUZbxQhRYDXMWYB8-CVGZRtsb9Mob9M5GRQktiCP9k0BAaOEFzun1-KX0RsZ96qU9bE5uheaQLtyQ-P3LNIlXzLLJtZq06J7ZKLmm8y5PjVnLH6O-5O5ZZ8OSgK0hlr_hYZBe2XXFPNayap0hp_oAHEAujw3hUjtB5S1_3zwXvCLX57ZK-KKdL3RRgGUWFeBObpnbb8qx6vTmsqexjQa1QhI8bZ51Y37wsV6a7ItMjAoCyBjYz3RLvyHRqypxJflEw0O-YBhMA_Brjzz4em8mgD_8M-jhmCalXABKUAzK1RKZ_BD4SlIt3EC_r51gNDRAy2Ya9YVIt7_EpRzsZ1L_cYl5TQi9vhaHvptrK-SYikJdO1kBEdcgtTLU9hWxFHSfSkjZ4RoUMn8yDKB8cjFA-SwtatP2sdFLz-u9FaBmAGmIWx8dC5VMqK1n_wNj7p8ckeDkXzsHg8K8SKnryt8Phih0mS2wG15BIEPY7EClHv6cQ-nQFmxV5TBAz66o1Bin5bgJeV_v-ODpDakrlLbQ63LgwFbnuGcTQA=w300-h96-no?authuser=0"
              width="30"
              height="30"
              className="d-inline align-top"
            />{" "}
            WinFIt
          </Navbar.Brand>

          {isLoggedIn ? (
            <Link className="link" onClick={handleLogOut}>
              Logout
            </Link>
          ) : (
            ""
          )}
          </Container>
        </Navbar>
      </Styles>
    </>
  );
};

export default Navigation;
