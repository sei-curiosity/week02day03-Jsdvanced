#!/usr/bin/env node

'use strict'

// Starting array
const ages = [7, 24, 21, 18, 22]

// Use find to return the age of first age over 21
// using a predicate function
const isAdult = function (age) {
  return age >= 21
}
ages.find(isAdult) // 24

// 1.  Find the first food that is more than 20 days old
// using a predicate function called isRotten
const fridge = // eslint-disable-line no-unused-vars
  [
    { food: 'Carrots', daysInFridge: 32 },
    { food: 'Onions', daysInFridge: 23 },
    { food: 'Bell Peppers', daysInFridge: 16 },
    { food: 'Soda', daysInFridge: 7 },
    { food: 'Pizza', daysInFridge: 4 },
    { food: 'Cake', daysInFridge: 3 }
  ]

// CODE ALONG CODE GOES HERE
