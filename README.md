## Vue-Ubi-Notify

A toast / snackbar / notification plugin for Vue 2.6+ with built in support for Bootstrap, Bulma, MaterializeCSS, Semantic UI & TailwindCSS.

## Installation

NPM

```
npm install vue-ubi-notify
```

Yarn

```
yarn add vue-ubi-notify
```

## Usage

The easiest way to get up and running is via the configuration builder in [the demo app](https://rmhubbert.github.io/vue-ubi-notify).

Once you've done that, simply call the \$notify method from within your Vue instance.

Message types can be either "default", "primary", "success", "warning" or "danger".

Duration should be in milliseconds.

```
this.$notify(messageBody, messageHeading = null, messageType = null, duration = null);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
