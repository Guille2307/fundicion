import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { SendFileService } from "src/app/shared/services/api/sendFile/sendFile.service";

@Component({
  selector: "add-file",
  templateUrl: "./addFile.component.html",
  styleUrls: ["./addFile.component.scss"],
})
export class AddFileComponent implements OnInit {
  fileSelector;
  files = [];

  @Input() idOfferJob?;

  constructor(
    public popoverController: PopoverController,
    public sendFileService: SendFileService
  ) {}

  ngOnInit() {
    this.getFiles();
    this.setFileSelector();
  }

  addFile() {
    this.fileSelector.click();
  }

  setFileSelector() {
    this.fileSelector = document.getElementById("file-selector");
    this.fileSelector.addEventListener("change", (event) => {
      const files: any = Array.from(event.target.files);
      files.forEach((file) => {
        this.sendFileService
          .uploadFile(file, "offer", this.idOfferJob)
          .then((result) => {
            this.popoverController.dismiss();
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }

  cancelButtonClick() {
    this.popoverController.dismiss();
  }

  async getFiles() {
    this.files = await this.sendFileService
      .getFilesUser()
      .then((value) => value);
  }

  setDocName(name) {
    let finalName = "";
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }

  selectFile(file) {
    // console.log(file);
    const jobId = [];
    if (file.job_id !== null && file.job_id !== "null") {
      JSON.parse(file.job_id).forEach((id) => {
        jobId.push(id);
      });
    }
    jobId.push(this.idOfferJob);

    this.sendFileService
      .updateFile(file.id, file.type, jobId)
      .then((result) => {
        this.popoverController.dismiss();
      });
  }
}
