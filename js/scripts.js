$('a.layover-open').on('click', function() {
    var rightPic = $(this).attr('data-image');
    var rightAvatar = $(this).next('div').children('div').attr('data-image');
    var text = $(this).next('div').children('span').html();
    var lightbox = $('#lightbox');
    lightbox.children('img').attr('src', rightPic);
    lightbox.children('div').children('img').attr('src', rightAvatar);
    lightbox.children('div').children('span').html(text);
    $(document).foundation('reveal', 'open');
});
