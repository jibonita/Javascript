define([], function() {
    var itemTypes = ['accessory', 'smart-phone', 'notebook', 'pc', 'tablet'],
        NAME_MIN_LENGTH = 6,
        NAME_MAX_LENGTH = 40;

    var Item;
    Item = (function() {

        function Item(type, name, price) {
            if (itemTypes.indexOf(type) === -1) {
                throw {
                    message: 'Invalid Item type'
                };
            }
            this.type = type;

            if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
                throw {
                    message: 'Item name length should be between ' + NAME_MIN_LENGTH + ' and ' + NAME_MAX_LENGTH
                };
            }
            this.name = name;
            this.price = price;
        }

        return Item;
    })();

    return Item;
});