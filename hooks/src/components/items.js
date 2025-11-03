export const intialItems = new Array(29999999).fill(0).map((_, index) => {
    return {
        id: index,
        isSelected: index === 29999998,
    }
})