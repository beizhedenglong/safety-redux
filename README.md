# Safety Redux

Query and mutate Redux state safely.

## Installation

`yarn add safety-redux`

## example
```js
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { safety, safetyConnect } from 'safety-redux'

const data = {
  users: [
    {
      name: 'Victoria',
      age: 20,
    },
    {
      name: 'Victor',
      age: 20,
    },
  ],
}

const reducer = (state = data, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(
  safety(reducer),
)

let Victor = ({
  name, age, onAdd, onSubtract,
}) => (
  <div>
    <span>{`Name: ${name}`}</span>
    <br />
    <span>{`Age: ${age} `}</span>
    <button onClick={onAdd}>+1</button>
    <button onClick={onSubtract}>-1</button>
  </div>
)

const agePaths = ['users', 1, 'age']
const namePaths = ['users', 1, 'name']
const mapQueryToProps = query => ({
  age: query(agePaths),
  name: query(namePaths),
})
const mapMutateToProps = mutate => ({
  onAdd: () => mutate(agePaths, prev => prev + 1, 'ADD_AGE'),
  onSubtract: () => mutate(agePaths, prev => prev - 1),
})

Victor = safetyConnect(
  mapQueryToProps,
  mapMutateToProps,
)(Victor)

const App = () => (
  <Provider store={store}>
    <Victor />
  </Provider>
)

export default App

```

## API

### `safety(reducer)`
safety is a high-order reducer.

```js
import { createStore } from 'redux'
import { safety } from 'safety-redux'

// your reducer
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(
  safety(reducer)
)
```


### `safetyConnect(mapQueryToProps?, mapMutateToProps?)`

Like `connect` in `react-redux`, `safetyConnect` is a high-order component that bind `query` and `mutate` to react component.
  
```js
import {  safetyConnect } from 'safety-redux'

const mapQueryToProps = query => ({ todos: query(['app', 'user', 'todos']) })
const mapMutateToProps = mutate => ({
  addTodo: todo => mutate(['app', 'user', 'todos'], todos => [...todos, todo]),
})

const App = connect(mapQueryToProps, mapMutateToProps)(Todos)

```