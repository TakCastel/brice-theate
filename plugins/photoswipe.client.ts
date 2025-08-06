import PhotoSwipe from "photoswipe";
import "photoswipe/style.css";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      openPhotoSwipe: (items: any[], index: number = 0) => {
        const gallery = new PhotoSwipe({
          dataSource: items,
          index: index,
          showHideAnimationType: "fade",
          showAnimationDuration: 300,
          hideAnimationDuration: 300,
          paddingFn: () => ({ top: 50, bottom: 50, left: 50, right: 50 }),
        });

        gallery.init();
        gallery.on("uiRegister", function () {
          if (gallery.ui) {
            gallery.ui.registerElement({
              name: "custom-caption",
              order: 9,
              isButton: false,
              appendTo: "wrapper",
              onInit: (el: any) => {
                el.innerHTML = `
                  <div class="pswp__custom-caption">
                    <div class="pswp__custom-caption-text"></div>
                  </div>
                `;
              },
            });
          }
        });

        gallery.on("change", function () {
          const captionEl = gallery.pswp?.container?.querySelector(
            ".pswp__custom-caption-text"
          );
          if (captionEl) {
            captionEl.innerHTML = items[gallery.currIndex]?.title || "";
          }
        });

        return gallery;
      },
    },
  };
});
