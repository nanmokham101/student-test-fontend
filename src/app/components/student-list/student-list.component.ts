import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  students:Student[]=[];
  searchForm: FormGroup;
  submitted: boolean;
  page = 0;
  pageSize =10;
  collectionSize = 0;

  searchTerm = "";
  constructor(
    private router:Router,
    private studentService:StudentService,
    private formBuilder: FormBuilder
    
  ) { }
  ngOnInit(): void {
  
    this.load();
    
  }
  load() {
    this.searchForm = this.formBuilder.group({
      name: "",
      fatherName: "",
      address: "",
      email: "",
    });
    this.searchForm.valueChanges.subscribe((val) => {
      console.log(val);
    });
    this.onSubmit();
  }



  onSubmit() {
    this.submitted = true;
    this.studentService.getList(this.searchForm.value).subscribe((data) => {
      this.students = data.result;
    });
  }

  add() {
    this.router.navigate(["/add-student"]);
  }

  delete(student: Student): void {
    this.studentService.delete(student.id).subscribe((data) => {
      this.students = this.students.filter((u) => u !== student);
      this.studentService.swal(data.message, "warning");
    });
  }

  edit(student: Student): void {
    this.router.navigate(["/edit-student", { id: student.id }]);
  }
}