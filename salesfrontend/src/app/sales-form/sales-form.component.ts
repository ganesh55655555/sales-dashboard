import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit, OnChanges {
  @Input() existingData: any = null;
  @Input() refresh!: () => void;
  @Input() resetEdit!: () => void;

  salesForm: FormGroup;
  editId: number | null = null;
  loggedInUser: string = '';
  formattedComments: string = '';
  lastComment: string = '';

  uneditableFields = [
    { name: 'companyName', label: 'Company Name' },
    { name: 'opportunity', label: 'Opportunity' },
    { name: 'contactPersonName', label: 'Contact Person Name' },
    { name: 'designation', label: 'Designation' },
    { name: 'mobile', label: 'Mobile' },
    { name: 'email', label: 'Email' },
    { name: 'domain', label: 'Domain' }
  ];

  salesStageOptions: string[] = [
    '2) Qualification', '3) proposal', '4) Negotiation',
    '5) Closed own (Converted)', '6) Closed Lost'
  ];

  opportunityList: string[] = [
    'AWS', 'AWS - New Account', 'AWS BILL MIGRATE', 'AWS Direct to Our Billing',
    'GCP - New Account', 'GWS - New Account', 'GWS - Direct to Our Billing',
    'M365', 'M365 - New Account', 'Windows 11 pro', 'Azure', 'Cyber Security'
  ];

  constructor(private fb: FormBuilder, private service: SalesService) {
    this.salesForm = this.fb.group({
      salesName: [''],
      eventLead: [''],
      companyName: [''],
      salesStage: [''],
      opportunity: [''],
      contactPersonName: [''],
      designation: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [''],
      domain: [''],
      comments: [''],
      nextFollowUpDate: [''],
      quotationSent: [''],
      sowSent: [''],
      negotiation: [''],
      dealWon: ['']
    });
  }

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem('userName') || '';

    if (!this.existingData) {
      this.salesForm.patchValue({
        salesName: this.loggedInUser,
        quotationSent: '',
        sowSent: '',
        negotiation: '',
        salesStage: '1) Lead (Initial Requirement / Gathering)'
      });
      this.salesForm.get('salesStage')?.disable();

      const requiredFields = [
        'salesName', 'eventLead', 'companyName', 'opportunity',
        'contactPersonName', 'designation', 'mobile',
        'comments', 'nextFollowUpDate'
      ];
      requiredFields.forEach(field => {
        this.salesForm.get(field)?.setValidators(Validators.required);
        this.salesForm.get(field)?.updateValueAndValidity();
      });
    }
  }

  ngOnChanges(): void {
    if (this.existingData) {
      this.editId = this.existingData.id;
      const patch = { ...this.existingData };

      ['date', 'nextFollowUpDate'].forEach(key => {
        if (patch[key]) patch[key] = patch[key].substring(0, 10);
      });

      const { comments, ...rest } = patch;
      this.salesForm.patchValue({ ...rest, comments: '' });
      this.formattedComments = this.formatOldComments(comments || '');
      this.lastComment = this.extractLastComment(this.formattedComments);

      const editableFields = [
        'comments', 'nextFollowUpDate',
        'quotationSent', 'sowSent', 'negotiation', 'dealWon', 'salesStage'
      ];

      Object.keys(this.salesForm.controls).forEach(field => {
        const control = this.salesForm.get(field);
        if (editableFields.includes(field)) {
          control?.enable();
        } else {
          control?.disable();
        }

        if (field !== 'salesStage' && field !== 'comments') {
          control?.setValidators(Validators.required);
        } else {
          control?.clearValidators();
        }

        control?.updateValueAndValidity();
      });
    }
  }

  formatOldComments(old: string): string {
    if (!old) return '';
    const lines = old.split('\n').slice(-50);
    return lines.map(line => {
      const match = line.match(/^(.*) - (\S+) \((\d{4}-\d{2}-\d{2})\)$/);
      if (match) {
        const [, message, user, date] = match;
        return `${user} (${date}) - ${message.trim()}`;
      }
      return line;
    }).join('\n');
  }

  extractLastComment(comments: string): string {
    if (!comments) return '';
    const lines = comments.trim().split('\n');
    return lines.length > 0 ? lines[lines.length - 1] : '';
  }

  submit(): void {
    if (this.salesForm.valid) {
      const rawData = this.salesForm.getRawValue();
      const dateStr = new Date().toISOString().slice(0, 10);
      const newComment = rawData.comments?.trim();
      const formattedNewComment = newComment ? `${this.loggedInUser} (${dateStr}) - ${newComment}` : '';

      if (this.editId) {
        const old = this.formattedComments || '';
        const combined = formattedNewComment ? (old ? `${old}\n${formattedNewComment}` : formattedNewComment) : old;
        rawData.comments = combined.split('\n').slice(-50).join('\n');

        this.service.update(this.editId, rawData).subscribe(() => {
          alert('Updated successfully');
          this.reset();
          if (this.refresh) this.refresh();
        });
      } else {
        rawData.comments = formattedNewComment;
        this.service.create(rawData).subscribe(() => {
          alert('Saved successfully');
          this.salesForm.reset();
          this.salesForm.patchValue({ salesName: this.loggedInUser });
          if (this.refresh) this.refresh();
        });
      }
    } else {
      this.salesForm.markAllAsTouched();
      alert('Please fill all required fields.');
    }
  }

  reset(): void {
    this.salesForm.reset();
    this.salesForm.patchValue({
      salesName: this.loggedInUser,
      quotationSent: '',
      sowSent: '',
      negotiation: '',
      comments: ''
    });

    Object.keys(this.salesForm.controls).forEach(field => {
      this.salesForm.get(field)?.enable();
    });

    this.editId = null;
    this.existingData = null;
    this.formattedComments = '';
    this.lastComment = '';
  }
}

