import * as React from 'react';
import {Component, ChangeEvent} from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper, GlobalStyles} from './styled';
import {ZipiZape} from '../src';

const zipizape = new ZipiZape();

export interface AppState {
  
}

const repoUrl = 'https://github.com/';

export default class App extends Component <{}, AppState> {
  state: AppState = {
    
  }

  onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const firstFile = event.target.files[0];
    const contents = await zipizape.read(firstFile)

    console.log({contents})
  }

  render() {
    return (
      <AppWrapper>
        <GlobalStyles />
        <GHCorner openInNewTab href={repoUrl} />
        <input type="file" onChange={this.onChange}/>
      </AppWrapper>
    )
  }
}