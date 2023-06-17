import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/authe.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {compareValidator} from '../../common/ConfirmedValidator';
import {MatDialog} from '@angular/material/dialog';
import {NotificationRegisterComponent} from './notification-register/notification-register.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  clickSubmit = false;
  constructor(private toastr: ToastrService, private authService: AuthService,
              public dialog: MatDialog,
              private location: Location,
              private router: Router
  ) {
  }

  validationMessages = {
    fullName: [
      {type: 'required', message: 'Vui lòng nhập họ và tên.'},
      {type: 'maxlength', message: 'Họ và tên nhập tối đa 50 kí tự bao gồm khoảng trắng.'},
      {type: 'minlength', message: 'Họ và tên ít nhất 5 kí tự bao gồm khoảng trắng.'},
      {type: 'pattern', message: 'Họ và tên không hợp lệ, không được nhập số, kí tự đặc biệt.'}
    ],
    username: [
      {type: 'required', message: 'Vui lòng nhập tên tài khoản.'},
      {type: 'minlength', message: 'Tên tài khoản tối thiểu 6 kí tự.'},
      {type: 'maxlength', message: 'Tài khoản tối đa 20 kí tự.'}

    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại.'},
      {type: 'pattern', message: 'Số điện thoại không hợp lệ. (10 số)'}
    ],
    address: [
      {type: 'maxlength', message: 'Địa chỉ tối đa 150 kí tự.'},
      {type: 'pattern', message: 'Không được nhập kí tự đặc biệt. (!@#$%^&)'}
    ],
    idCard: [
      {type: 'required', message: 'Vui lòng nhập số CCCD.'},
      {type: 'pattern', message: 'CCCD không hợp lệ.'},
    ],
    password: [
      {type: 'required', message: 'Vui lòng nhập mật khẩu.'},
      {type: 'pattern', message: 'Mật khẩu không đúng định dạng.'},
   
    ],
    matchingPassword: [
      {type: 'required', message: 'Vui lòng nhập xác nhận mật khẩu.'},
      {type: 'pattern', message: 'Mật khẩu không đúng định dạng.'},
   
    ],
    birthday: [
      {type: 'required', message: 'Vui lòng nhập ngày sinh.'}
    ],
    gender: [
      {type: 'required', message: 'Vui lòng chọn giới tính.'}
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập email.'},
      {type: 'pattern', message: 'Email không đúng định dạng'},
    ]
  };

  ngOnInit(): void {
    this.register = new FormGroup({
        fullName: new FormControl(null,
          [Validators.required,
            Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
            Validators.maxLength(50), Validators.minLength(5)]),
        email: new FormControl(null,
          [Validators.required,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
        phone: new FormControl(null,
          [Validators.required,
            Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/),
          ]),
        address: new FormControl(null),
        idCard: new FormControl(null,
          [Validators.required,
            Validators.pattern(/^[0-9]{12}$/)]),  // id card 12
        gender: new FormControl(null,
          [Validators.required]),
        username: new FormControl(null,
          [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
        password: new FormControl(null,
          [Validators.required, Validators.pattern('^(?=^.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#=?^&])[A-Za-z\\d@$!=%*#^?&]{8,20}$')]),
        matchingPassword: new FormControl(null,
          [Validators.required, Validators.minLength(6), compareValidator('password')]),
        birthday: new FormControl(null, Validators.pattern('^(?=^.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#=?^&])[A-Za-z\\d@$!=%*#^?&]{8,20}$'))
      },
    );
  }


  onSubmit(register: FormGroup): any {
    this.clickSubmit = true;
    console.log(register.get('idCard').value);
    this.authService.register(register.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastr.success('Đăng kí thành công!', 'Success: ');
        this.router.navigateByUrl('/login');
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
        if (register.get('email').value != null){
          this.authService.checkEmail(register.get('email').value).subscribe(
          (data) => {
            if (data) {
              this.toastr.error('Email đã tồn tại', 'Error: ');
              stop();
        
            }
          }
        );
        }
        if (register.get('phone').value != null){
        this.authService.checkPhone(register.get('phone').value).subscribe(
          (data) => {
            if (data) {
              this.toastr.error('Số điện thoại đã tồn tại', 'Error: ');
              stop();
           
            }
          }
        );
        }
        if (register.get('idCard').value != null){
          this.authService.checkCCCD(register.get('idCard').value).subscribe(
            (data) => {
              if (data) {
                this.toastr.error('CCCD đã tồn tại', 'Error: ');
                stop();
             
              }
            }
          );
          }
        if (register.get('username').value != null){
        this.authService.checkUsername(register.get('username').value).subscribe(
          (data) => {
            if (data) {
              this.toastr.error('Tài khoản đã tồn tại', 'Error: ');
              stop();
             
            }
          }
        );
        }
      }
    );

  }

  notification(message: string) {
    const dialogRef = this.dialog.open(NotificationRegisterComponent,
      {
        data: {
          message
        },
        width: '400px'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  back() {
    this.location.back();
  }
}

