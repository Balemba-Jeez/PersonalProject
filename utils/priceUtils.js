export const formatPrice = (val, suffix) =>
    parseFloat(val.toFixed(1)).toString().replace(/\.0$/, "") + suffix;