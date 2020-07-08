(function () {
    // 'use strict';

    function startSetup(sliderSize, slideSize, animationDuration, autoplayInterval) {

        this.sliderSize = parseFloat(sliderSize) / 100;
        this.slideSize = parseFloat(slideSize) / 100;
        this.animationDuration = parseFloat(animationDuration);
        this.autoplayInterval = parseFloat(autoplayInterval);

    };

    function Slider(newSlider, sliderSize, slideSize, animationDuration, autoplayInterval) {

        this.startSetup = new startSetup(sliderSize, slideSize, animationDuration, autoplayInterval),

            this.wrapper = newSlider.querySelector('.wrapper');

        this.slides = newSlider.querySelectorAll('.circular-slider .wrapper .slides-holder .slides-holder__item');

        this.slidesSize = 0;

        this.descriptionsHolder = newSlider.querySelector('.circular-slider .wrapper .descriptions');

        this.descriptions = newSlider.querySelectorAll('.circular-slider .wrapper .descriptions .descriptions__item');

        this.slidesHolder = newSlider.querySelector('.circular-slider .wrapper .slides-holder');

        this.btnLeft = newSlider.querySelector('.circular-slider .wrapper .controls .controls__left');

        this.btnRight = newSlider.querySelector('.circular-slider .wrapper .controls .controls__right');

        this.btnAutoplay = newSlider.querySelector('.circular-slider .wrapper .controls .controls__autoplay');

        this.currentAngle = 0;

        this.stepAngle = 2 * Math.PI / newSlider.querySelectorAll('.circular-slider .wrapper .slides-holder .slides-holder__item').length;

        this.currentSlide = 0;

        this.slidesHolder.style.transitionDuration = this.startSetup.animationDuration + 'ms';
        this.onResize();
        this.setAutoplay();
        this.setNav();
        this.addStyle();

        let _this = this;
        // this.btnAutoplay.onclick = function() {

        //     if( this.classList.contains( 'controls__autoplay_running' ) ) {

        //         this.classList.remove( 'controls__autoplay_running' );
        //         this.classList.add( 'controls__autoplay_paused' );
        //         clearInterval( _this.autoplay );
        //         _this.autoplay = null;

        //     } else {

        //         this.classList.remove( 'controls__autoplay_paused' );
        //         this.classList.add( 'controls__autoplay_running' );
        //         _this.setAutoplay(); 

        //     }

        // }

    };

    Slider.prototype.onResize = function () {
        setTimeout(() => {

            let radius,
                w = this.wrapper.parentNode.getBoundingClientRect().width,
                h = this.wrapper.parentNode.getBoundingClientRect().height;

            2 * h <= w ? radius = h * this.startSetup.sliderSize
                : radius = (w / 2) * this.startSetup.sliderSize;

            this.setSize(Math.round(radius));

        }, 200);
    };

    Slider.prototype.setSize = function (radius) {
        setTimeout(() => {

            this.wrapper.style.width = 2 * radius + 'px';
            this.wrapper.style.height = radius + 'px';

            let r = 2 * radius * (1 - this.startSetup.slideSize);
            this.slidesHolder.style.width = this.slidesHolder.style.height = r + 'px';
            this.slidesRepositioning(r / 2);

            this.slidesHolder.style.marginTop = radius * this.startSetup.slideSize + 'px';
            this.descriptionsHolder.style.width = (r / 2 - r * this.startSetup.slideSize + 20) * 2 + 'px';
            this.descriptionsHolder.style.height = r / 2 - r * this.startSetup.slideSize + 20 + 'px';

            this.slidesSize = Math.min(2 * radius * this.startSetup.slideSize, this.stepAngle * radius * (1 - this.startSetup.slideSize));
            this.descriptionsHolder.style.fontSize = window.innerHeight < window.innerWidth ? '1.2vh'
                : '1.2vw';
            for (let i = 0; i < this.slides.length; i++) {
                this.slides[i].style.width = this.slides[i].style.height = this.slidesSize + 'px';
            };
        }, 200);

    };

    Slider.prototype.slidesRepositioning = function (r) {

        for (let i = 0; i < this.slides.length; i++) {

            let x = r * Math.cos(this.stepAngle * i - Math.PI / 2),
                y = r * Math.sin(this.stepAngle * i - Math.PI / 2);
            this.slides[i].style.transform = 'translate( ' + x + 'px, ' + y + 'px ) rotate( ' + this.stepAngle * 180 / Math.PI * i + 'deg )';

        };

    };

    Slider.prototype.rotate = function (multiplier) {

        let _this = this;

        this.removeStyle();
        setTimeout(() => {
            this.resetNavs();
        }, 200);

        if (this.currentSlide === this.slides.length - 1 && multiplier === -1) {

            this.slidesHolder.style.transform = 'rotate( -360deg )';
            this.currentSlide = this.currentAngle = 0;
            this.addStyle();

            setTimeout(function () {

                _this.slidesHolder.style.transitionDuration = 0 + 's';
                _this.slidesHolder.style.transform = 'rotate( ' + _this.currentAngle + 'deg )';
                setTimeout(function () { _this.slidesHolder.style.transitionDuration = _this.startSetup.animationDuration + 'ms'; }, 20);

            }, this.startSetup.animationDuration);

        } else if (this.currentSlide === 0 && multiplier === 1) {

            this.slidesHolder.style.transform = 'rotate( ' + this.stepAngle * 180 / Math.PI + 'deg )';
            this.currentSlide = _this.slides.length - 1;
            this.currentAngle = -(2 * Math.PI - _this.stepAngle) * 180 / Math.PI;
            this.addStyle();

            setTimeout(function () {

                _this.slidesHolder.style.transitionDuration = 0 + 's';
                _this.slidesHolder.style.transform = 'rotate( ' + _this.currentAngle + 'deg )';
                setTimeout(function () { _this.slidesHolder.style.transitionDuration = _this.startSetup.animationDuration + 'ms'; }, 20);

            }, this.startSetup.animationDuration);

        } else {

            this.currentSlide -= multiplier;
            this.currentAngle += (this.stepAngle * 180 / Math.PI) * multiplier;
            this.slidesHolder.style.transform = 'rotate( ' + this.currentAngle + 'deg )';
            this.addStyle();

        };

    };

    Slider.prototype.setNav = function () {

        let _this = this;
        _this.btnLeft.onclick = function () { _this.rotate(1) };
        _this.btnRight.onclick = function () { _this.rotate(-1) };

    };

    Slider.prototype.disableNav = function () {

        this.btnLeft.onclick = null;
        this.btnRight.onclick = null;

    };

    Slider.prototype.setAutoplay = function () {
        let _this = this;
        this.autoplay = setInterval(function () { _this.rotate(-1) }, _this.startSetup.autoplayInterval + 20);
    };

    Slider.prototype.removeStyle = function () {

        let x = this.currentSlide;

        this.descriptions[x].classList.remove('descriptions__item_visible');
        this.slides[x].classList.remove('slides-holder__item_active');
        this.slides[x].style.height = this.slides[x].style.width = this.slidesSize + 'px';

    };

    Slider.prototype.addStyle = function () {

        let x = this.currentSlide;

        this.descriptions[x].classList.add('descriptions__item_visible');
        this.slides[x].classList.add('slides-holder__item_active');
        this.slides[x].style.height = this.slides[x].style.width = this.slidesSize + 20 + 'px';

    };

    Slider.prototype.resetNavs = function () {

        let _this = this;

        this.disableNav();
        setTimeout(function () { _this.setNav() }, this.startSetup.animationDuration + 20);
        if (this.autoplay != null) {
            clearInterval(this.autoplay);
            this.setAutoplay();
        };

    };

    ///////////Init sliders/////////// 
    setTimeout(() => {
        if (this.mobileAndTabletCheck()) {
            console.log(this.mobileAndTabletCheck());
            if (mq_320.matches) {
                // window width is at less than 320px
                window.circularSlider1 = new Slider(document.querySelector('.circular-slider-1'), 200, 10, 600, 2500);
            } else if (mq_425.matches) {
                // window width is greater than 320px
                window.circularSlider1 = new Slider(document.querySelector('.circular-slider-1'), 250, 10, 600, 2500);
            } else {
                // window width is greater than 320px
                window.circularSlider1 = new Slider(document.querySelector('.circular-slider-1'), 80, 10, 600, 2500);
            }
        } else {
            window.circularSlider1 = new Slider(document.querySelector('.circular-slider-1'), 80, 10, 600, 2500);
        }
        // window.circularSlider2 = new Slider(document.querySelector('.circular-slider-2'), 90, 13, 700, 3000);
        // window.circularSlider3 = new Slider(document.querySelector('.circular-slider-3'), 80, 18, 800, 3700);
        // window.circularSlider4 = new Slider(document.querySelector('.circular-slider-4'), 70, 20, 900, 4200);
    }, 500)

    // let sliders = [window.circularSlider1, window.circularSlider2, window.circularSlider3, window.circularSlider4];
    let sliders = [window.circularSlider1];

    window.mobileAndTabletCheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    var mq_320 = window.matchMedia("(max-width: 320px)");
    var mq_425 = window.matchMedia("(min-width: 320px and max-width: 425px)");

    window.onresize = function () {

        for (let i = 0; i < sliders.length; i++) {
            console.log("slider", sliders.length);
            // sliders[i].resetNavs();
            // sliders[i].onResize();

        };

    };
    //////////////////////

})(); 

