'use strict';
let cart = {};

// FUNCTIONS //
const checkCart = function() {
    // checking cart in LocalStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }else {
    }
}

const createLayout = function(data) {
    let out = '';
    data = JSON.parse(data);
        for (const key in data) {
            out += `
            <div class="card__goods" data-name="${data[key]['name']}">
                <h2 class="card__title">${data[key]['name']}</h2>
                <img src="${data[key]['img']}" alt="#" class="card__img">
                <p>Price: <span class="card__cost" >${data[key]['cost']}</span>$</p>
                <a href="#" class="card__button" data-vc="${key}" data-cost="${data[key]["cost"]}">BUY</a>
            </div>
                `;
        }
        $('.goods').html(out);
        $('.card__button').on('click', addToCart);
        $('#cart').on('click', openModal);
}


const init = function() {
    $.post(
        "/admin/php/core.php",
        {
            "action": "loadGoods"
        },
        createLayout
    )
}



const fadeIn = function(element) {
    let opacity = 1;
    const timer = setInterval(function() {
        if (opacity <= 0.1) {
            clearInterval(timer);
            $(`.${element}`).css('display', 'none');
        }
        $(`.${element}`).css('opacity', opacity);
        opacity -=  0.1;
    }, 200);
}

const fadeOut = function(element) {
    let opacity = 0.1;
    $(`.${element}`).css('display', 'block');
    const timer = setInterval(function() {
        if (opacity => 1) {
            clearInterval(timer);
        }
        $(`.${element}`).css('opacity', opacity);
        opacity += 0.1;
    }, 500);
}

const notify = function() {
    const notification = $('.notify').attr('class');
    fadeIn(notification);
    fadeOut(notification);
}


const addToCart = function(event) {
    // adding item to cart
    event.preventDefault();
    const vc = $(this).attr('data-vc');
    const goodTitle = $(this).closest('.card__goods').attr('data-name');
    const cost = $(this).attr('data-cost');

    if (cart[vc] == undefined) {
        cart[vc] = {};
        cart[vc].count = 1;
        cart[vc].name = goodTitle;
        cart[vc].cost = cost;
        console.log(cart);
    } else {
        cart[vc].count++;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    notify();
}

const openModal = function(event) {
    // openning moadl window
    if($.isEmptyObject(cart)) {
        $('.popup__text').text('There\'s nothing in cart');
        $('.popup__form').css('display', 'none');
    } else {
        $('.popup__text').text('');
        $('.popup__form').css('display', 'flex');
    }
    event.preventDefault();
    generateModalContent();
    $('.popup').addClass('open');
    $('body').css('overflow', 'hidden');
    $('.popup').on('click', (event) => {
        event.preventDefault();
        if (event.target.className == 'popup__close' || event.target.className == 'popup__body') {
            $('body').css('overflow', 'visible');
            $('.popup').removeClass('open');
            $('.form__warning').text('');
        }
    });
}


const generateModalContent = function() {
    let layout = ``;
    for (const item in cart) {
        layout += `
        <div class="popup__item">
            <div class="popup__quantity">
                <div class="popup__title">${cart[item]["name"]}</div>
                <div class="popup__span">
                    <span class="popup__more" data-vc=${item}>+</span>
                    <span class="popup__number">${cart[item]["count"]}</span>
                    <span class="popup__less" data-vc=${item}>-</span>
                </div>
            </div>
             <span class="cost">${+cart[item]["cost"] * cart[item]["count"]}$</span>
        </div>
        `;
    }
    $('.popup__inner').html(layout);
    $('.popup__more').on('click', addGood);
    $('.popup__less').on('click', removeGood);
}

const addGood = function() {
    const vc = $(this).attr('data-vc');
    cart[vc].count++;
    localStorage.setItem('cart', JSON.stringify(cart));
    generateModalContent();
}

const removeGood = function() {
    const vc = $(this).attr('data-vc');
    if (cart[vc].count > 1) {
        cart[vc].count--;
    } else {
        delete cart[vc];
        if($.isEmptyObject(cart)) {
            $('.popup__text').text('There\'s nothing in cart');
            $('.popup__form').css('display', 'none');
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    generateModalContent();
}

const sendEmail = function() {
    const uname = $('#name').val(),
          uphone = $('#phone').val(),
          uemail = $('#email').val();
    console.log(uname);
    if (uname != '' && uphone != '' && uemail != '') {
        $.post(
            "core/mail.php",
            {
                "uname": uname,
                "uphone": uphone,
                "uemail": uemail,
                "cart": cart
            },
            (data) => {
                console.log(data);
            }
        );

        $('.form__warning').css('color', '#16a085');
        $('.form__warning').text('We just sent you an email with your order, check it out during 5 minutes.');
        $('#name').val('');
        $('#phone').val('');
        $('#email').val('');
    } else {
        $('.form__warning').css('color', '#ff3232');
        $('.form__warning').text('You should complete all fields.');
    }   
}


$('document').ready(() => {
    init();
    checkCart();
    $('#submit').on('click', sendEmail);
});