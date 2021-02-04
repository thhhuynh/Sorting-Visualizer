export function getHeapSortAnimations(array): any[] {
    let animations = [];
    if(array.length <= 1) return array;
    let auxiliaryArray = array.slice();
    heapSortHelper(array, auxiliaryArray, animations);
    return animations;
}

function heapSortHelper(array, auxiliaryArray, animations) {
    let size = array.length;

    // Build heap (rearrange array) 
    for(let i = size / 2 - 1; i >= 0; i--) {
        heapify(array, size, i, animations);
    }

    // One by one extract an element from heap
    for(let i = size - 1; i > 0; i--) {
        // Move current root to end
        animations.push([0, array[i]]);
        animations.push([i, array[0]]);
        swap(array, 0, i);

        // Call max heapify on the reduced heap
        heapify(array, i, 0, animations);
    }
}

function heapify(array, size, index, animations): void {
    // Initialize the largest as root
    let largest = index;
    
    let l = 2 * index + 1;
    let r = 2 * index + 2

    // If left child is larger than root, we make the largest being the left child
    if(l < size && array[l] > array[largest]) {
        largest = l;
    }
    // If right child is larger than the largest so far, we make the largest being the right child 
    if(r < size && array[r] > array[largest]) {
        largest = r;
    }
    // If largest is not root, we swap the largest and the root
    if(largest != index) {
        animations.push([index, array[largest]]);
        animations.push([largest, array[index]]);
        swap(array, index, largest);

        // Recursively heapify the affected sub-tree
        heapify(array, size, largest, animations);
    }
}

function swap(array, i, j): void {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}