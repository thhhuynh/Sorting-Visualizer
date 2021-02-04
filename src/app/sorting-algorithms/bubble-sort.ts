export function getBubbleSortAnimations(array): any[] {
    let animations = [];
    if(array.length <= 1) return array;
    let auxiliaryArray = array.slice();
    bubbleSortHelper(array, auxiliaryArray, animations);
    return animations;
}

function bubbleSortHelper(array, auxiliaryArray, animations) {
    let size = array.length;
    for(let i = 0; i < size - 1; i++) {
        for(let j = 0; j < size - i - 1; j++) {
            if(array[j] > array[j + 1]) {
                // swap array[j] and array[j+1]
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                swap(array, j, j + 1);
            }
        }
    }
}

function swap(array, i, j): void {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}