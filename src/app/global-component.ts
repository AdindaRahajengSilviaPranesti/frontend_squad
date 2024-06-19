export const GlobalComponent = {
    // Api Calling
    API_URL : 'http://192.168.9.47:3316/auth/login',
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"https://api-node.themesbrand.website/auth/",

    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',

    getRedAllLine:'red-area/red-all-line/',
    getYellowAllLine:'red-area/yellow-all-line/',
    postTarget:'red-area/target/',
    postArea:'red-area/get-area/',
    postResultSwab:'red-area/result-swab/',
   
}