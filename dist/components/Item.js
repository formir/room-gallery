"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const react_1 = __importStar(require("react"));
const RoomGallery_1 = require("./RoomGallery");
const dompurify_1 = __importDefault(require("dompurify"));
const Image = (0, react_1.forwardRef)((props, ref) => {
    return react_1.default.createElement("img", Object.assign({ ref: ref }, props));
});
const Item = ({ image, title, description, descriptionHtml, html, video, vimeo, youtube, element, HtmlElement, position, height, width }) => {
    var _a, _b;
    const { zoom, position: currentPosition, settings } = (0, react_1.useContext)(RoomGallery_1.GalleryContext);
    const [originLoaded, setOriginLoaded] = (0, react_1.useState)(false);
    const refOriginImage = react_1.default.createRef();
    const [zoomLoaded, setZoomLoaded] = (0, react_1.useState)(false);
    const refZoomImage = react_1.default.createRef();
    const refPromptImage = react_1.default.createRef();
    const sanitizeConfig = {
        ALLOWED_ATTR: ((_a = settings === null || settings === void 0 ? void 0 : settings.sanitizeHtmlOptions) === null || _a === void 0 ? void 0 : _a.allowedAttributes) || [],
        ALLOWED_TAGS: ((_b = settings === null || settings === void 0 ? void 0 : settings.sanitizeHtmlOptions) === null || _b === void 0 ? void 0 : _b.allowedTags) || [],
        KEEP_CONTENT: true
    };
    const originOnLoad = () => {
        setOriginLoaded(true);
    };
    const zoomOnLoad = () => {
        setZoomLoaded(true);
    };
    const atCurrentPosition = () => {
        if (position && currentPosition)
            return currentPosition.x - position.x < 1 && currentPosition.x - position.x > -1 && currentPosition.y === position.y;
    };
    const atPosition = () => {
        if (position && currentPosition)
            return currentPosition.x == position.x && currentPosition.y === position.y;
    };
    function dimentions() {
        return { width: `min(100%, ${width})`, height: `min(100%, ${height})` };
    }
    (0, react_1.useEffect)(() => {
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
        return `room-item${atPosition() ? ' item-active' : ''}`;
    }
    if (element) {
        return react_1.default.createElement("div", { className: itemClass() }, element);
    }
    else if (HtmlElement) {
        return react_1.default.createElement("div", { className: itemClass(), dangerouslySetInnerHTML: { __html: settings.sanitizeHtml ? dompurify_1.default.sanitize(HtmlElement.innerHTML, sanitizeConfig) : HtmlElement.innerHTML } });
    }
    else if (html) {
        return react_1.default.createElement("div", { className: itemClass(), dangerouslySetInnerHTML: { __html: settings.sanitizeHtml ? dompurify_1.default.sanitize(html, sanitizeConfig) : html } });
    }
    else if (video) {
        return react_1.default.createElement("div", { className: itemClass() },
            react_1.default.createElement("video", { width: "640" || width, height: "360" || height, controls: true },
                react_1.default.createElement("source", { src: video })));
    }
    else if (vimeo) {
        return react_1.default.createElement("div", { className: itemClass() },
            react_1.default.createElement("iframe", { title: "vimeo-player", src: vimeo, width: "640" || width, height: "360" || height, frameBorder: "0", allowFullScreen: true }));
    }
    else if (youtube) {
        return react_1.default.createElement("div", { className: itemClass() },
            react_1.default.createElement("iframe", { width: "560" || width, height: "315" || height, src: youtube, title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }));
    }
    else {
        return react_1.default.createElement("div", { className: itemClass() },
            react_1.default.createElement("div", { className: "item-image" },
                typeof image === "object" && !originLoaded &&
                    react_1.default.createElement(Image, { ref: refPromptImage, className: "item-prompt-image", src: image === null || image === void 0 ? void 0 : image.prompt, style: dimentions() }),
                typeof image === "string" ?
                    react_1.default.createElement(Image, { className: "item-original-image", ref: refOriginImage, onLoad: originOnLoad, src: image, style: dimentions() })
                    : (displayOriginal() || originLoaded) &&
                        react_1.default.createElement(Image, { className: "item-original-image", ref: refOriginImage, onLoad: originOnLoad, src: image === null || image === void 0 ? void 0 : image.original, style: dimentions() }),
                typeof image === "object" && displayZoom() &&
                    react_1.default.createElement(Image, { ref: refZoomImage, className: "item-zoom-image", onLoad: zoomOnLoad, style: Object.assign(Object.assign({}, dimentions()), { opacity: zoomLoaded && displayZoom() ? 1 : 0 }), src: image.zoom })),
            (title || description) &&
                react_1.default.createElement("div", { className: "item-desc" },
                    title &&
                        react_1.default.createElement("p", null, title),
                    description &&
                        react_1.default.createElement("span", null, description)),
            (descriptionHtml) &&
                react_1.default.createElement("div", { className: "item-desc", dangerouslySetInnerHTML: { __html: settings.sanitizeHtml ? dompurify_1.default.sanitize(descriptionHtml, sanitizeConfig) : descriptionHtml } }));
    }
};
exports.Item = Item;
