import * as React from 'react';
import {Component} from 'react';
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

  // ChangeEvent<HTMLInputElement>
  onChange = async (event: any) => {
    const firstFile = event.target.files[0];
    const entries = await zipizape.readFile(firstFile)

    for (let entry of entries) {
      const content = await entry.getContent();

      console.log(content)
    }
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