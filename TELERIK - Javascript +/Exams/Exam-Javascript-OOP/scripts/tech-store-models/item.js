define([], function() {
    var itemTypes = ['accessory', 'smart-phone', 'notebook', 'pc', 'tablet'],
        NAME_MIN_LENGTH = 6,
        NAME_MAX_LENGTH = 40;

    var Item;
    Item = (function() {

        function Item(type, name, price) {
            this._name = this.name(name);
            this._type = this.type(type);
            this._price = this.price(price);
        }

        Item.prototype = {
            name: function(value) {
                if (value) {
                    // checkif value is valid
                    if (value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH) {
                        throw {
                            message: 'Item name length should be between ' + NAME_MIN_LENGTH + ' and ' + NAME_MAX_LENGTH
                        };
                    }
                    // TODO: Check if value is string

                    this._name = value;
                }
                return this._name;
            },
            type: function(value) {
                if (value) {
                    // checkif value is valid
                    if (itemTypes.indexOf(value) === -1) {
                        throw {
                            message: 'Invalid Item type'
                        };
                    }
                    this._type = value;
                }
                return this._type;
            },
            price: function(value) {
                if (value) {
                    // checkif value is valid
                    if (!(typeof value === "number" || typeof value === "Number")) {
                        throw {
                            message: 'Price must be a number'
                        };
                    }
                    if (value < 0) {
                        throw {
                            message: 'Price must be a positive number'
                        };
                    }
                    this._price = value;
                }
                return this._price;
            }
        }
        return Item;
    })();

    return Item;
});