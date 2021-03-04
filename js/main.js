;
(function(window, undefined) {
    const calculator = document.querySelector('.calculator')
    const keys = calculator.querySelector('.calculator__keys')
    const display = calculator.querySelector('.calculator__display')
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
    keys.addEventListener('click', event => {
        if (!event.target.closest('button')) return

        const key = event.target
        const keyValue = key.textContent
        const displayValue = display.textContent
        const { type } = key.dataset
        const { previousKeyType } = calculator.dataset

        if (type === 'number') {
            if (
                displayValue === '0' ||
                previousKeyType === 'operator'
            ) {
                display.textContent = keyValue
            } else {
                display.textContent = displayValue + keyValue
            }
        }

        if (type === 'operator') {

            operatorKeys.forEach(el => { el.dataset.state = ' ' });
            //console.log(key.dataset.state);
            key.dataset.state = 'selected';

            calculator.dataset.firstNumber = displayValue;
            calculator.dataset.operator = key.dataset.key;
        }

        if (type === 'equal') {
            // Perform a calculation
            const firstNumber = calculator.dataset.firstNumber
            const operator = calculator.dataset.operator
            const secondNumber = displayValue
            display.textContent = calculate(firstNumber, operator, secondNumber)
        }
        if (type == "clear") {
            display.textContent = "0";
            delete calculator.dataset.firstNumber
            delete calculator.dataset.operator
        }
        calculator.dataset.previousKeyType = type;
    })

    function calculate(firstNumber, operator, secondNumber) {
        firstNumber = parseInt(firstNumber)
        secondNumber = parseInt(secondNumber)

        if (operator === 'plus') return firstNumber + secondNumber
        if (operator === 'minus') return firstNumber - secondNumber
        if (operator === 'times') return firstNumber * secondNumber
        if (operator === 'divide') return firstNumber / secondNumber
    }

    /*** Testing*** */
    function clearCalculator() {
        const clearKey = document.querySelector('[data-type="clear"]');
        clearKey.click();
        operatorKeys.forEach(key => key.dataset.state = " ");
    }

    function testClearClearKey() {
        clearCalculator();
        console.assert(display.textContent == "0", "clear key should display 0");
        console.assert(!calculator.dataset.firstNumber, 'clear key no first number remain ');
        console.assert(!calculator.dataset.operator, 'clear key. no operator remains');
    }
    /* let one = document.querySelector('[data-key="1"]');
     let five = document.querySelector('[data-key="5"]');*/

    function testKeySequence(test) {
        test.keys.forEach(key => {
            document.querySelector(`[data-key="${key}"]`).click();
        })
        console.assert(display.textContent == test.value, test.message);
        clearCalculator();
        //assertion
        //1. value to assert 
        //2. test message
    }
    const tests = [{
            keys: ['1'],
            value: '1',
            message: 'click 1'
        }, {
            keys: ['1', '5'],
            value: '15',
            message: "click 15"
        }, {
            keys: ['1', 'times', '5', 'equal'],
            value: '5',
            message: "calculation with times"
        },
        {
            keys: ['1', 'plus', '5', 'equal'],
            value: '6',
            message: "calculation with plus"
        },
        {
            keys: ['5', 'divide', '0', 'equal'],
            value: 'Infinity',
            message: "calculation with divide"
        },
        {
            keys: ['5', 'minus', '1', 'equal'],
            value: '4',
            message: "calculation with minus"
        }
    ];
    tests.forEach(testKeySequence);
    //one test 
    /*one.click();
    console.assert(display.textContent == "1", "Clicked one");
    clearCalculator();
    //15 test
    one.click();
    five.click();
    console.assert(display.textContent == "15", "Clicked 1  and 5");
    clearCalculator();*/
})(window);