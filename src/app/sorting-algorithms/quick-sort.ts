export function getQuickSortAnimations(array) {
    let animations = [];
    if(array.length <= 1) return array;
    let auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function quickSortHelper(mainArray, start, end, auxiliaryArray, animations): void {
    if(start < end) {
        let pivot = partition(mainArray, start, end, auxiliaryArray, animations);
        quickSortHelper(mainArray, start, pivot - 1, auxiliaryArray, animations);
        quickSortHelper(mainArray, pivot + 1, end, auxiliaryArray, animations);
    }
}

function partition(mainArray, start, end, auxiliaryArray, animations) {
    let k = start;
    let pivot = mainArray[end];
    let i = start - 1;
    
    for(let j = start; j <= end - 1; j++) {
        // animations.push([j, end, true, 'first']);
        // animations.push([j, end, true, 'second']);
        if(mainArray[j] < pivot) {
            i++;
            animations.push([i, mainArray[j]]);
            animations.push([j, mainArray[i]]);
            swap(mainArray, i, j);            
        }
    }
    // animations.push([i+1, end, true, 'first']);
    // animations.push([i+1, end, true, 'second']);
    animations.push([i+1, mainArray[end]]);
    animations.push([end, mainArray[i+1]]);
    swap(mainArray, i + 1, end);
    return i + 1;
}

function swap(mainArray, i, j) {
    let tmp = mainArray[i];
    mainArray[i] = mainArray[j];
    mainArray[j] = tmp;
}

