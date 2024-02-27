import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "imageGallery",
})
export class ImageGalleryPipe implements PipeTransform {
  folderName = "woutickshow";

  transform(value: string): string {
    return value
      ? "https://congress-wtk.s3-eu-west-1.amazonaws.com/gallery/" +
          this.folderName +
          "/" +
          value +
          ".jpg"
      : "";
  }
}
