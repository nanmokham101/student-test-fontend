import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../_services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  errorResults: any[]=[];
  res: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
  ) {
  
  }

  ngOnInit() {
    const stduentId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!stduentId) {
      alert("Invalid action.");
      this.router.navigate(['/student']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      name: ["", Validators.required],
      fatherName: ["", Validators.required],
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.required]
    });
    this.studentService.getStudentById(+stduentId).subscribe((data) => {
      this.editForm.setValue(data.result);
    });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.errorResults = [];
    this.submitted = true;
    const invalid = this.editForm.invalid;
    if (invalid) {
      return;
    }
    this.studentService.create(this.editForm.value).subscribe(
      (data) => {
        this.studentService.swal(data.message, "success");
        this.router.navigate(['/student-list']);
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

  onCancel() {
    this.router.navigate(['/student-list']);
  }
}
