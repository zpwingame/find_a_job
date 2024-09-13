//todo

function findMedianSortedArrays(nums1, nums2) {
    // Merge the two sorted arrays
    const merged = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            merged.push(nums1[i]);
            i++;
        } else {
            merged.push(nums2[j]);
            j++;
        }
    }
    
    // Add remaining elements from nums1, if any
    while (i < nums1.length) {
        merged.push(nums1[i]);
        i++;
    }
    
    // Add remaining elements from nums2, if any
    while (j < nums2.length) {
        merged.push(nums2[j]);
        j++;
    }
    
    const totalLength = merged.length;
    
    // If the total length is odd, return the middle element
    if (totalLength % 2 !== 0) {
        return merged[Math.floor(totalLength / 2)];
    }
    
    // If the total length is even, return the average of the two middle elements
    const middle1 = merged[totalLength / 2 - 1];
    const middle2 = merged[totalLength / 2];
    return (middle1 + middle2) / 2;
}