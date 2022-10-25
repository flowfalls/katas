## Introduction
The aim of this task is to test your engineering and problem solving ability.

We have provided for you a mocked out version of an endpoints for a posts, comments and users.

An example API call looks as follows:

```typescript
import { getPosts } from './data';

getPosts().then((posts) => {
  console.log(posts);
});
```

__Note!__ _The delay between calling API and
receiving an answer is random, meaning you cannot assume that calls will respond in the same order they were called. This is to simulate
variance in response time of real server requests._

All API mocks can be found in [this file.](./src/data/index.js)

## Your task

Write a *vanilla* (no frameworks/scaffolding) SPA solution which allows for navigation and rendering of

- Comments by Post (authors name displayed with comment)
  - e.g. Select post and list comments with Author names
- Posts by Author (authors name displayed)
  - e.g. List all posts by selected Author
- Comments by Author
  - e.g. List all comments by selected Author alongside the post title the comment belongs to

## What we are looking for

A **working** and **production ready** solution that is **efficient** and **performant**.

Extra points for *TypeScript* and any decent *styling*.

Once done, please send us back the finished result as a zipped file.

# Happy coding!
