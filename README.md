# GildedRose-Refactoring-Kata using Javascript-mocha (Code Refactor Excercise)

## Best Practices followed

Main Approach followed:

Segregated the quality computation for each item type into a separate method. In the event, that new types of items are added in the future, one needs to just define a separate update method for that specific item, and add a new item type to the existing enum and to the switch case. This helps to achieve modularity and better readability for the code.

To keep things simple, the adopted design only refactors the Spaghetti code within the Shop Class and does not introduce any new classes.

For further improvements, I believe we can go with a factory design pattern and define a class for each item type whose objects will be provided by a generic factory class. This will enable us to adopt the Open-Closed design principle as the main logic of the Shop class will be closed for any modification but open to extension.

Some best practices followed:

1. Used the Golden Master Technique for capturing the output for different inputs and used the same output for creating tests. Through this technique, we can ensure that the code does not break after refactoring.
2. Wrote test cases with 100% coverage to capture all the scenarios for different Items.
3. Replaced verbose and traditional semantics with computational shorthands, ternary operators, enhanced for loop, etc., and also removed repetitive quality attribute calculations of the items.
4. Avoided the use of constant values like Maximum Quality allowed (50) and declared them as constant values so that the same identifier can be used throughout, and helps in code maintainability.
5. Could see redundant if-else conditional statements in the current code and multiple checks on the item type. So to segregate each of the items and their evaluation converted the nested if-else blocks with a simple item-type switch case.
6. Defined an Enum for ItemTypes to add code readability and maintainability.
7. Used the Math.min and Math.max functions to restrict the maximum and minimum possible values of the quality attribute. This approach will keep the scope open in case different items have different maximum and minimum limits in the future.

## Steps to run the Code

```sh
git clone https://github.com/Archita22ind/GildedRose-Refactoring-Kata-Javascript-mocha.git

npm install

npm test
```

## TestScript output with Test Coverage shown

<img src="https://github.com/Archita22ind/GildedRose-Refactoring-Kata-Javascript-mocha/blob/main/TestCoverage.png" >

# Gilded Rose Refactoring Kata -Original README from git repo

This Kata was originally created by Terry Hughes (http://twitter.com/TerryHughes). It is already on GitHub [here](https://github.com/NotMyself/GildedRose). See also [Bobby Johnson's description of the kata](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/).

I translated the original C# into a few other languages, (with a little help from my friends!), and slightly changed the starting position. This means I've actually done a small amount of refactoring already compared with the original form of the kata, and made it easier to get going with writing tests by giving you one failing unit test to start with. I also added test fixtures for Text-Based approval testing with TextTest (see [the TextTests](https://github.com/emilybache/GildedRose-Refactoring-Kata/tree/master/texttests))

As Bobby Johnson points out in his article ["Why Most Solutions to Gilded Rose Miss The Bigger Picture"](https://iamnotmyself.com/why-most-solutions-to-gilded-rose-miss-the-bigger-picture/), it'll actually give you
better practice at handling a legacy code situation if you do this Kata in the original C#. However, I think this kata
is also really useful for practicing writing good tests using different frameworks and approaches, and the small changes I've made help with that. I think it's also interesting to compare what the refactored code and tests look like in different programming languages.

I use this kata as part of my work as a technical coach. I wrote a lot about the coaching method I use in this book [Technical Agile Coaching with the Samman method](https://leanpub.com/techagilecoach). A while back I wrote this article ["Writing Good Tests for the Gilded Rose Kata"](http://coding-is-like-cooking.info/2013/03/writing-good-tests-for-the-gilded-rose-kata/) about how you could use this kata in a [coding dojo](https://leanpub.com/codingdojohandbook).

## How to use this Kata

The simplest way is to just clone the code and start hacking away improving the design. You'll want to look at the ["Gilded Rose Requirements"](https://github.com/emilybache/GildedRose-Refactoring-Kata/tree/master/GildedRoseRequirements.txt) which explains what the code is for. I strongly advise you that you'll also need some tests if you want to make sure you don't break the code while you refactor.

You could write some unit tests yourself, using the requirements to identify suitable test cases. I've provided a failing unit test in a popular test framework as a starting point for most languages.

Alternatively, use the "Text-Based" tests provided in this repository. (Read more about that in the next section)

Whichever testing approach you choose, the idea of the exercise is to do some deliberate practice, and improve your skills at designing test cases and refactoring. The idea is not to re-write the code from scratch, but rather to practice designing tests, taking small steps, running the tests often, and incrementally improving the design.

### Gilded Rose Requirements in other languages

- [English](GildedRoseRequirements.txt)
- [Español](GildedRoseRequirements_es.md)
- [Français](GildedRoseRequirements_fr.md)
- [日本語](GildedRoseRequirements_jp.md)
- [Português](GildedRoseRequirements_pt-BR.md)
- [Русский](GildedRoseRequirements_ru.txt)
- [ไทย](GildedRoseRequirements_th.md)
- [中文](GildedRoseRequirements_zh.txt)
- [한국어](GildedRoseRequirements_kr.md)
- [German](GildedRoseRequirements_de.md)

## Text-Based Approval Testing

This code comes with comprehensive tests that use this approach. For information about how to run them, see the [texttests README](https://github.com/emilybache/GildedRose-Refactoring-Kata/tree/master/texttests)

## Translating this code

More translations are most welcome! I'm very open for pull requests that translate the starting position into additional languages.

Please note a translation should ideally include:

- a translation of the production code for 'update_quality' and Item
- one failing unit test complaining that "fixme" != "foo"
- a TextTest fixture, ie a command-line program that runs update_quality on the sample data for the number of days specified.

Please don't write too much code in the starting position or add too many unit tests. The idea with the one failing unit test is to tempt people to work out how to fix it, discover it wasn't that hard, and now they understand what this test is doing they realize they can improve it.

If your programming language doesn't have an easy way to add a command-line interface, then the TextTest fixture is probably not necessary.

## Better Code Hub

I analysed this repo according to the clean code standards on [Better Code Hub](https://bettercodehub.com) just to get an independent opinion of how bad the code is. Perhaps unsurprisingly, the compliance score is low!

