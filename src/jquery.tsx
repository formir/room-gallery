
import { ItemType } from './components/Item'
import { RoomGallerySettingsType } from './types/types'

const React = require('react'),
      createRoot = require('react-dom/client'),
      ReactRoomGallery = require('./RoomGallery')

interface IroomGallery {
  fetchMethod: (fetchUrl: string) => Promise<Array<object>> | string;
  items: HTMLImageElement[];
  styles: object;
  settings: RoomGallerySettingsType;
}

declare global {
  interface JQuery {
    RoomGallery: (options: IroomGallery) => JQuery;
  }
}

if (typeof jQuery !== 'undefined') {
  (function ($) {
    
    $.fn.RoomGallery = function (options: IroomGallery): JQuery {
      return this.each(function () {
        const element = this;
        let dataItems;
        let props = {
          styles: options.styles,
          settings: options.settings,
        };

        if (typeof options.items === 'object') {
          if (options.items.length > 0) {
            dataItems = [...options.items].map((item) =>
              item.tagName === 'IMG' ? { image: item.src.toString(), description: item.title.toString() } as ItemType : null
            );
          }
          props = { ...props, ...{ dataItems: dataItems } };
        } else {
          props = { ...props, [typeof options.fetchMethod === 'string' ? 'fetchUrl' : 'fetchHandler']: options.fetchMethod };
        }
        const root = createRoot(element!)
        root.render(<ReactRoomGallery {...props} />)
      });
    };
  })(jQuery);
}