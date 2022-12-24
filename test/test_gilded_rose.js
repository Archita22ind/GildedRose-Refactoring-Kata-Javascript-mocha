var {expect} = require('chai');

// var {Shop, Item} = require('../src/gilded_rose.js');
var {Shop, Item} = require('../src/refactored_gilded_rose.js');

//Generic test cases of the updateQuantity function
describe("Gilded Rose Common Test Cases", function() {

  let gildedRose;
  beforeEach(() => {
  gildedRose = new Shop([
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Conjured Mana Cake', 3, 6),
  ]);
  });

  it('Update quantity function does not add or remove items', () => {
    const length = gildedRose.items.length;
    gildedRose.updateQuality(gildedRose.items);
    expect(gildedRose.items.length).to.equal(length);
  });

  it('Update quantity function does not alter item names', () => {
      const names = gildedRose.items.map(elememt => elememt.name);
      gildedRose.updateQuality(gildedRose.items);

      for (let i = 0; i < gildedRose.items.length; i++) {
          expect(gildedRose.items[i].name).to.equal(names[i]);
      }
  });

  it('Update quantity function lowers sellIn value by 1 on each day', () => {
    const sellIn = gildedRose.items[0].sellIn;

    gildedRose.updateQuality(gildedRose.items);
    expect(gildedRose.items[0].sellIn).to.equal(sellIn-1);
});

}); 

//Basic Test cases as well as for standard items
describe("Gilded Rose Test Cases General and for Standard Items", function() {
 

  it('Quality of an item cannot be negative', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      for (let i = 0; i < gildedRose.items[0].quality + 20; i++) {
        gildedRose.updateQuality(gildedRose.items);
      }
      expect(gildedRose.items[0].quality).to.equal(0);
  });


  it('Maximum Quality of item cannot be grerater than 50', () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 50, 40)]);
    for (let i = 0; i < 40; i++) {
      gildedRose.updateQuality(gildedRose.items);
    }
    expect(gildedRose.items[0].quality).to.equal(50);
  });


  it('Items can have a sellIn day less than 0', () => {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
    for (let i = 0; i < gildedRose.items[0].sellIn + 20; i++) {
      gildedRose.updateQuality(gildedRose.items);
    }
    expect(gildedRose.items[0].sellIn).to.be.lessThan(0);
  });

  it("Quality of a Standard item decreases twice as fast after sellIn date is passed", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(4);
  });

  it("Quality of a Standard item decreases twice as fast after sellIn date is passed", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(5);
  });

  it("Quality of a Standard item decreases twice as fast after sellIn date is passed", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", -5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-6);
    expect(items[0].quality).to.equal(6);
  });

  it("Quality of a Standard item decreases by 1 while within sellIn date", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 8, 16)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(7);
    expect(items[0].quality).to.equal(15);
  });

});

// Test Case for Aged Brie Items
describe("Gilded Rose Test Cases for Aged Brie Items", function() {

  it('Quality increases for Aged Brie the older it gets (max- 50) check in a loop', () => {
    let quality = 0;
    const gildedRose = new Shop([new Item("Aged Brie", 15, 40)]);
    expect(gildedRose.items[0].name).to.match(/^Aged*/);
    
    for (let i = 0; i < 20; i++) {
        quality = gildedRose.items[0].quality;
        gildedRose.updateQuality(gildedRose.items);
        expect(gildedRose.items[0].quality <= 50 && gildedRose.items[0].quality >=quality ).to.be.ok;
    }
  });

  it("Quality increases with age", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 20, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(19);
    expect(items[0].quality).to.equal(1);
  });

  it("Quality increases twice outside sellIn with age even outside SellIn date", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(1);
  });

  it("Quality increases with age but maximum is 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  it("Quality increases twice outside sellIn with age but maximum is 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(22);
  });

  it("Quality increases twice outside sellIn with age but maximum is 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 21) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(23);
  });

  it("Quality increases twice outside sellIn with age but maximum is 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -5, 12) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-6);
    expect(items[0].quality).to.equal(14);
  });

 
}); 

// Test Case for Sulfuras Items
describe("Gilded Rose Test Cases for Sulfuras Items, not Sold and not Quality changes", function() {

  it("Should not be sold or have a change in Quality", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", -1, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(80);
  });

  it("Should not be sold or have a change in Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  it('No update on quality for Sulfuras items in a Loop', () => {
    let quality = 0;
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 15, 80)]);
    expect(gildedRose.items[0].name).to.match(/^Sulfuras*/);
    for (let i = 0; i < 20; i++) {
        quality = gildedRose.items[0].quality;
        gildedRose.updateQuality(gildedRose.items);
        expect(gildedRose.items[0].quality).to.equal(quality);
    }
  });
}); 

// Test Case for Backstage Items
describe("Gilded Rose Test Cases for Backstage Items", function() {

  gildedRose = new Shop([
    new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  ]);

  it('Quality increases by 1 when more than 10 days left concert', () => {
    let quality = 0;

    for (let i = 0; i < 5; i++) {
        quality = gildedRose.items[0].quality;
        gildedRose.updateQuality(gildedRose.items);
        expect(gildedRose.items[0].quality).to.equal(quality + 1);
        expect(gildedRose.items[0].sellIn).greaterThanOrEqual(10);
    }
});

// Quality increases by 2 when there are 10 days or less
it('increases faster (by 2) when the concert approaches', () => {
    let quality = 0;

    for (let j = 0; j < 5; j++) {
        quality = gildedRose.items[0].quality;
        gildedRose.updateQuality(gildedRose.items);
        expect(gildedRose.items[0].quality).to.equal(quality + 2);
        expect(gildedRose.items[0].sellIn).greaterThanOrEqual(5);
    }
});

// and by 3 when there are 5 days or less
it('increases even faster (by 3) when the concert approaches', () => {
    let quality = 0;

    for (let j = 0; j < 5; j++) {
        quality = gildedRose.items[0].quality;
        gildedRose.updateQuality(gildedRose.items);
        expect(gildedRose.items[0].quality).to.equal(quality + 3);
        expect(gildedRose.items[0].sellIn).greaterThanOrEqual(0);
    }
});

// Quality drops to 0 after the concert i.e. sellIn date less than 0
  it('drops to 0 when the concert is over', () => {
    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality(gildedRose.items);
      expect(gildedRose.items[0].quality).to.equal(0);
    }
  
  });


  it("Quality increased by 2(but a max of 50) when the sellIn days are 10 or less", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  it("Quality increased by 3 (but a max of 50) when the sellIn days are 5 or less", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(3);
    expect(items[0].quality).to.equal(50);
  });

  it("Quality does not increase more than Max value 50", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert",3, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(2);
    expect(items[0].quality).to.equal(50);
  });


});

// Test Case for Conjured Items
describe("Gilded Rose Test Cases for Conjured Items", function() {

  it("Quality degrades twice as fast as normal items within SellIn date", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(2);
    expect(items[0].quality).to.equal(4);
  });

  it("Quality degrades twice as fast as normal items outside SellIn date", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", 1, 3) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Conjured Mana Cake");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(1);
  });

  it("Quality degrades twice as fast as normal items outside SellIn date", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", 0, 8) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Conjured Mana Cake");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(4);
  });

  it("Quality degrades twice as fast as normal items outside SellIn date", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", -4, 8) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Conjured Mana Cake");
    expect(items[0].sellIn).to.equal(-5);
    expect(items[0].quality).to.equal(4);
  });

  it("Quality degrades twice as fast as normal items outside SellIn date", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", -4, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.match(/^Conjured*/);
    expect(items[0].sellIn).to.equal(-5);
    expect(items[0].quality).to.equal(0);
  });

});
