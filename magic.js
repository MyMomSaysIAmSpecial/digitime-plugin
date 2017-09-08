const injection = (function () {
    "use strict";

    let elements = {};

    function formatNumber(number) {
        return ('0' + number).slice(-2);
    }

    return {
        init: function () {
            elements = {
                timer: document.querySelector('.time_left'),
                balance: document.querySelector('.overall_time'),
                caption: document.querySelector('#user_caption'),
            };

            return this;
        },

        process: function () {
            if (elements.timer) {
                let balanceIsNegative = elements.balance.innerText.charAt(0) !== '+';

                let [pureTime, balanceTime] = elements.timer.innerText.split(' ');
                let [hours, minutes] = pureTime.split(':');

                let workend = new Date();
                workend.setMinutes(workend.getMinutes() + parseInt(minutes) + hours * 60);

                elements.caption.style.textDecoration = 'none';
                elements.caption.style.maxWidth = '400px';
                elements.caption.innerText = 'Darbo pabaiga: '
                    + formatNumber(workend.getHours()) + ':'
                    + formatNumber(workend.getMinutes());

                [hours, minutes] = balanceTime.split(':');

                workend = new Date();
                let already = false;
                if (hours.indexOf('+') >= 0) {
                    already = true;
                    balanceIsNegative = false;

                    hours = hours.substr(1,);
                    workend.setMinutes(workend.getMinutes() - Math.abs(parseInt(minutes) + hours * 60));
                } else {
                    workend.setMinutes(workend.getMinutes() + parseInt(minutes) + hours * 60);
                }

                const balanced = document.createElement('span');
                balanced.style.fontSize = '18px';
                balanced.style.color = '#CE0000';
                balanced.innerText = ''
                    + formatNumber(workend.getHours()) + ':'
                    + formatNumber(workend.getMinutes())
                    + (already ? ' 🏠' : '');

                if (!balanceIsNegative) {
                    balanced.style.color = '#9CCF31';
                }

                elements.caption.innerHTML = elements.caption.innerText + ' ' + balanced.outerHTML;
            }
        }
    };
}());

injection
    .init()
    .process();