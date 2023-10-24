import React from 'react';
export type Position = {
    x: number;
    y: number;
};
export type ItemType = {
    title?: string;
    description?: string;
    descriptionHtml?: string;
    image?: string | {
        thumb?: string;
        prompt: string;
        original: string;
        zoom?: string;
    };
    html?: string;
    video?: string;
    vimeo?: string;
    youtube?: string;
    width?: `${number}${string}`;
    height?: `${number}${string}`;
    index?: number;
    position?: Position;
    element?: JSX.Element;
    HtmlElement?: HTMLElement;
};
export declare const Item: ({ image, title, description, descriptionHtml, html, video, vimeo, youtube, element, HtmlElement, position, height, width }: ItemType) => React.JSX.Element;
//# sourceMappingURL=Item.d.ts.map