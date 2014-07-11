define(['tech-store-models/item'], function(Item) {
    var NAME_MIN_LENGTH = 6,
        NAME_MAX_LENGTH = 30;

    var Store;
    Store = (function() {

        function returnSortedBy(sortBy) {
            var itemsList = this._itemsList.slice(0);
            return itemsList.sort(sortBy);
        }

        function sortByName(item1, item2) {
            // alphabetical sort is case insensitive sort by name 
            return (item1.name.toLowerCase() < item2.name.toLowerCase() ? -1 : 1);
        }

        function sortByPrice(item1, item2) {
            return item1.price - item2.price;
        }

        function returnItemsWithType(typeList, sortBy) {
            var itemsToReturn = [],
                itemsList = this._itemsList.slice(0);

            itemsList.map(function(item) {
                if (typeList.indexOf(item.type) > -1) {
                    itemsToReturn.push(item);
                }
            });
            return itemsToReturn.sort(sortBy);
        }

        function returnFilteredByPrice(options, sortBy) {
            var min = options.min || 0,
                max = options.max || Number.MAX_VALUE;
            var itemsToReturn = [];

            this._itemsList.map(function(item) {
                if (item.price >= min && item.price <= max) {
                    itemsToReturn.push(item);
                }
            });

            return itemsToReturn.sort(sortBy);
        }


        function Store(name) {
            this._itemsList = [];
            if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
                throw {
                    message: 'Store name length should be between ' + NAME_MIN_LENGTH + ' and ' + NAME_MAX_LENGTH
                };
            }
            this._name = name;
        }

        Store.prototype = {
            addItem: function(item) {
                //adds an item to the stock of the store. A store can keep in stock only items of type Item
                if (!(item instanceof Item)) {
                    throw {
                        message: 'Trying to add to the Store an object that is not an instance of Item'
                    };
                }
                this._itemsList.push(item);
                return this;
            },
            getAll: function() {
                return returnSortedBy.call(this, sortByName);
            },
            getSmartPhones: function() {
                return returnItemsWithType.call(this, ['smart-phone'], sortByName);
            },
            getMobiles: function() {
                return returnItemsWithType.call(this, ['smart-phone', 'tablet'], sortByName);
            },
            getComputers: function() {
                return returnItemsWithType.call(this, ['pc', 'notebook'], sortByName);
            },
            filterItemsByType: function(filterType) {
                return returnItemsWithType.call(this, [filterType], sortByName);
            },
            filterItemsByPrice: function(options) {
                var options = options || {};
                return returnFilteredByPrice.call(this, options, sortByPrice);
            },
            countItemsByType: function() {
                var typesToCountPairs = {};
                this._itemsList.map(function(item) {
                    if (item.type in typesToCountPairs) {
                        typesToCountPairs[item.type]++;
                    } else {
                        typesToCountPairs[item.type] = 1;
                    }
                });
                return typesToCountPairs;
            },
            filterItemsByName: function(partOfName) {
                var itemsToReturn = [];
                this._itemsList.map(function(item) {
                    if (item.name.toLowerCase().indexOf(partOfName.toLowerCase()) > -1) {
                        itemsToReturn.push(item);
                    }
                });

                return itemsToReturn.sort(sortByName);
            }

        };

        return Store;
    })();

    return Store;
});