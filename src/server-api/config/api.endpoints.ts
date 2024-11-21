
export const apiEndpoints = {
    login: '/wp-json/jwt-auth/v1/token',

    products: {
        productLists: '/wp-json/wc/v3/products',
        productDetails: (slug: string, sku?: string) => `/wp-json/wc/v3/products/${slug}${sku ? `/${sku}` : ``}`,
        addToCart: `/wp-json/wc/store/cart/add-item`,
        productImage: (imageId : string) => `https://tomsher.co/LUX/wp-json/wp/v2/media/${imageId}`
    },

    menu: '/wp-json/menus/v1/menus/primary-menu',

    register: '/wp-json/wc/v3/customers',

}


