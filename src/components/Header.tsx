import React from "react";
import styled from "styled-components";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <HeaderContainer>
      <Titile>ingred-Todo</Titile>
    </HeaderContainer>
  );
};

const Titile = styled.h1`
  margin: 0;
  color: white;
`;

const HeaderContainer = styled.div`
  background-color: lightblue;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 64px;
`;

export default Header;
