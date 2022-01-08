import styled from "styled-components";
import { BsChatFill, BsX } from "react-icons/bs";

export const Icon = styled(BsChatFill)`
  /* cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  transition: transform 0.2s ease;
  border: 1px solid red; */
`;

Icon.displayName = "Icon";

export const Close = styled(BsX)`
  /* cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  transition: transform 0.2s ease; */
`;

Close.displayName = "Close";
