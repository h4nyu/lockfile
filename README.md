# lockfile


```typescript
import { Lock } from "@oniku/lockfile";

const lock = Lock({ dir: "/tmp" });

const res = await lock.auto(async () => {
  // do or return something
});
```
