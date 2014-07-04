$.fn.gallery = function() {
    var $this = this;
    var DEFAULT_COLUMNS_COUNT = 4;

    var columns = getColumns(arguments);
    var imagesCount = $this.find('.gallery-list').children().length;
    var selectedIndex,
        prevIndex,
        nextIndex;

    $this.addClass('gallery');

    // initially the 'selected' block is hidden
    $this.find('.selected').hide();

    //** set the width of the gallery so that it has 'columns' columns per row
    //** get each image box its width and possible left & right margins
    // var imageContainerWidth = $('.image-container').width() +
    //     parseInt($('.image-container').css('margin-left')) +
    //     parseInt($('.image-container').css('margin-right'));
    // $this.width(imageContainerWidth * columns);
    $this.find('.image-container:nth-child(' + columns + 'n+1)').addClass('clearfix');

    //** image onclick handler
    var onClickHandler = function() {
        selectedIndex = parseInt($(this).find('img').attr('data-info'));

        fillSelectedBlockWithImages(selectedIndex);

        // blur gallery
        $this.find('.gallery-list').addClass('blurred');
        // display enlarged image
        $('.selected').show();

        // make the gallery thumbnails not clickable removing their 'onclick' event handler
        $this.find('.image-container').off('click');

    };

    $this.find('.image-container').on('click', onClickHandler);


    // add event handler to the selected image
    $this.find('.selected .current-image').on('click', function() {
        //hide enlarged image
        $('.selected').hide();

        // remove the blurred effect
        $this.find('.gallery-list').removeClass('blurred');

        //make gallery thums clickable again
        $this.find('.image-container').on('click', onClickHandler);
    });

    // add event handler to the previous image
    $this.find('.selected .previous-image').on('click', function(e) {
        selectedIndex = prevIndex;
        fillSelectedBlockWithImages(selectedIndex);
    });

    // add event handler to the next image
    $this.find('.selected .next-image').on('click', function(e) {
        selectedIndex = nextIndex;
        fillSelectedBlockWithImages(selectedIndex);
    });


    function getColumns(args) {
        if (args.length > 0) {
            return args[0];
        }
        return DEFAULT_COLUMNS_COUNT;
    }

    function fillSelectedBlockWithImages(selectedIndex) {
        // calculate index of previous and next images
        prevIndex = (selectedIndex > 1 ? selectedIndex - 1 : imagesCount);
        nextIndex = (selectedIndex < imagesCount ? selectedIndex + 1 : 1);

        // enlarge current clicked image
        $this.find('.selected .current-image img')
            .attr('src',
                $this.find('.image-container:nth-child(' + selectedIndex + ') img').attr('src')
        );

        // set previous image
        $this.find('.selected .previous-image img')
            .attr('src',
                $this.find('.image-container:nth-child(' + prevIndex + ') img').attr('src')
        );

        // set previous and next images
        $this.find('.selected .next-image img')
            .attr('src',
                $this.find('.image-container:nth-child(' + nextIndex + ') img').attr('src')
        );
    }
};