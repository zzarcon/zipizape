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
  padding: 10px;
  border-bottom: 1px solid;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  video {
    width: 400px;
    outline: none;
  }
`;

export const ViewerWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  height: calc(100vh - 70px);
  overflow: hidden;
  border: 1px solid;
  border-radius: 3px;
`;

export const SelectedEntryWrapper = styled.div`
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  video {
    height: 100%;
    width: 100%;
    outline: none;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

export const EntriesWrapper = styled.div`
  border-right: 1px solid;
  width: 300px;
  overflow: hidden;
`;