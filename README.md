# Messging App

This app uses message templates to create custom messages based on inputs. 

# Getting Started

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)

## Installing the App

`npm install`

```
cd client
npm install
```

## Running the App
From Project root

`npm run dev`

# Overview

## Design

This project features a Node.js/Express back end using Mustache to handle templating. 

It features a React front end using a functional component to handle state. 

It features a limited GUI for inputs, template selection, and building custom template.

## Language 

This project uses JavaScript due to it's prowess as a full stack language, its strong front end frameworks, and its abiity to demonstrate full stack development practices. 

## Verification
Verification of program functionality can be done using the inputs in the GUI. 

Dropdowns are used to select the message you want to use, the company it's for, and the guest. The Generate Message button displays the finalized template. 

The Custom button shows a textarea where a custom template can be entered. Variable names must be wrapped in braces to display variables e.g. {{firstName}}

Note: For guest reservation information, the custom template must be formatted with reservation befor the variable e.g. {{reservation.roomNumber}}

## Nice to Haves
* Robust input verifications i.e. Company or Customer being required
* Dynamically rendered dropdowns for future development with more variables
* Create readable times for check in and check out
* More useable custom template creation


# Built With
* Express
* React
* Mustache

# Author
Alex Aspell