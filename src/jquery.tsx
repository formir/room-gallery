
import RoomGallery, { IroomGallery } from './RoomGallery'
declare global {
  interface JQuery {
    RoomGallery: (options: IroomGallery) => JQuery;
  }
}

typeof jQuery !== 'undefined' && (function ($) {
  $.fn.RoomGallery = function (options: IroomGallery): JQuery {
    if (this.length > 1 && !(options.element instanceof HTMLElement)) {
      console.error("Your render 'element' must be a DOM element. If you are selecting it using jQuery, you can use either $(query).get(0) or $(query)[0].")
      return this
    }
    if (this.length > 0) {
      var room = new RoomGallery({
        ...options, ...{
          [this.length > 1 ? 'items' : 'element']:
            this.length === 1 ?
              this.get(0) : this
        }, ... typeof this.length === 'number' && this.length === 1 ? {
          element: this.get(0)
        } : null
      })
      return this.data('RoomGallery', room)
    } else {
      return this
    }
  }
})(jQuery)
