import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  submitted = false;
  addForm: FormGroup;
  errorResults: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
  ) {
   
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ["", Validators.required],
      fatherName: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.errorResults = [];
    this.submitted = true;
    const invalid = this.addForm.invalid;
    if (invalid) {
      return;
    }
    this.studentService.create(this.addForm.value).subscribe(
      (data) => {
        this.studentService.swal(data.message, "success");
        this.router.navigate(['student-list']);
      },
      (error: any) => {
        if (error.status === 400) {
          for (const [key, value] of Object.entries(error.error.result)) {
            this.errorResults.push(value);
          }
        }
      }
    );
  }

  // onReset() {
  //   this.errorResults = [];
  //   this.submitted = false;
  //   this.addForm.reset();
  // }
  goStudentList(){
    this.router.navigate(['/student-list']);
  }
  onCancel() {
    this.router.navigate(['/student-list']);
  }
}
