class Item {
    constructor(name, sellIn, quality){
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }

const ItemTypes = {
    AGEDBRIE: "Aged Brie",
    SULFURAS: "Sulfuras, Hand of Ragnaros",
    BACKSTAGE: "Backstage passes to a TAFKAL80ETC concert",
    CONJURED : "Conjured Mana Cake"
 };

const MAX_QUALITY_VALUE = 50;
const MIN_QUALITY_VALUE = 0;

class Shop {

    constructor(items=[]) {
      this.items = items;
    }

    updateAgedBrie (item) {
        item.sellIn -= 1;
        item.quality = item.sellIn >= 0 ? 
            Math.min(item.quality += 1 , MAX_QUALITY_VALUE ) : Math.min(item.quality += 2, MAX_QUALITY_VALUE);
        
    };

    updateBackstage (item) {
        item.sellIn -= 1;
      
        if(item.sellIn >= 10) {
            item.quality = Math.min(item.quality + 1 , MAX_QUALITY_VALUE);
        }
        else if(item.sellIn >= 5 ) {
            item.quality = Math.min(item.quality + 2, MAX_QUALITY_VALUE);
        }
        else if (item.sellIn >= 0 ) {
            item.quality = Math.min(item.quality + 3, MAX_QUALITY_VALUE);
        }
        else {
            item.quality =  0;
        }
    };

    updateStandard (item, times) {
        item.sellIn -= 1;
        item.quality =  item.sellIn < 0 ? 
            Math.max(item.quality - 2*times,  MIN_QUALITY_VALUE ) : Math.max(item.quality - 1*times, MIN_QUALITY_VALUE) ;
    };

    updateQuality() {
        for (const item of this.items) {
            switch(item.name){
                case ItemTypes.AGEDBRIE: 
                    this.updateAgedBrie(item);
                    continue;
        
                case ItemTypes.BACKSTAGE:
                    this.updateBackstage(item);
                    continue;

                case ItemTypes.CONJURED:    
                    this.updateStandard(item, 2);
                    continue;

                case ItemTypes.SULFURAS:  
                    continue;

                default:
                    this.updateStandard(item, 1);
                    continue;      
            }
        }
        return this.items;   
    }
}


module.exports = {
    Item,
    Shop
}
