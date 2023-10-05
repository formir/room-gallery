
import { RoomGallery, IroomGallery } from './function'
declare global {
  interface JQuery {
    RoomGallery: (options: IroomGallery) => JQuery;
  }
}

if (typeof jQuery !== 'undefined') {
  (function ($) {
    $.fn.RoomGallery = function (options: IroomGallery): JQuery {
      if (this.length > 1) {
        RoomGallery({ ...options, ...{ elements: this } })
      } else if (this.length === 1) {
        RoomGallery({ ...options, ...{ element: this } })
      }
      return this
    }
  })(jQuery)
}