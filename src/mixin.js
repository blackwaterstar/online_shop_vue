export const mixin = {
    methods: {
        subProductPcount(id) {
            this.products.forEach((product) => {
                if (product.id === id) {
                    if (product.pcount > 1) {
                        product.pcount--;
                    }
                }
            });
        },
        addProductPcount(id) {
            this.products.forEach((product) => {
                if (product.id === id) {
                    product.pcount++;
                }
            });
        },
    }
}