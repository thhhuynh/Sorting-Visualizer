export function getHeapSortAnimations(array): any[] {
    let animations = [];
    if(array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
}

function heapSortHelper(array, animations) {
    let size = array.length;

    // Build heap (rearrange array) 
    for(let i = size / 2 - 1; i >= 0; i--) {
        heapify(array, size, i, animations);
    }

    // One by one extract an element from heap
    for(let i = size - 1; i > 0; i--) {
        // Move current root to end
        animations.push([false, 0, array[i]]);
        animations.push([false, i, array[0]]);
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
    if(l < size) {
        animations.push([true, l, largest, 'first']);
        animations.push([true, l, largest, 'second']);
        if(array[l] > array[largest]) {
            largest = l;
        }
    }
    
    // If right child is larger than the largest so far, we make the largest being the right child 
    if(r < size) {
        animations.push([true, r, largest, 'first']);
        animations.push([true, r, largest, 'second']);
        if(array[r] > array[largest]) {
            largest = r;
        }
    }
    
    // If largest is not root, we swap the largest and the root 
    animations.push([true, index, largest, 'first']);
    animations.push([true, index, largest, 'second']);
    if(largest != index) {
        animations.push([false, index, array[largest]]);
        animations.push([false, largest, array[index]]);
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