This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

clone project:

```sh
git clone https://github.com/temmyscope/instamotion
```

Install dependencies within project folder:

```sh
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing URI parameters

- In order to test that filters are applied if passed from the URI, you can use any of the filters with a string or array of string values where applicable; An example is shown below:
```json
?category=offroad&make=volkswagen&model=T9&fuel=petrol&price=[0,100000]&reg_year=2020&
mileage=[0, 10]&fuel=petrol&gearbox=...&color=blue&power=[0, 1000]
```

***You don't have to use it in the above combination but the fields/param keys have to be the same***

## UI filter Implementation

- As the data set returned from the API was a bit verbose, I couldn't look through it much but decided to use the task context to determine what filters I can generate from the returned data.

- The filter was generated by making a metadata from the returned response 

- I think that in a real world application the filters will be generated from the backend API using a sort of "data enrichment" system which generates metadata, tags and filters so that the frontend can "make sense of the data" without blocking the browser JavaScript thread with CPU operations and at the same time without sending too many API requests for filtering purpose;


## API Integration and Data layer implementation

- The API integration was done in such a way that lazy-loading could be simulated on scroll;

- Since the API only returns 10 items, hence a workaround is to iteratively add those 10 items to the store and simulate a list end when it's above 300

## Useful resources
  - [Create React App](https://github.com/facebook/create-react-app)
  - [Next.js](https://nextjs.org/)
  - [Test with Jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest)
  - [TypeScript](https://www.typescriptlang.org/)
  - [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
  - [Responsive web design](https://en.wikipedia.org/wiki/Responsive_web_design)