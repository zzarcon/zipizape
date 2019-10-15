import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper, GlobalStyles, EntryWrapper} from './styled';
import {ZipiZape} from '../src';
import { EntryContent } from '../src/zipizape';

const zipizape = new ZipiZape();

export interface AppState {
  entries: EntryContent[];
}

const repoUrl = 'https://github.com/';

export default class App extends Component <{}, AppState> {
  state: AppState = {
    entries: []
  }

  // ChangeEvent<HTMLInputElement>
  onChange = async (event: any) => {
    const firstFile = event.target.files[0];
    const entries = await zipizape.readFile(firstFile)
    const contents = entries.map(entry => entry.getContent());
    const entriesPromise = (await Promise.all(contents)).filter(entry => !!entry);

    this.setState({
      entries: entriesPromise
    });
  }

  renderPreview = (entry: EntryContent) => {
    const src = entry.getPreview();
    switch (entry.type) {
      case 'image': 
        return <img src={src} />
      case 'video': 
        return <video controls src={src} />
      case 'unknown': 
        return <div>no preview</div>
    }
  }

  renderEntries = () => {
    const {entries} = this.state;
    if (!entries.length) {return null}
    
    const entriesContent = entries.map(entry => {
      const entryPreview = this.renderPreview(entry);
      
      return (
        <EntryWrapper>
          {entry.name}
          {entryPreview}
        </EntryWrapper>
      )
    });

    return (
      <div>
        {entriesContent}
      </div>
    )
  }

  render() {
    return (
      <AppWrapper>
        <GlobalStyles />
        <GHCorner openInNewTab href={repoUrl} />
        <input type="file" onChange={this.onChange}/>
        {this.renderEntries()}
      </AppWrapper>
    )
  }
}