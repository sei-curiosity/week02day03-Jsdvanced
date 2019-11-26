[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Advanced JS

## Objectives
- Explain what a block is.
- Describe the difference between global and local scope in JavaScript.
- Identify which part(s) of JavaScript create new scope.
- Identify which variables are accessible in various scopes.
- Define a call back function
- Use pass a callback function to another function and invoke it
- Use an anonymous function with an array iteration method

## Preparation

1.  Fork and clone this repository.
<!-- 1.  Create a new branch, `training`, for your work.
1.  Checkout to the `training` branch. -->


### Blocks

A Block statement is used to group code together. To create a block, we use a pair of curly braces:
<!-- start code block file="snippets/block.js" -->
```js
{
  // Statements
}
```
<!-- end code block -->


Optionally, a block can be labeled as a visual identifier or as a target for [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break). 

Blocks are also used with functions, conditionals and loops:

<!-- start code block file="snippets/block-examples.js" -->
```js
if ( /* true || false */ ) { /* within the block, body of conditional */  }
for ( /* let i = 0; ...*/ ) { /* within the block, body of loop */ }
while ( /* i < num ... */ ) { /* within the block, body of loop */ }
function ( /* arg1, arg2 */ ) { /* within the block, body of function */ }

```
<!-- end code block -->

In addition to grouping code together, blocks create a new scope for the variables defined within the block.

### Scope

When we use blocks, we create a new scope for the variables defined within the block. Within a block, if we are using the ES6 `let` and `const` variables (which you should), these variables have _block scope_, meaning the variables defined within the block are limited in scope to the block in which it is defined:

#### Demo - creating block scope

<!-- start code block file="snippets/block-scope.js" -->
```js
const name = 'Danny'
{
  const name = 'Caleb'
}
console.log(name) // prints 'Danny'

// name = 'Caleb' is limited in scope to the block in which it is defined
```
<!-- end code block -->

You can think of scope as a collection of nested boxes. Each scope acts as a container in which variables and functions can be declared. while JavaScript is executing code within a scope, it only has access to identifiers declared in the current scope and higher scopes, the parent and global scopes.

<!-- end code block -->

#### Demo - global and local scope

Let's see some more code examples of scopes.

Remember that block scope means our different scopes are separated by blocks `{ }`.

<!-- start code block file="snippets/block-scope2.js" -->
```js
// I am not inside a block
if (true) {
  // i am inside a block
}
// I am not inside a block
```
<!-- end code block -->

*NOT* objects but blocks.

<!-- start code block file="snippets/block-not-object.js" -->
```js
if (true) {
  // i am inside a block
}

const obj = {
  prop1: 'I am not inside a block',
  prop2: 'This is an object silly'
}
```
<!-- end code block -->

The outer most scope is the _global scope_ and all inner scopes are considered
_local scopes_:

<!-- start code block file="snippets/global-local-scope.js" -->
```js
// global scope
if (true) {
  // local scope
}
// global scope
```
<!-- end code block -->

Variables are accessible within the scope they are declared:

<!-- start code block file="snippets/global-local-scope-vars.js" -->

```js
// global scope
if (true) {
  // local scope
  const x = 1  // what would happen if `var` were used instead?
  console.log(x)  // 1
  // When should we use `console` functions?
}
// global scope
console.log(x)  // ReferenceError: x is not defined
```
<!-- end code block -->

Variables are accessible to any inner scopes (child scopes):

<!-- start code block file="snippets/child-scope-vars.js" -->
```js
// global scope
let x = 1

if (true) {
  // local scope
  x = 2
  console.log(x)  // 2
}
// global scope
console.log(x)  // 2
```
<!-- end code block -->

But not to the scopes above them (parent scopes):

<!-- start code block file="snippets/parent-scope-vars.js" -->
```js
// global scope
const x = 1

if (true) {
  // local scope
  const y = x
  console.log(y)  // 1
}
// global scope
console.log(x)  // 1
console.log(y)  // ReferenceError: y is not defined
```
<!-- end code block -->

Variables are not accessible from sibling scopes:

<!-- start code block file="snippets/sibling-scope.js" -->
```js
if (true) {
  // local scope of 1st sibling
  const a = 1
  console.log(a) // 1
}

if (true) {
  // local scope of 2nd sibling
  console.log(a) // ReferenceError: a is not defined
}
```
<!-- end code block -->

Different scopes can have variables that are declared with the same name and
they do not conflict or know about each other.

<!-- start code block file="snippets/different-scope-vars.js" -->
```js
// global scope
const x = 1
console.log(x)  // 1

if (true) {
  // local scope
  const x = 2
  console.log(x)  // 2
}
// global scope
console.log(x)  // 1
```
<!-- end code block -->

So that means a variable declared in the global scope is accessible by all of
the scopes we create and a variable declared in a local scope is only
accessible to itself and its child scopes.

#### Code Along - debugging variable scope

Within `bin/scope-practice.js`, let's get some practice creating global and nested block scopes.

<!-- start code block file="snippets/debugging-variable-scope.js" -->

```js
// global scope
const a = 1

if (true) {
  // local scope of 1st nested if statement
  const b = 2

  if (true) {
    // local scope of 2nd nested if statement
    const c = 3
    console.log(a) // 1
    console.log(b) // 2
    console.log(c) // 3
  }

  // local scope of 1st nested if statement
  console.log(a) // 1
  console.log(b) // 2
  console.log(c) // ReferenceError: c is not defined
}

// global scope
console.log(a) // 1
console.log(b) // ReferenceError: b is not defined
console.log(c) // ReferenceError: c is not defined
```
<!-- end code block -->

Conditions are just 1 example of block scope.
Loops are another example of block scope.

<!-- start code block file="snippets/scope-creation-examples.js" -->

```js
while (true) { // don't run this
  const a = 1
  console.log(a) // 1
}
console.log(a) // ReferenceError: a is not defined

//  For Loops still have block scope even though the syntax is different.

for (let i = 1; i < 2; i++) {
  console.log(i) // 1
}
console.log(i) // ReferenceError: i is not defined

// Functions are another example of block scope.

const anyFunction = function () {
  const a = 1
  console.log(a) // 1
}

console.log(a) // ReferenceError: a is not defined

// The scope of our parameters are within the function block as well

const print = function (a) {
  console.log(a)
}

print(1) // 1
console.log(a) // ReferenceError: a is not defined
```
<!-- end code block -->

As we have seen, utilizing scope provides great utility. We get more control over who can access and manipulate our data. We can use scope to declare a variable without polluting the global namespace. Scoping provides a way to __encapsulate__ data and prevent other parts of our applciation from accessing variables declared within a certain scope.

When you are not familiar with the rules of scope, it will be a common source of bugs and frustration. By being aware of how scope is created, and by using scope effectively, you will write code that is more efficient, organized and less error prone.

#### Best Practices:
- Don't declare or depend on global state
- Apply the [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege): Allow code to access the information and resources that are necessary for it to run, and nothing more.
  - Encapsulate code as much as possible in scope using functions and blocks
- Never use `var` (prefer `const` over `let`, but never use `var`)
- Never depend on scope state
- Always pass in state as an argument when it is needed

### Callbacks

Along with primitives and reference types, you can also pass in functions
into other functions. A function at the end of the day is just another kind
of object.

A function that is passed to another function is called a _callback_.

```js
const add = function (num1, num2) {
  return num1 + num2
}

const subtract = function (num1, num2) {
  return num1 - num2
}

const doMath = function (num1, num2, operation) {
  return operation(num1, num2)
}

doMath(2,1, add) // 3
doMath(2,1, subtract) // 1
```

This is a *very important term*: What is a *callback*?

A callback is a function that is passed to another function.

## Array Iteration Methods

We'll explore the array methods that allow us to test and transform arrays more
simply and consistently, [Iteration
methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods),
and optionally at the end, we'll model some of these JavaScript Array methods as
functions. Being able to use these methods correctly is our main goal.

There are two main groups of array iteration methods:

1. Those that must process all of the array elements
1. Those that may only process a subset of the array elements

### Processing all array elements

#### Demo: using `forEach`

The
[forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
method iterates over all of the elements in an array. Unlike a `for` loop, it
cannot be stopped (all elements are processed).  `forEach` returns `undefined`.

From the MDN documentation:

    There is no way to stop or break a forEach() loop other than by throwing an
    exception. If you need such behavior, the forEach() method is the wrong
    tool, use a plain loop instead. If you are testing the array elements for a
    predicate and need a Boolean return value, you can use every() or some()
    instead. If available, the new methods find() or findIndex() can be used for
    early termination upon true predicates as well.

This means that `forEach` is a poor choice for an array operation that may
terminate early.

#### Code along: using `map`

The
[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
method returns a **new** array the same size as the existing array.  The
elements of the new array are set to the return value of the callback passed to
`map` invoked with the corresponding element from the original array as its
argument (e.g. `newArray[i] = callback(array[i])`).  The array `map` is called
upon is **not** mutated.

#### Lab: using `filter`

The
[filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
method returns a **new** array containing elements from the original array for
which the callback returns `true`.  `filter` uses a predicate callback method to
decide on which elements to add to the new array that it returns. The length of
the new array may be 0 if the callback returned `false` for every element, or
equal to the length of the original array, if the callback returned `true` for
every element in the original array.

Callbacks passed to `filter` should be predicate functions.

### Processing a subset of the array elements

#### Demo: using `findIndex`

The
[findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
method returns the index of the first element in the array for which the
callback returns true.

Why do we need `findIndex`?  Why not just use
[indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)?

#### Code along: using `find`

The
[find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
method returns the first element in the array for which the callback returns
true.

#### Code along: using `some`

The
[some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
method return true if the callback returns `true` for any element of the array.

Callbacks passed to `some` should be predicate functions.

#### Lab: using `every`

The [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
method checks to see if all elements of the array meet some test.  The function
used for this should only return `true` or `false`.  This type of function is
often called a predicate.

Callbacks passed to `every` should be predicate functions.

### Additional Resources
- [MDN - Blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)
- [MDN - Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [You Don't Know JS - Chapter 3](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
- [Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
