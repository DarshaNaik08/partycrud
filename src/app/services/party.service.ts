import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  headers: any;
  baseUrl: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseUrl
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Retrieve the token from AuthService
   
    if (!token) {
      console.error('No token available');
    }
    return new HttpHeaders({
      Authorization: `Token ${token}`
    });
  }

  getAllParties() {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/party/`, { headers });
  }

  getSingleParty(party_id: any) {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.baseUrl + '/party/?id=' + party_id, { headers });
  }

  postParty(id: any, formValue: any) {
    const headers = this.getAuthHeaders();

    var formData: any = new FormData();
    formData.append('id', id);
    formData.append('name', formValue.name);
    formData.append('company_name', formValue.company_name);
    formData.append('mobile_no', formValue.mobile_no);
    formData.append('telephone_no', formValue.telephone_no);
    formData.append('whatsapp_no', formValue.whatsapp_no);
    formData.append('email', formValue.email);
    formData.append('remark', formValue.remark);
    formData.append('date_of_birth', formValue.date_of_birth);
    formData.append('anniversary_date', formValue.anniversary_date);
    formData.append('gstin', formValue.gstin);
    formData.append('pan_no', formValue.pan_no);
    formData.append('credit_limit', formValue.credit_limit);
    formData.append('address', JSON.stringify(formValue.address));
    formData.append('bank', JSON.stringify(formValue.bank));
    return this.http.post<any>(this.baseUrl + '/party/', formData, { headers });
  }

  deleteParty(party_id: any) {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(this.baseUrl + '/party/?id=' + party_id, { headers });
  }

  updateParty(party_id: any, formValue: any) {
    const headers = this.getAuthHeaders();

    var formData: any = new FormData();
 
    formData.append('name', formValue.name);
    formData.append('company_name', formValue.company_name);
    formData.append('mobile_no', formValue.mobile_no);
    formData.append('telephone_no', formValue.telephone_no);
    formData.append('whatsapp_no', formValue.whatsapp_no);
    formData.append('email', formValue.email);
    formData.append('remark', formValue.remark);
    formData.append('date_of_birth', formValue.date_of_birth);
    formData.append('anniversary_date', formValue.anniversary_date);
    formData.append('gstin', formValue.gstin);
    formData.append('pan_no', formValue.pan_no);
    formData.append('credit_limit', formValue.credit_limit);
    formData.append('address', JSON.stringify(formValue.address));
    formData.append('bank', JSON.stringify(formValue.bank));
    return this.http.post<any>(this.baseUrl + '/party/?id=' + party_id, formData, { headers });
  }
  
  logout() {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/logout/`, {}, { headers }).pipe(
      tap({
        next: () => {
          this.authService.clearToken(); // Clear the token after successful logout
        },
        error: (error) => {
          console.error('Logout failed', error);
        }
      })
    );
  }
}
