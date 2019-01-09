# spfx-jsom
Use JSOM in SPFx with `async-await`. `spfx-jsom` takes care of loading the required SP libs.

## Install
```powershell
npm i spfx-jsom --save
```

## Import using commonjs
```typescript
import initSpfxJsom, { ExecuteJsomQuery, JsomContext } from "spfx-jsom";
```

## Sample 1 - Get all web properties
```typescript
async function getAllWebProperties() {
    try {
      const jsomCtx: JsomContext = await initSpfxJsom([SITE_URL]);
      const webAllProperties = jsomCtx.web.get_allProperties();
      await ExecuteJsomQuery(jsomCtx, [{ clientObject: webAllProperties }]);
      return webAllProperties.get_fieldValues();
    } catch (err) {
      throw err;
    }
  }
```
