$(function () {
    $('.menu__elems').click('li', function (e) {
        e.preventDefault();

        //меню
        const elem = $(e.target).parent('li');
        if (elem.children().hasClass('submenu')) {
            $('.menu__elems').find('.submenu').slideUp();
            if (elem.hasClass('active')) {
                elem.find('.submenu').slideUp();
                elem.toggleClass('active')
            } else {
                elem.find('.submenu').slideDown();
                elem.toggleClass('active')
            }
            $('.menu__elems').find('li').not(elem).removeClass('active');
        } else {
            let href = $(e.target).attr('href');
            location.href = href;
            alert('переход');
        }
    })

    const bgArr = {
        scents: '#deb9b3',
        home: '#e1d7d3',
        products: '#a7d4b1',
        about: '#d7994d'
    }

    $('.menu__elem').mouseover(function (e) {
        const bgColor = bgArr[$(e.currentTarget).find('a').data('name')];
        $('.menu').css('background-color', bgColor);

        //смена изображения
        $('.menu__img img').hide();
        $('.menu__img img').each(function (index, item) {
            if ($(item).attr('id') == $(e.currentTarget).find('a').data('name')) {
                $(item).css('display', 'block');
            }
        })
    });

    $('.menu__elem').mouseout(function (e) {
        //смена изображения
        $('.menu__img img').hide();
        const active = $('.menu__elem').filter('.active').find('a').data('name');
        $('.menu__img img').each(function (index, item) {
            if ($(item).attr('id') == active) {
                $(item).show();
            }
        })
        const bgColor = bgArr[active];
        $('.menu').css('background-color', bgColor);

    });



    const tl = new TimelineMax({ paused: true });

    tl.to('.menu', 0.2, {
        opacity: 1
    }).from('.menu__left h2', 0.5, {
        delay: -0.5,
        opacity: 0,
        x: -10,
        ease: Power3.easeInOut
    }).staggerFrom('.menu__elem', 0.5, {
        opacity: 0,
        x: -10,
        y: 10,
        ease: Power3.easeInOut
    }, 0.05)
        .from('.menu__img-wrap', 1, {
            delay: -0.8,
            opacity: 0,
            x: 700,
            ease: Power3.easeInOut
        })
        .from('.menu__contacts', 0.6, {
            delay: -0.5,
            opacity: 0,
            y: 10,
            ease: Power3.easeInOut
        })


    tl.reverse();

    $(".header__menu").click(function () {
        $(".menu").css('display', 'block');
        $(".header__menu").toggleClass('close');

        tl.reversed(!tl.reversed());
        let activeImg = $('.menu__elem').filter('.active').find('a').data('name');
        $('.menu__img img').each(function (index, item) {
            console.log(activeImg)
            if ($(item).attr('id') == activeImg) {
                $(item).show();
            }
        })
    });

})