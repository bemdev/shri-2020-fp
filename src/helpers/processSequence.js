/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import * as R from 'ramda';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    const validateString = string => {
        const len = string.length;
        if (
            len > 10 ||
            len < 2 ||
            parseInt(string, 0) < 0 ||
            !string.match(/^[0-9]*[.,]?[0-9]+$/)
        ) {
            handleError('ValidationError');
            return false;
        } else {
            return string;
        }
    };

    if (!validateString(value)) {
        return;
    }

    const toNumberFix = value => {
        const number = parseInt(value, 0);
        writeLog(number);
        return parseInt(value, 0);
    };

    const number = toNumberFix(value);

    const fetchNumber = number => {
        return api
            .get('https://api.tech/numbers/base', {
                from: 10,
                to: 2,
                number: number,
            })
            .then(r => {
                writeLog(r.result);
                return r.result;
            });
    };

    const fetchAnimal = id => {
        return api.get(`https://animals.tech/`, { id: id }).then(r => r.result);
    };

    const getLenNumber = number => {
        const len = String(number).length;
        writeLog(len);
        return parseInt(len, 0);
    };
    const makePow = number => {
        const pow = Math.pow(number, 2);
        writeLog(pow);
        return pow;
    };
    const makeDivided = number => {
        const divide = parseInt(number / 3, 0);
        writeLog(divide);
        return divide;
    };

    const makeWork = R.pipe(
        fetchNumber,
        R.andThen(
            R.pipe(
                getLenNumber,
                makePow,
                makeDivided,
                fetchAnimal,
                R.andThen(handleSuccess),
            ),
        ),
    );

    makeWork(number);
};

export default processSequence;
