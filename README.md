# lockfile


```typescript
import { Lock } from "@oniku/lockfile";

const lock = Lock({ dir: "/tmp" });

await lock.auto(async () => {
  // do something
});

```
