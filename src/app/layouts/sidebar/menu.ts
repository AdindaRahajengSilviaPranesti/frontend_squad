import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MAIN MENU',
    isTitle: true
  },


  // FLOW RELEASE MENU -----------------------------------------------------------------------------------
  {
    id: 100,
    label: 'Flow Release',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 101,
        label: 'Flow Release OC1',
        link: '/flow-release-oc1',
        parentId: 100
      },
      {
        id: 102,
        label: 'Flow Release OC2',
        link: '/flow-release-oc2',
        parentId: 100
      },
      {
        id: 103,
        label: 'Flow Release FSB',
        link: '/flow-release-fsb',
        parentId: 100
      },
      {
        id: 104,
        label: 'Grafik Flow Release',
        link: '/grafik-release',
        parentId: 100
      },
    ]
  },

  // INPEKSI MENU -----------------------------------------------------------------------------------
  {
    id: 110,
    label: 'Inpeksi',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 111,
        label: 'OCI1',
        link: '/rejection-oci1',
        parentId: 110
      },
      {
        id: 112,
        label: 'OCI2',
        link: '/rejection-oci2',
        parentId: 110
      },
      {
        id: 113,
        label: 'FSB',
        link: '/rejection-fsb',
        parentId: 110
      },
    ]
  },

  // CALIBRATION MENU -----------------------------------------------------------------------------------
  {
    id: 120,
    label: 'Calibration',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 500,
        label: 'Dashboard Calibration',
        link: '/dashboard-calibration',
        parentId: 120
      },
      {
        id: 121,
        label: 'Pending Task Calibration',
        link: '/pending-task-calibration',
        parentId: 120
      },
      {
        id: 122,
        label: 'Report Calibration',
        link: '/report-calibration',
        parentId: 120
      },
      {
        id: 123,
        label: 'Result Calibration',
        link: '/result-calibration',
        parentId: 120
      },
    ]
  },

  //DATA ANALISI BPD MENU
  {
    id: 124,
    label: 'Data Analisis BPD',
    icon: 'ri-apps-2-line',
    link: '/data-analisis-bpd',
    parentId: 8
  },
  
  {
    id: 501,
    label: 'Line Aseptic SKB',
    icon: 'ri-apps-2-line',
    link: 'capability/al4',
    parentId: 8
  },
// 


// RMPM
{
  id: 3,
  label: 'MIKRO IPC-FSB',
  isTitle: true
},
{
  id: 350,
  label: 'Red Area Monitoring',
  icon: 'ri-apps-2-line',
  link: '/red-area-monitoring',
  parentId: 13
},
{
  id: 351,
  label: 'Mikro Monitoring Finish Good',
  icon: 'ri-apps-2-line',
  link: '/mikro-finishgood',
  parentId: 14
},
{
  id: 352,
  label: 'In Process Control Monitoring',
  icon: 'ri-apps-2-line',
  link: '/inprocess-control',
  parentId: 15
},

// RMPM
{
  id: 3,
  label: 'RMPM',
  isTitle: true
},
{
  id: 350,
  label: 'Capa Tracker Visual',
  icon: 'ri-apps-2-line',
  link: '/capa-tracker-visual',
  parentId: 13
},
{
  id: 351,
  label: 'Radar Visual',
  icon: 'ri-apps-2-line',
  link: '/radar-visual',
  parentId: 14
},

//QA COMPLIENCE
  {
    id: 2,
    label: 'QA COMPLIANCE',
    isTitle: true
  },

  {
    id: 200,
    label: 'Genba Dashboard',
    icon: 'ri-home-4-line',
    link: '/genba',
    parentId: 9
  },
  {
    id: 300,
    label: 'Inpection Overview',
    icon: 'ri-apps-2-line',
    link: '/inpection-overview',
    parentId: 10
  },
  {
    id: 400,
    label: 'Market Visit Overview',
    icon: 'ri-apps-2-line',
    link: '/market-visit-overview',
    parentId: 11
  },
  {
    id: 500,
    label: 'Release Overview',
    icon: 'ri-apps-2-line',
    link: '/release-overview',
    parentId: 12
  },



// IPC PS
{
  id: 4,
  label: 'IPC PS SECTION',
  isTitle: true
},
{
  id: 450,
  label: 'Genba Overview',
  icon: 'ri-apps-2-line',
  link: '/genba-overview',
  parentId: 15
},
{
  id: 451,
  label: 'Reagen Stock',
  icon: 'ri-apps-2-line',
  link: '/reagen-stock',
  parentId: 16
},
{
  id: 452,
  label: 'Process Monitoring',
  icon: 'ri-apps-2-line',
  link: '/process-monitoring',
  parentId: 17
},
{
  id: 450,
  label: 'Cleaning & Sanitation',
  icon: 'ri-apps-2-line',
  link: '/cleaning-sanitation',
  parentId: 14
},







];
