var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { GalleryContext } from './RoomGallery';
import DOMPurify from "dompurify";
var Image = forwardRef(function (props, ref) {
    return React.createElement("img", __assign({ ref: ref }, props));
});
export var Item = function (_a) {
    var _b, _c;
    var image = _a.image, title = _a.title, description = _a.description, descriptionHtml = _a.descriptionHtml, html = _a.html, video = _a.video, vimeo = _a.vimeo, youtube = _a.youtube, element = _a.element, HtmlElement = _a.HtmlElement, position = _a.position, height = _a.height, width = _a.width;
    var _d = useContext(GalleryContext), zoom = _d.zoom, currentPosition = _d.position, settings = _d.settings;
    var _e = useState(false), originLoaded = _e[0], setOriginLoaded = _e[1];
    var refOriginImage = React.createRef();
    var _f = useState(false), zoomLoaded = _f[0], setZoomLoaded = _f[1];
    var refZoomImage = React.createRef();
    var refPromptImage = React.createRef();
    var sanitizeConfig = {
        ALLOWED_ATTR: ((_b = settings === null || settings === void 0 ? void 0 : settings.sanitizeHtmlOptions) === null || _b === void 0 ? void 0 : _b.allowedAttributes) || [],
        ALLOWED_TAGS: ((_c = settings === null || settings === void 0 ? void 0 : settings.sanitizeHtmlOptions) === null || _c === void 0 ? void 0 : _c.allowedTags) || [],
        KEEP_CONTENT: true
    };
    var originOnLoad = function () {
        setOriginLoaded(true);
    };
    var zoomOnLoad = function () {
        setZoomLoaded(true);
    };
    var atCurrentPosition = function () {
        if (position && currentPosition)
            return currentPosition.x - position.x < 1 && currentPosition.x - position.x > -1 && currentPosition.y === position.y;
    };
    var atPosition = function () {
        if (position && currentPosition)
            return currentPosition.x == position.x && currentPosition.y === position.y;
    };
    function dimentions() {
        return { width: "min(100%, ".concat(width, ")"), height: "min(100%, ".concat(height, ")") };
    }
    useEffect(function () {
        if (refOriginImage.current && refOriginImage.current.complete) {
            originOnLoad();
        }
        if (refZoomImage.current && refZoomImage.current.complete) {
            zoomOnLoad();
        }
    }, []);
    function displayZoom() {
        return zoom && typeof image === "object" && image.zoom && atCurrentPosition();
    }
    function displayOriginal() {
        return typeof image === "object" && ((image.prompt && atCurrentPosition()) || !image.prompt);
    }
    function itemClass() {
        return "room-item".concat(atPosition() ? ' item-active' : '');
    }
    if (element) {
        return React.createElement("div", { className: itemClass() }, element);
    }
    else if (HtmlElement) {
        return React.createElement("div", { className: itemClass(), dangerouslySetInnerHTML: { __html: settings.sanitizeHtml ? DOMPurify.sanitize(HtmlElement.innerHTML, sanitizeConfig) : HtmlElement.innerHTML } });
    }
    else if (html) {
        return React.createElement("div", { className: itemClass(), dangerouslySetInnerHTML: { __html: settings.sanitizeHtml ? DOMPurify.sanitize(html, sanitizeConfig) : html } });
    }
    else if (video) {
        return React.createElement("div", { className: itemClass() },
            React.createElement("video", { width: "640" || width, height: "360" || height, controls: true },
                React.createElement("source", { src: video })));
    }
    else if (vimeo) {
        return React.createElement("div", { className: itemClass() },
            React.createElement("iframe", { title: "vimeo-player", src: vimeo, width: "640" || width, height: "360" || height, frameBorder: "0", allowFullScreen: true }));
    }
    else if (youtube) {
        return React.createElement("div", { className: itemClass() },
            React.createElement("iframe", { width: "560" || width, height: "315" || height, src: youtube, title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }));
    }
    else {
        return React.createElement("div", { className: itemClass() },
            React.createElement("div", { className: "item-image" },
                typeof image === "object" && !originLoaded &&
                    React.createElement(Image, { ref: refPromptImage, className: "item-prompt-image", src: image === null || image === void 0 ? void 0 : image.prompt, style: dimentions() }),
                typeof image === "string" ?
                    React.createElement(Image, { className: "item-original-image", ref: refOriginImage, onLoad: originOnLoad, src: image, style: dimentions() })
                    : (displayOriginal() || originLoaded) &&
                        React.createElement(Image, { className: "item-original-image", ref: refOriginImage, onLoad: originOnLoad, src: image === null || image === void 0 ? void 0 : image.original, style: dimentions() }),
                typeof image === "object" && displayZoom() &&
                    React.createElement(Image, { ref: refZoomImage, className: "item-zoom-image", onLoad: zoomOnLoad, style: __assign(__assign({}, dimentions()), { opacity: zoomLoaded && displayZoom() ? 1 : 0 }), src: image.zoom })),
            (title || description) &&
                React.createElement("div", { className: "item-desc" },
                    title &&
                        React.createElement("p", null, title),
                    description &&
                        React.createElement("span", null, description)),
            (descriptionHtml) &&
                React.createElement("div", { className: "item-desc", dangerouslySetInnerHTML: { __html: settings.sanitizeHtml ? DOMPurify.sanitize(descriptionHtml, sanitizeConfig) : descriptionHtml } }));
    }
};
