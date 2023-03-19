import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiResponse } from '../model/api.response';
import { Student } from '../model/student.model';
const AUTH_API = 'http://localhost:8080/student/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  login(user:any): Observable<any> {
    return this.http.post(
      AUTH_API,
      user,
      httpOptions
    );
  }
  swal(text  :any , icon : any){
    Swal.fire({
      text : text,
      icon : icon
    });
  }
  getList(formValue: any): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.append("name", formValue.model ? formValue.name : "");
    params = params.append("fatherName", formValue.brand ? formValue.fatherName : "");
    params = params.append("address", formValue.status ? formValue.address : "");
    params = params.append("email", formValue.status ? formValue.email : "");
    return this.http.get<ApiResponse>(AUTH_API + 'list', {
      params: params,
    });
  }
  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(AUTH_API + id);
  }

  getStudentById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(AUTH_API + id);
  }

  create(student: Student): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(AUTH_API + 'save', student);
  }

 
  }
