
export const mergeSort = array => {
    const animations =[];
    if (array.length <= 1) return array;
    const tempArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, tempArray, animations);
    return animations;
}

function mergeSortHelper(main, start, end, tempArray, animations,) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(tempArray, start, mid, main, animations);
    mergeSortHelper(tempArray, mid + 1, end, main, animations);
    merge(main, start, mid, end, tempArray, animations);
}

function merge(main, start, mid, end, tempArray, animations) {
    let k = start, i = start, j = mid + 1;
    while (i <= mid && j <= end) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (tempArray[i] <= tempArray[j]) { 
            animations.push([k, tempArray[i]]);
            main[k++] = tempArray[i++];  
        } else {
            animations.push([k, tempArray[j]]);
            main[k++] = tempArray[j++];
        }
    }
    while (i <= mid) {
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k, tempArray[i]]);
        main[k++] = tempArray[i++];
    }
    while (j <= end) {
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k,tempArray[j]]);
        main[k++] = tempArray[j++];
    }
    
}
