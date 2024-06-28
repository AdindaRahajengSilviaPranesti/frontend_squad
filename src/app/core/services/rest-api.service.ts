import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` })
};
//

@Injectable({
  providedIn: 'root'
})
export class restApiService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRedAllLine(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getRedAllLine)
  }
  
  getYellowAllLine(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getYellowAllLine)
  }
  
  postTarget(year:any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.postTarget, year)
  }
  
  postArea(line:any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.postArea, line)
  }
  
  postResultSwab(form:any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.postResultSwab, form)
  }


  // GENBA 
  getAllCrossGenba(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getAllCrossGenba)
  }
  
  getAllSelfGenba(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getAllSelfGenba)
  }
  
  getAllAreaFinding(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getAllAreaFinding)
  }
  // END GENBA

  // ====================== SKB ==========================
  // DASHBOARD CALIBRATION VCC
  getEquipment(): Observable<any> {
    return this.http.get(this.apiUrl+GlobalComponent.getEquipment)
  }

  getRegis(): Observable<any> {
    return this.http.get(this.apiUrl+GlobalComponent.getRegis)
  }

  getExpired(): Observable<any> {
    return this.http.get(this.apiUrl+GlobalComponent.getExpired)
  }

  postNowKalibrasi(date: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.postNowKalibrasi, date);
  }

  postPlanKalibrasi(date: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.postPlanKalibrasi, date);
  }

  getAllEquipment(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getAllEquipment)
  }

  getExternal(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getExternal)
  }

  dateFilter(date: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.dateFilter, date);
  }

  editPlanKalibrasi(date: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.editPlanKalibrasi, date);
  }

  calibrationSummary(date: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.calibrationSummary, date);
  }

  getRegistTable(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getRegistTable)
  }

  sertifKalibrasi(id_hit: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.sertifKalibrasi, id_hit);
  }
    
  getAllArea(): Observable<any> {
    return this.http.get(this.apiUrl + GlobalComponent.getAllArea)
  }

  filterArea(area: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.filterArea, area);
  }

  // END DASHBOARD CALIBRATION VCC





  getMaterial(): Observable<any> {
    return this.http.get(this.apiUrl+'radarvisual/')
  }

  getMaterialByDate(startDate:any, endDate:any): Observable<any> {
    return this.http.post(this.apiUrl+'radarvisual/', {startDate: startDate, endDate: endDate})
  }

  getType(): Observable<any> {
    return this.http.get(this.apiUrl+'radarvisual/getType')
  }

  getSupplier(id:any): Observable<any> {
    return this.http.get(this.apiUrl+'radarvisual/getSupplier/'+id)
  }

  getParameter(typeid:any, id:any): Observable<any> {
    return this.http.get(this.apiUrl+'radarvisual/getParameter/'+typeid+'/'+id)
  }

  getAbnormal(): Observable<any> {
    return this.http.get(this.apiUrl+`capa-tracker/getAbnormal`)
  }
  getAbnormalByPlan(plan: any): Observable<any> {
    return this.http.get(this.apiUrl+`capa-tracker/getAbnormal/`+plan)
  }

  // table_pending(): Observable<any> {
  //   return this.http.get(this.apiUrl+`calibration/table-pending/`)
  // }

  getArrival(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getArrival`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getAbnormality(startDate: any, endDate: any, name_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getAbnormality`, {startDate:startDate, endDate:endDate, name_vendor:name_vendor})
  }

  getRateabnormal(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getRateabnormal`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getFeedback(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getFeedback`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getEffectiveness(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getEffectiveness`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getDowntime(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getDowntime`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getCuscomplain(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getCuscomplain`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getIssue(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getIssue`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  getHistorical(startDate: any, name_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getHistorical`, {startDate:startDate, name_vendor:name_vendor})
  }


  getClosing(startDate: any, endDate: any, kode_vendor: any): Observable<any> {
    return this.http.post(this.apiUrl+`capa-tracker/getClosing`, {startDate:startDate, endDate:endDate, kode_vendor:kode_vendor})
  }

  //inprocessmonitoring

  getFsb(startDate: any, endDate: any, parameter:any): Observable<any> {
    return this.http.post(this.apiUrl+`inprocess-fsb/getFsb`, {startDate:startDate, endDate:endDate, parameter:parameter})
  }


  // getDataAnalysis(parameter:any, ): Observable<any> {
  //   return this.http.post(this.apiUrl+'radarvisual/getDataAnalysis/',)
  // }

  getDataAnalysisByDate(group_id:any, jenis:any, id:any, parameterData:any, startDate:any, endDate:any): Observable<any> {
    return this.http.post(this.apiUrl+'radarvisual/getDataAnalysisByDate', {group_id:group_id, jenis: jenis, id: id, parameterData: parameterData,startDate: startDate, endDate: endDate})
  }

  getDataChart(group_id:any, jenis:any, id:any, parameterData:any,startDate:any, endDate:any): Observable<any> {
    return this.http.post(this.apiUrl+'radarvisual/getDataChart/', {group_id:group_id, jenis: jenis, id: id, parameterData: parameterData,startDate: startDate, endDate: endDate})
  }
  

  
  //masuk ke microbiologi
    getYearoc(): Observable<any> {
      return this.http.get(this.apiUrl+'finishGood/getYearoc')
    }

  getParameterfg(): Observable<any> {
    return this.http.get(this.apiUrl+'finishGood/getParameter')
  }

  getProduct(kode_product:any, lotno:any): Observable<any> {
    return this.http.get(this.apiUrl+'finishGood/getProduct/'+kode_product+'/'+lotno)
  }

  getParameteroc(): Observable<any> {
    return this.http.get(this.apiUrl+'finishGood/getParameteroc')
  }

  getProductoc(product:any, lotno:any): Observable<any> {
    return this.http.get(this.apiUrl+'finishGood/getProductoc/'+product+'/'+lotno)
  }

  getTypeParameter(kode_product:any, lotno:any): Observable<any> {
    return this.http.post(this.apiUrl+'finishGood/getTypeParameter/', {kode_product:kode_product, lotno:lotno})
  }
  getPanalysisfsb(): Observable<any> {
    return this.http.get(this.apiUrl+'finishGood/getPanalysisfsb')
  }

  getTypeParameterOc(body:any): Observable<any> {
    return this.http.post(this.apiUrl+'finishGood/getTypeParameterOc', body)
  }

  getTypeParameterOcWater(body:any): Observable<any> {
    return this.http.post(this.apiUrl+'finishGood/getTypeParameterOcWater', body)
  }

  getProwaitingoc(): Observable<any> {
    return this.http.get(this.apiUrl+'finishGood/getProwaitingoc')
  }


  // CHART ATAS SENDIRI FINISH GOOD --> OC
  getChart(tgl_prod:any): Observable<any> {
    return this.http.post(this.apiUrl+'finishGood/getChart', {tgl_prod:tgl_prod})
  }

  // CHART ATAS SENDIRI FINISH GOOD --> FSB
  getChartFsb(start_date:any): Observable<any> {
    return this.http.post(this.apiUrl+'finishGood/getChartFsb', {start_date:start_date})
  }

  /**
  * Product Rest Api
  */
  // Get
  getData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.product, {headers: headerToken, responseType: 'text' });
  }

  // Delete 
  deleteData(id:any): Observable<any> {
    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.productDelete + id, { responseType: 'text' });
  }

  /**
  * Order Rest Api
  */
  // Get
  getOrderData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.order, {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postOrderData(employee: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.order,JSON.stringify(employee), httpOptions);
  }

  // Single
  getSingleOrderData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.orderId+id, {  headers: headerToken, responseType: 'text' });
  }

  //Order Patch
  patchOrderData(employee: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.orderId+employee.ids, JSON.stringify(employee), httpOptions);
  }

  // Order Delete
  deleteOrder(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.orderId + id, {  headers: headerToken, responseType: 'text' });
  }

  
  /**
  * Customers Rest Api
  */
  // Get
  getCustomerData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.customer, {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postCustomerData(customers: any): Observable<any> {        
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.customer,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleCustomerData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/customer/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchCustomerData(customers: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/customer/' + customers.ids, JSON.stringify(customers), httpOptions);
  }

  // Delete
  deleteCustomer(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/customer/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
   * Task List Rest Api
   */
  // Get
  getTaskData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/task', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postTaskData(task: any): Observable<any> {        
    return this.http.post(GlobalComponent.API_URL + 'apps/task',JSON.stringify(task), httpOptions);
  }

  // Single
  getSingleTaskData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/task/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchTaskData(tasks: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/task/' + tasks.ids, JSON.stringify(tasks), httpOptions);
  }

  // Delete
  deleteTask(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/task/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
   * CRM Contect Rest Api
   */
  // Get
  getContactData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/contact', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postContactData(contact: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/contact',JSON.stringify(contact), httpOptions);
  }

  // Single
  getSingleContactData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/contact/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchContactData(contacts: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/contact/' + contacts.ids, JSON.stringify(contacts), httpOptions);
  }

   // Delete
   deleteContact(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/contact/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
   * CRM Company Rest Api
   */
  // Get
  getCompanyData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/company', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postCompanyData(company: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/company',JSON.stringify(company), httpOptions);
  }

  // Single
  getSingleCompanyData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/company/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchCompanyData(company: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/company/' + company.ids, JSON.stringify(company), httpOptions);
  }

  // Delete
  deleteCompany(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/company/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /* CRM Company Rest Api
  */
  // Get
  getLeadData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/lead', {  headers: headerToken, responseType: 'text' });
  }

   // POST
   postLeadData(company: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/lead',JSON.stringify(company), httpOptions);
  }

  // Single
  getSingLeadData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/lead/' + id, {  headers: headerToken, responseType: 'text' });
  }

  // Patch
  patchLeadData(company: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/lead/' + company.ids, JSON.stringify(company), httpOptions);
  }

  // Delete
  deletelead(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/lead/' + id, {  headers: headerToken, responseType: 'text' });
  }


  /* Support Ticket Rest Api
  */
  // Get
  getTicketData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/ticket', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postTicketData(ticket: any): Observable<any> {            
    return this.http.post(GlobalComponent.API_URL + 'apps/ticket',JSON.stringify(ticket), httpOptions);
  }

  // Single
  getSingTicketData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/ticket/' + id, {  headers: headerToken, responseType: 'text' });
  }

   // Patch
   patchTicketData(ticket: any): Observable<any> {    
    return this.http.patch(GlobalComponent.API_URL + 'apps/ticket/' + ticket.ids, JSON.stringify(ticket), httpOptions);
  }

  // Delete
  deleteTicket(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/ticket/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
  * Support Ticket Rest Api
  */
  // Get
  getInvoiceData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/invoice', {  headers: headerToken, responseType: 'text' });
  }

   // Delete
   deleteInvoice(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.delete(GlobalComponent.API_URL + 'apps/invoice/' + id, {  headers: headerToken, responseType: 'text' });
  }

  /**
  * Todo Rest Api
  */
  // Get
  getTodoData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/todo/', {  headers: headerToken, responseType: 'text' });
  }

  // POST
  postTodoData(employee: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + 'apps/todo/',JSON.stringify(employee), httpOptions);
  }

  // Single
  getSingleTodoData(id:any): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/todo/'+id, {  headers: headerToken, responseType: 'text' });
  }

  //Patch
  patchTodoData(employee: any): Observable<any> {   
    return this.http.patch(GlobalComponent.API_URL + 'apps/todo/'+employee.ids, JSON.stringify(employee), httpOptions);
  }

  /**
  * Calender Rest Api
  */
  // Get
  getCalendarData(): Observable<any> {
    var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
    return this.http.get(GlobalComponent.API_URL + 'apps/calendar/', {  headers: headerToken, responseType: 'text' });
  }
  
}
