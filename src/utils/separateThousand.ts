export const separateThousand = (n: number | string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
