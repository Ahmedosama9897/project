import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AddressService } from '../../core/services/address.service';
import { Datum, IAddress } from '../../core/interfaces/igetaddress';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {
  userId: string = '';
  addresses: Datum[] = [];
  isLoading: boolean = true;

  showAddModal: boolean = false;
  addressForm!: FormGroup;

  constructor(private addressService: AddressService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userID');

    if (!storedUserId) {
      console.warn('[AddressComponent] No user ID found in localStorage.');
      this.isLoading = false;
      return;
    }

    this.userId = storedUserId;
    this.fetchUserAddresses();
    this.initForm();
  }

  private initForm(): void {
    this.addressForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      Country: ['', Validators.required],
      State: [''],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Building: [''],
      Floor: [''],
      Apartment: [''],
      PostalCode: ['', Validators.required],
      ShippingMethod: ['Standard']
    });
  }

  private fetchUserAddresses(): void {
    this.addressService.getAddressProfile(this.userId).subscribe({
      next: (res: IAddress) => {
        this.addresses = res.data ?? [];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading addresses', err);
        this.isLoading = false;
      }
    });
  }

  onAddAddress(): void {
    this.showAddModal = true;
  }

  submitAddress(): void {
    if (this.addressForm.invalid || !this.userId) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.addressService.addAddress(this.userId, this.addressForm.value, headers).subscribe({
      next: () => {
        this.fetchUserAddresses();
        this.showAddModal = false;
        this.addressForm.reset();
      },
      error: (err: any) => console.error('Error adding address', err)
    });
  }

  cancelAdd(): void {
    this.showAddModal = false;
    this.addressForm.reset();
  }
}
