<div align="center">
  <img src="logo.jpg" alt="Logo" width="250">
  <br><br>
</div>

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


## TODO 

* add jszip credits to Readme
* tests