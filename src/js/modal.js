import * as basicLightbox from 'basiclightbox';
export const instance = basicLightbox.create(
  `
    <div class="modal">

      <div class="question">
          <p>Хочете змінити таймер?</p>
          <button type="button" data-yes>Так</button>
          <button type="button" data-no>Ні</button>
      </div>
    </div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('[data-no]').onclick = instance.close;
      instance.element().querySelector('[data-yes]').onclick = () => {
        window.location.reload();
      };
    },
  }
);
