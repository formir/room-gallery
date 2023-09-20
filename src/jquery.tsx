
import { ItemType } from './components/Item'
import { RoomGallerySettingsType } from './types/types'

interface IroomGallery {
  fetchMethod: (fetchUrl: string) => Promise<Array<object>> | string;
  items: HTMLImageElement[];
  elements: HTMLElement[];
  styles: object;
  settings: RoomGallerySettingsType;
}

declare global {
  interface JQuery {
    RoomGallery: (options: IroomGallery) => JQuery;
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RoomGallery as ReactRoomGallery } from './RoomGallery'

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
              item.tagName === 'IMG' && typeof item.tagName === 'string' ?
                { image: item.src.toString(), description: item.title.toString() } as ItemType : item as ItemType
            );
          }
          props = { ...props, ...{ dataItems: dataItems } };
        } else if (typeof options.elements === 'object') {
            props = { ...props, ...{ elementItems: options.elements } };
        } else {
          props = { ...props, [typeof options.fetchMethod === 'string' ? 'fetchUrl' : 'fetchHandler']: options.fetchMethod };
        }
        const root = ReactDOM.createRoot(element)
        root.render(<ReactRoomGallery {...props} />)
      });
    };
  })(jQuery);
}