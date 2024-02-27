import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { createAnimation, PopoverController } from "@ionic/angular";
import { ImageFullScreenComponent } from "src/app/shared/pages/popovers/imageFullScreen/imageFullScreen.component";
import { ImageGalleryPipe } from "src/app/shared/pipes/imageGallery/imageGallery.pipe";
import { ImagesGalleryService } from "src/app/shared/services/api/imagesGallery/imagesGallery.service";

const MAX_WIDTH = 200;
const MAX_HEIGHT = 110;

@Component({
  selector: "gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  gallery = [];

  constructor(
    private router: Router,
    private imagesGalleryService: ImagesGalleryService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.getGallery();
  }

  async getGallery() {
    const gallery = await this.imagesGalleryService
      .getImages()
      .then((result) => {
        return result.gallery.sort(this.compare);
      });

    if (gallery) {
      const content = document.getElementById("gallery-content");
      gallery.forEach((image) => {
        const imgGalleryPipe = new ImageGalleryPipe();
        const src = imgGalleryPipe.transform(image.id);
        const img = new Image();
        img.src = src;
        this.gallery.push(src);
        img.onerror = () => {
          URL.revokeObjectURL(img.src);
        };
        img.onload = () => {
          URL.revokeObjectURL(img.src);
          const [newWidth, newHeight] = this.calculateSize(
            img,
            MAX_WIDTH,
            MAX_HEIGHT
          );
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          canvas.style.margin = "auto";
          canvas.classList.add("img");

          const imgContainer = document.createElement("div");
          imgContainer.style.margin = "4px";
          imgContainer.style.display = "flex";
          imgContainer.style.cursor = "pointer";
          imgContainer.classList.add("image");
          imgContainer.appendChild(canvas);
          imgContainer.onclick = () => {
            this.showImage(image.id);
          };

          content.appendChild(imgContainer);
        };
      });
    }
  }

  compare(a, b) {
    if (parseInt(a.order) < parseInt(b.order)) {
      return -1;
    } else if (parseInt(a.order) > parseInt(b.order)) {
      return 1;
    }
    return 0;
  }

  calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }

  goToChat() {
    this.router.navigate(["/menu/chats"]);
  }

  async showImage(id) {
    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = createAnimation()
        .addElement(baseEl.querySelector("ion-backdrop")!)
        .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

      const wrapperAnimation = createAnimation()
        .addElement(baseEl.querySelector(".popover-wrapper")!)
        .keyframes([
          { offset: 0, opacity: "0", transform: "scale(0)" },
          { offset: 1, opacity: "0.99", transform: "scale(1)" },
        ]);

      return createAnimation()
        .addElement(baseEl)
        .easing("ease-out")
        .duration(300)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction("reverse");
    };

    const imgGalleryPipe = new ImageGalleryPipe();
    const src = imgGalleryPipe.transform(id);
    const popover = await this.popoverController.create({
      component: ImageFullScreenComponent,
      componentProps: {
        src,
      },
      animated: true,
      // enterAnimation,
      // leaveAnimation,
      cssClass: "image-popover",
      translucent: true,
    });
    return await popover.present();
  }
}
