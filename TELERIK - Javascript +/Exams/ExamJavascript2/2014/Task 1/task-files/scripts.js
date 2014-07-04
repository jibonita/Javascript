function createImagesPreviewer(selector, items) {
    var THUMB_ITEM_WIDTH = 120,
        CONTAINER_HEIGHT = 400,
        THUMBS_HOVER_BRG = '#ccc';


    var container = document.querySelector(selector);
    var previewBox = document.createElement('div');
    var previewBoxTitle = document.createElement('h1');
    var previewBoxImage = document.createElement('img');

    var thumbsBox = document.createElement('div');
    var thumbDiv = document.createElement('div');
    var thumbTitle = document.createElement('h3');
    var thumbImage = document.createElement('img');

    var currentIndex = 0,
        selectedBox = null;

    // styles
    previewBox.className = 'preview-box';
    previewBox.style.cssFloat = 'left';
    previewBox.style.textAlign = 'center';
    previewBox.style.width = '400px';
    previewBoxImage.style.width = '350px';
    previewBoxImage.style.borderRadius = '15px';

    // styles to thumbnails panel
    thumbsBox.className = 'thumbs-box';
    thumbsBox.style.display = 'inline-block';
    thumbsBox.style.textAlign = 'center';
    thumbsBox.style.height = CONTAINER_HEIGHT + 'px';
    thumbsBox.style.width = THUMB_ITEM_WIDTH + 25 + 'px';
    thumbsBox.style.overflow = 'auto';

    //styles to thumb images
    thumbDiv.style.padding = '0 3px';
    thumbTitle.style.textAlign = 'center';
    thumbTitle.style.marginBottom = '2px';
    thumbTitle.style.marginTop = '5px';
    thumbImage.style.width = THUMB_ITEM_WIDTH + 'px';
    thumbImage.style.borderRadius = '7px';

    // add the inner items of the preview box object to it
    previewBox.appendChild(previewBoxTitle);
    previewBox.appendChild(previewBoxImage);
    // add thumbnail box items to a single thumbnail object
    thumbDiv.appendChild(thumbTitle);
    thumbDiv.appendChild(thumbImage);


    function createPreviewBox() {
        previewBoxTitle.innerHTML = animals[currentIndex].title;
        previewBoxImage.src = animals[currentIndex].url;
    }

    function createFilterHtml() {
        // filter area consists of label and input area
        var filterLabel = document.createElement('label');
        var filterInput = document.createElement('input');

        filterLabel.innerHTML = 'Filter';

        //styles to the filter field
        filterLabel.style.display = 'block';
        filterInput.style.width = THUMB_ITEM_WIDTH + 'px';

        thumbsBox.appendChild(filterLabel);
        thumbsBox.appendChild(filterInput);

        // add event to the input so that filter is performed on typing
        filterInput.addEventListener('keyup', onFilterType);
    }

    function createThumbsList(items) {
        var thumbsItems = [];
        for (var i = 0; i < items.length; i++) {
            thumbTitle.innerHTML = items[i].title;
            thumbImage.src = items[i].url;
            thumbDiv.setAttribute('data-info', i);
            thumbsItems.push(thumbDiv.cloneNode(true));
        }
        return thumbsItems;
    }

    function onThumbBoxMouseover(ev) {
        this.style.background = THUMBS_HOVER_BRG;
    }

    function onThumbBoxMouseout(ev) {
        this.style.background = '';
    }

    function onThumbBoxClick(ev) {
        selectedBox = this;
        currentIndex = parseInt(this.getAttribute('data-info'));
        createPreviewBox();
    }

    function onFilterType(ev) {
        var filterString = this.value;
        filterByKey(filterString.toLowerCase(), items);
    }

    function filterByKey(key, items) {
        // thumbs that dont have the entered substring in their title will be hidden(display:none)
        for (var i = 0; i < items.length; i++) {
            if (items[i].title.toLowerCase().indexOf(key) > -1) {
                thumbs[i].style.display = '';
            } else {
                thumbs[i].style.display = 'none';
            }
        }
    }

    createPreviewBox();
    createFilterHtml();

    // append the Preview size to the DOM
    container.appendChild(previewBox);

    // add thumbnails DocumentFragment
    var thumbs = createThumbsList(items);
    var docFragment = document.createDocumentFragment();

    for (var i = 0; i < thumbs.length; i += 1) {
        docFragment.appendChild(thumbs[i]);
        // each thumb can be clicked, hoverd and unhovered
        thumbs[i].addEventListener('click', onThumbBoxClick);
        thumbs[i].addEventListener('mouseover', onThumbBoxMouseover);
        thumbs[i].addEventListener('mouseout', onThumbBoxMouseout);
    }
    thumbsBox.appendChild(docFragment);

    // finally append DocumentFragmet content to the DOM
    container.appendChild(thumbsBox);
}