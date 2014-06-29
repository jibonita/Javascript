// 1. Add DOM element to parent element given by selector 
// 2. Remove element from the DOM by given selector 
// 3. Attach event to given selector by given event type and event hander 
// 4. Add elements to buffer, which appends them to the DOM when their count for some selector becomes 100 
//    The buffer contains elements for each selector it gets 
// 5. Get elements by CSS selector 

var domModule = (function() {
    var BUFFER_SIZE = 5; // 100
    var buffers = {};

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function getElements(selector) {
        return document.querySelectorAll(selector);
    }

    function addElement(child, parentSelector) {
        var parent = document.querySelector(parentSelector);
        parent.appendChild(child);
    }

    function removeElement(child, parentSelector) {
        var parent = document.querySelector(parentSelector);
        parent.removeChild(child);
    }

    function addHandler(selector, eventType, eventHandler) {
        var element = getElement(selector);
        //up to IE8
        if (document.attachEvent) {
            element.attachEvent('on' + eventType);
        }
        //IE 9, IE 10, Firefox, Chrome, Opera, Safari
        else if (document.addEventListener) {
            element.addEventListener(eventType, eventHandler);
        }
        //really old browsers
        else {
            element["on" + eventType] = eventHandler;
        }
    }

    function addToBuffer(selector, elementToAdd) {
        // if there is still no buffer for the given selector, greate fragment for it and add it ot the buffers array
        if (!buffers[selector]) {
            var frag = document.createDocumentFragment();
            frag.appendChild(elementToAdd);
            buffers[selector] = frag;
        } else {
            buffers[selector].appendChild(elementToAdd);
            // if buffer limit reached for the given selector -> add elements to DOM
            if (buffers[selector].childNodes.length === BUFFER_SIZE) {
                addElement(buffers[selector], selector);

                //empty the fragment
                buffers[selector].setUserData = null;
            }
        }
    }

    function cssSelector(selector) {
        var elements = getElements(selector);
        if (!elements) return null;
        if (elements.length > 1) return elements;
        else return elements[0];
    }

    return {
        getElement: getElement,
        getElements: getElements,
        addElement: addElement,
        removeElement: removeElement,
        addHandler: addHandler,
        addToBuffer: addToBuffer,
        css: cssSelector
    };
})();