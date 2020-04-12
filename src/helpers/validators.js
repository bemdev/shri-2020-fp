/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import * as R from 'ramda';

//mb this dont neeed but good fo me
const objToArray = R.pipe(
    R.toPairs,
    R.map(
        R.pipe(
            R.of,
            R.fromPairs,
        ),
    ),
);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = figures => {
    const checkRule = R.allPass([
        R.propEq('circle', 'white'),
        R.propEq('triangle', 'white'),
        R.propEq('star', 'red'),
        R.propEq('square', 'green'),
    ]);

    return checkRule(figures);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = figures => {
    const isGreen = fig => R.equals(fig, 'green');
    const greenFigures = R.filter(isGreen, figures);

    return R.length(objToArray(greenFigures)) > 1;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = figures => {
    const isRed = fig => R.equals(fig, 'red');
    const isBlue = fig => R.equals(fig, 'blue');

    const redFigures = R.filter(isRed, figures);
    const blueFigures = R.filter(isBlue, figures);

    return (
        R.length(objToArray(redFigures)) === R.length(objToArray(blueFigures))
    );
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = figures => {
    const checkRule = R.allPass([
        R.propEq('circle', 'blue'),
        R.propEq('star', 'red'),
        R.propEq('square', 'orange'),
    ]);

    return checkRule(figures);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = figures => {
    let referenceColor = figures.circle;

    if (referenceColor === 'white') {
        referenceColor = figures.square;
    }

    const isValid = R.allPass([
        R.propEq('star', referenceColor),
        R.propEq('triangle', referenceColor),
        R.propEq('square', referenceColor),
        R.propEq('circle', referenceColor),
    ]);

    return isValid(figures);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = figures => {
    const isGreen = fig => R.equals(fig, 'green');
    const isRed = fig => R.equals(fig, 'red');

    const greenFigures = R.filter(isGreen, figures);
    const redFigures = R.filter(isRed, figures);

    const hasTriagle = R.has('triangle');

    if (hasTriagle(greenFigures)) {
        return (
            R.length(objToArray(redFigures)) === 1 &&
            R.length(objToArray(greenFigures)) === 2
        );
    } else {
        return false;
    }
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = figures => {
    const isOrange = fig => R.equals(fig, 'orange');
    const isAllOrange = R.filter(isOrange, figures);

    return R.length(objToArray(isAllOrange)) === 4;
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = figures => {
    const isInValidStar = R.anyPass([
        R.propEq('star', 'red'),
        R.propEq('star', 'white'),
    ]);

    return !isInValidStar(figures);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = figures => {
    const isGreen = fig => R.equals(fig, 'green');
    const isAllGreen = R.filter(isGreen, figures);

    return R.length(objToArray(isAllGreen)) === 4;
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = figures => {
    const triangleColor = R.prop('triangle');
    const referenceColor = triangleColor(figures);

    if (referenceColor !== 'white') {
        const checkRule = R.allPass([
            R.propEq('square', referenceColor),
            R.propEq('triangle', referenceColor),
        ]);
        return checkRule(figures);
    } else {
        return false;
    }
};
