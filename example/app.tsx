import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import {StylishInput} from 'react-stylish-input';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import Button from '@atlaskit/button';
import {EntriesWrapper, SelectedEntryWrapper, ViewerWrapper, AppWrapper, GlobalStyles, EntryWrapper} from './styled';
import {ZipiZape, EntryContent} from '../src';

const zipizape = new ZipiZape();
export interface AppState {
  entries: EntryContent[];
  selectedEntry?: EntryContent;
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
    entries.forEach(entry => console.log(entry.isFolder))
    this.setState({
      entries: entriesPromise,
      selectedEntry: entriesPromise[0]
    });
  }

  renderPreview = (entry: EntryContent) => {
    const preview = entry.getPreview();
    if (!preview) return null;

    const {src} = preview;
    console.log(entry.type)
    switch (entry.type) {
      case 'image': 
        return <img src={src} />
      case 'video': 
        return <video controls src={src} />
      case 'unknown': default: 
        return <div>no preview</div>
    }
  }

  onEntryClick = (selectedEntry: EntryContent) => () => {
    this.setState({
      selectedEntry
    })
  }

  renderEntries = () => {
    const {entries} = this.state;
    if (!entries.length) {return null}
    
    const entriesContent = entries.map(entry => {
      return (
        <EntryWrapper key={entry.name} onClick={this.onEntryClick(entry)}>
          {entry.name}
        </EntryWrapper>
      )
    });

    return (
      <EntriesWrapper>
        {entriesContent}
      </EntriesWrapper>
    )
  }

  renderSelectedEntry = () => {
    const {selectedEntry} = this.state;
    if (!selectedEntry) return null;
    const entryPreview = this.renderPreview(selectedEntry);

    return (
      <SelectedEntryWrapper>
        {entryPreview}
      </SelectedEntryWrapper>
    )
  }

  render() {
    return (
      <AppWrapper>
        <GlobalStyles />
        <GHCorner openInNewTab href={repoUrl} />
        <StylishInput onChange={this.onChange}>
          <Button appearance="primary" iconBefore={<AttachmentIcon label="clip" />} >
            Pick file
          </Button>
        </StylishInput>
        <ViewerWrapper>
          {this.renderEntries()}
          {this.renderSelectedEntry()}
        </ViewerWrapper>
      </AppWrapper>
    )
  }
}