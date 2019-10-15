# zipizape
> Extract zip contents in the browser with ease


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

```
readFile(file: File): Promise<Entry[]>
```

**Entry**

```
getContent(): Promise<EntryContent | undefined>

EntryContent = {
  blob: Blob
  type: string
}
```


## TODO 

* add jszip credits to Readme
* Add Zipi y Zape logo 