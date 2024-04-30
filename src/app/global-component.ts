export const GlobalComponent = {
    // Api Calling
    API_URL : 'http://localhost:3116/auth/login',
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

    // VCC
    getEquipment:'calibration/count-equipment',

    // Capability
    getTypeAnalisa:'capability/capability-al4-mst-type',
    jenisPengujian:'capability/capability-al4-mst-jenispengujian',
    countCapability:'capability/count-capability',
    dataTable:'capability/data-table'
   
}