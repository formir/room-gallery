
import { RoomGallery, IroomGallery } from './function'
declare global {
  interface JQuery {
    RoomGallery: (options: IroomGallery) => JQuery;
  }
}

if (typeof jQuery !== 'undefined') {
  (function ($) {
    $.fn.RoomGallery = function (options: IroomGallery): JQuery {
      return this.map(function () {
        return RoomGallery({ ...options, ...{ element: this } })
      })
    }
  })(jQuery)
}