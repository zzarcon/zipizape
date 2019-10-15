import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Helvetica;
    background-color: #D8D1F5;
  }

  * {
    box-sizing: content-box;
  }
`;

export const AppWrapper = styled.div`

`;

export const EntryWrapper = styled.div`
  height: 150px;
  overflow: hidden;
  padding: 10px;
  border-bottom: 1px;
  display: flex;

  video {
    width: 400px;
    outline: none;
  }
`;