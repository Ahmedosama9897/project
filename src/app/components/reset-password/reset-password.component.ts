import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  isLoading = false;
  mgerror: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  // التأكد من تطابق الباسورد
  passwordsMatch(group: FormGroup): null | object {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // إرسال OTP
  sendOtp() {
    this.isLoading = true;
    this.mgerror = null;
    this.successMessage = null;

    const email = this.resetForm.get('email')?.value;

    this.authService.sendOTP({ email }).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'OTP sent to your email';
        this.isLoading = false;
      },
      error: (err) => {
        this.mgerror = err.error?.message || 'Something went wrong';
        this.isLoading = false;
      }
    });
  }

  // تأكيد OTP وتحديث كلمة السر
  onSubmit(): void {
    if (this.resetForm.invalid) return;

    this.isLoading = true;
    this.mgerror = null;
    this.successMessage = null;

    const { email, otp, newPassword } = this.resetForm.value;

    const body = {
      email,
      otp,
      newPassword
    };

    this.authService.verifyOtpAndResetPassword(body).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Password reset successful';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.mgerror = err.error?.message || 'Invalid or expired OTP';
        this.isLoading = false;
      }
    });
  }
}
