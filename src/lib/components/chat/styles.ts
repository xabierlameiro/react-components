import styled from "styled-components";

export const $ChatWrapper = styled.span`
  /* overflow: hidden;
  z-index: 500;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: transparent;
  border-radius: 2px;
  width: ${({ close }) => (close ? "350px" : "50px")};
  height: ${({ close }) => (close ? "500px" : "50px")};
  transition: width 0.4s ease, height 0.4s ease; */
`;

$ChatWrapper.displayName = "ChatWrapper";

export const $ChatContainer = styled.span`
  /* width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between; */
  header {
    /* display: flex;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #f1f1f1; */
  }
  main {
    /* height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    background-color: #f0f0f0;
    margin-left: 5px;
    display: flex;
    flex-direction: column-reverse; */
  }
`;

$ChatContainer.displayName = "ChatContainer";
