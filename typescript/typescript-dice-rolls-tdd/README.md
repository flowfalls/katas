# Die dev test

The approach:

- Test driven first
- Utilise an existing skeleton project
- Write method names to assist with testing and logic
- Show cased Controllers, entities, service classes and a utility class
- Implemented KOA in the last few minutes to showcase request/response

What went well:

- Tests
- Seperation of logic
- KOA server
- Met the majority of the spec
- Showcasing the various aspects of node for none-node developers

What didn't work well:

- No time to do proper KOA request/response validation
- Would have liked to have put it into docker
- No CLI integration - however given more time I would use Google's https://github.com/google/zx
- Lower and Uppder bounds for a type (e.g. restrict a number to 1-6), this seems an interesting challenge that I've not come across before

To Run:

- git clone
- npm install
- nvm use 16 (not essential)
- npm run build && npm run start

Use the file test.http to run the test POST request. The extension for visual code is:

Name: REST Client
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

## Test Results

![Results](./results.jpg)

## Request Results

![Results](./result-payload.jpg)
