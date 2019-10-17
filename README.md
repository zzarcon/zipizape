<div align="center">
  <img src="logo.jpg" alt="Logo" width="250">
  <br><br>
</div>

# zipizape [![Build Status](https://travis-ci.org/zzarcon/zipizape.svg?branch=master)](https://travis-ci.org/zzarcon/zipizape)
> Extract zip contents in the browser with ease

### Demo

[https://zzarcon.github.io/zipizape](https://zzarcon.github.io/zipizape)

### Install

```
$ yarn add zipizape
```

### Usage

```typescript
import {ZipiZape} from 'zipizape';

const zipizape = new ZipiZape();
const entries = await zipizape.readFile(event.target.files[0])

for (let entry of entries) {
  const content = await entry.getContent();

  console.log(content.type, content.blob)
}
```

### API

**ZipiZape**

```typescript
readFile(file: File): Promise<Entry[]>
```

**Entry**

```typescript
getContent(): Promise<EntryContent | undefined>

EntryContent = {
  blob: Blob
  type: string
}
```


### Credits

Zipizape uses [jszip](https://github.com/Stuk/jszip) as the zip reader engine, much love to them for building such a great project 💖