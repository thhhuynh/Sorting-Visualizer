export function getQuickSortAnimations(array) {
    let animations = [];
    if(array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(mainArray, start, end, animations): void {
    if(start < end) {
        let pivot = partition(mainArray, start, end, animations);
        quickSortHelper(mainArray, start, pivot - 1, animations);
        quickSortHelper(mainArray, pivot + 1, end, animations);
    }
}

function partition(mainArray, start, end, animations) {
    let pivot = mainArray[end];
    let i = start - 1;
    
    
    for(let j = start; j <= end - 1; j++) {
        animations.push([true, end, j, 'first']);
        animations.push([true, end, j, 'second']);
        if(mainArray[j] < pivot) {
            i++;
            animations.push([false, i, mainArray[j]]);
            animations.push([false, j, mainArray[i]]);
            swap(mainArray, i, j);            
        }
    }

    animations.push([false, i + 1, mainArray[end]]);
    animations.push([false, end, mainArray[i + 1]]);
    swap(mainArray, i + 1, end);
    return i + 1;
}

function swap(mainArray, i, j) {
    let tmp = mainArray[i];
    mainArray[i] = mainArray[j];
    mainArray[j] = tmp;
}

