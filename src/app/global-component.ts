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

    // RED AREA
    getRedAllLine:'red-area/red-all-line/',
    getYellowAllLine:'red-area/yellow-all-line/',
    postTarget:'red-area/target/',
    postArea:'red-area/get-area/',
    postResultSwab:'red-area/result-swab/',
    // END RED AREA

    // GENBA
    getAllCrossGenba:'genba/get-all-finding-cross/',
    getAllSelfGenba:'genba/get-all-finding-self/',
    getAllAreaFinding:'genba/get-all-finding-area/',
    // END GENBA

    // ====================== SKB ==========================
    // DASHBOARD CALIBRATION VCC
    getEquipment:'calibration-skb/count-equipment',
    getRegis:'calibration-skb/count-regis',
    getExpired:'calibration-skb/count-expired',
    postNowKalibrasi:'calibration-skb/now-kalibrasi',
    postPlanKalibrasi:'calibration-skb/plan-kalibrasi',
    getAllEquipment:'calibration-skb/all-equipment',
    getExternal:'calibration-skb/progress-external',
    dateFilter:'calibration-skb/date-filter',
    editPlanKalibrasi:'calibration-skb/edit-plan',
    calibrationSummary: 'calibration-skb/calibraton-summary',
    getRegistTable: 'calibration-skb/regist-table',
    sertifKalibrasi: 'calibration-skb/sertif-hit',
    getAllArea: 'calibration-skb/all-area',
    filterArea: 'calibration-skb/area-filter',
    // END DASHBOARD CALIBRATION VCC

    // CAPABILITY
    // AL4
    getTypeAnalisa:'capability-skb/capability-al4-mst-type',
    jenisPengujian:'capability-skb/capability-al4-mst-jenispengujian',
    countCapability:'capability-skb/count-capability',
    dataTable:'capability-skb/data-table',
    lineCapability:'capability-skb/linechart-capability',
    // END AL4
    // END CAPABILITY

    // MICRO
    // SWAB
    getRedAllLineSkb:'micro/swab/red-all-line',
    getYellowAllLineSkb:'micro/swab/yellow-all-line',
    postTargetSkb:'micro/swab/target',
    imageSampling:'micro/swab/image-sampling',
    imageArea:'micro/swab/image-area',
    postMicroSkb:'micro/swab/get-micro',
    postAreaSkb:'micro/swab/get-area',
    postResultSwabSkb:'micro/swab/result-swab',
    // END SWAB
    
    // WATER SAMPLING
    waterSamplingAl4: 'micro/water/al4',
    getAreaSamplingNami: 'micro/water/get-area-nami',
    waterSamplingNami: 'micro/water/nami',
    waterSamplingCan: 'micro/water/can',
    waterSamplingPet: 'micro/water/pet',
    // END WATER SAMPLING
   
    // FG SAMPLING
    fgSamplingAl4: 'micro/fg/al4',
    fgSamplingNami: 'micro/fg/nami',
    fgSamplingCan: 'micro/fg/can',
    fgSamplingPet: 'micro/fg/pet',
    // END FG SAMPLING
    // END MICRO
    // ==================== END SKB ========================
   
}