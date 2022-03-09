import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/common/alert/alert.service';
import { DepartmentUserService } from './department-user.service';
import { FileInfo } from './model/file-info';

@Component({
	selector: 'app-department-user',
	templateUrl: './department-user.component.html',
	styleUrls: ['./department-user.component.css']
})
export class DepartmentUserComponent implements OnInit {

	uploadForm: FormGroup = new FormGroup({})
	fileInfoList: Array<FileInfo> = []
	constructor(private departmentUserService: DepartmentUserService,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit(): void {
		this.uploadForm = this.formBuilder.group({
			file: ['']
		});
	}
	selectFile(value: any) {
		var fd = new FormData();
		fd.append('file', value);
		this.departmentUserService.uploadVehiclesData(fd).subscribe(
			(data: any) => { console.log(data) },
			(err: any) => { console.log(err), this.alertService.error(err.message) })
	}
	onFileSelect(event: any) {

		if (event.target.files.length >= 0) {
			const file = event.target.files[0];
			this.uploadForm.get('file')!.setValue(file);
		}
		console.log(this.uploadForm.get('file'))
	}
	onSubmit() {
		const formData = new FormData();
		let file = this.uploadForm.get('file')!;
		formData.append('file', file.value);

		this.departmentUserService.uploadVehiclesData(formData).subscribe(
			(data: any) => {
				console.log(data),
					this.alertService.success("Successfully Updated")
			},
			(err: any) => {
				console.log(err),
				this.alertService.success("successfully Uploaded")
			})
	}

	viewUploadedFiles() {
		console.log("Called")
		this.departmentUserService.viewUploadedFiles().subscribe(
			(data: any) => { this.fileInfoList = data, console.log(data) },
			(err: any) => { this.alertService.error(err.message) }
		)
	}

	viewFileByUrl(url: any) {
		let data = this.departmentUserService.viewFileByName(url).subscribe(
			(data: any) => {
				console.log(data);
				const file = new Blob([data], { type: 'text/csv' });
				const link = document.createElement("a");
				link.href = URL.createObjectURL(file)
				link.download = "file1"
				link.click()
				link.remove()
			},
			(err:any) => {
				const file = new Blob([err.error.text], { type: 'text/csv' });
				const link = document.createElement("a");
				link.href = URL.createObjectURL(file)
				link.download = "file1"
				link.click()
				link.remove()
			}
		)
		console.log(data)
	}

}
