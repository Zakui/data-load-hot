# sense-hat-locations

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.com/eHealthAfrica/sense-hat-locations
[travis-image]: https://travis-ci.com/eHealthAfrica/sense-hat-locations.svg?token=ikN1EMYCoKvvAcr8sswV&branch=master

> Location data for Sense HAT

A static JSON file of locations used in the Sense HAT mobile application.

## Usage

Add a locations CSV file in `data`. Set the zones ("Zone de Santé") you're
filtering on in the `zones` list in `index.js`. Each village in a given zone
will be grouped zone, then area ("Aire de Santé").

Run `npm run build` to serialise the results as JSON.

TravisCI is set up to build and publish the resulting JSON file to our npmE
instance. In your consuming package, install
`@Zakui/data-load-hot` and simply `require` it:

```js
const locations = require('@Zakui/data-load-hot')
```

**Its important to write commit message that semantic release can understand.**

## Authors

* © 2015 Tom Vincent <tom.vincent@ehealthnigeria.org>

… and [contributors][].

[contributors]: https://github.com/eHealthAfrica/sense-hat-locations/graphs/contributors

## License 

Released under the [Apache 2.0 License][license].

[license]: http://www.apache.org/licenses/LICENSE-2.0.html
