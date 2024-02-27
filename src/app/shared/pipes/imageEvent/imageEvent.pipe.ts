import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "imageEvent",
})
export class imageEventPipe implements PipeTransform {
  transform(value: string): string {
    let name = "fundicion";
    switch (value) {
      case "logo":
        return (
          "https://congress-wtk.s3-eu-west-1.amazonaws.com/logos/" +
          name +
          ".png"
        );
      case "background":
        return (
          'url("https://congress-wtk.s3-eu-west-1.amazonaws.com/backgrounds/' +
          name +
          '.webp")'
        );
      case "favicon":
        return (
          "https://congress-wtk.s3-eu-west-1.amazonaws.com/favicons/" +
          name +
          ".png"
        );
      case "plano":
        return (
          "https://congress-wtk.s3-eu-west-1.amazonaws.com/planos/" +
          name +
          ".webp"
        );
      case "program":
        return (
          "https://congress-wtk.s3-eu-west-1.amazonaws.com/program/" +
          name +
          ".webp"
        );
      case "program-pdf":
        return (
          "https://congress-wtk.s3-eu-west-1.amazonaws.com/program/" +
          name +
          ".pdf"
        );
    }
  }
}
