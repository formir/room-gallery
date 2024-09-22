"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomOutIcon = exports.ZoomInIcon = exports.LightOffIcon = exports.PrevIcon = exports.NextIcon = void 0;
const react_1 = __importDefault(require("react"));
const NextIcon = () => (react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "768", height: "768", viewBox: "0 0 768 768" },
    react_1.default.createElement("path", { fill: "currentColor", d: "M310.624 598.624l192-192c12.512-12.512 12.512-32.768 0-45.248l-192-192c-12.512-12.512-32.768-12.512-45.248 0s-12.512 32.768 0 45.248l169.376 169.376-169.376 169.376c-12.512 12.512-12.512 32.768 0 45.248s32.768 12.512 45.248 0z" })));
exports.NextIcon = NextIcon;
const PrevIcon = () => (react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "768", height: "768", viewBox: "0 0 768 768" },
    react_1.default.createElement("path", { fill: "currentColor", d: "M502.624 553.376l-169.376-169.376 169.376-169.376c12.512-12.512 12.512-32.768 0-45.248s-32.768-12.512-45.248 0l-192 192c-12.512 12.512-12.512 32.768 0 45.248l192 192c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248z" })));
exports.PrevIcon = PrevIcon;
const LightOffIcon = () => (react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "768", height: "768", viewBox: "0 0 768 768" },
    react_1.default.createElement("g", null,
        react_1.default.createElement("path", { fill: "currentColor", d: "M384 0c159.050 0 288 128.951 288 288 0 113.139-65.26 210.797-160 257.879v94.121c0 53.020-42.98 96-96 96h-64c-53.019 0-96-42.98-96-96v-94.121c-94.741-47.081-160-144.74-160-257.879 0-159.049 128.951-288 288-288zM448 544v-18.784c0-13.034 7.907-24.768 19.988-29.661 82.156-33.271 140.013-113.642 140.013-207.555 0-123.703-100.298-224-224-224s-224 100.297-224 224c0 93.913 57.855 174.285 140.012 207.555 12.082 4.893 19.988 16.627 19.988 29.661v18.784h128zM320 608v32c0 17.674 14.326 32 32 32h64c17.674 0 32-14.327 32-32v-32h-128z" }),
        react_1.default.createElement("path", { fill: "currentColor", d: "M384 192c-53.014 0-96 42.985-96 96 0 17.673-14.327 32-32 32s-32-14.327-32-32c0-88.361 71.639-160 160-160 17.674 0 32 14.327 32 32s-14.326 32-32 32z" }))));
exports.LightOffIcon = LightOffIcon;
const ZoomInIcon = () => (react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "768", height: "768", viewBox: "0 0 768 768" },
    react_1.default.createElement("path", { fill: "currentColor", d: "M352 128c-123.712 0-224 100.288-224 224s100.288 224 224 224c123.712 0 224-100.288 224-224s-100.288-224-224-224zM64 352c0-159.058 128.942-288 288-288 159.059 0 288 128.942 288 288 0 159.059-128.941 288-288 288-159.058 0-288-128.941-288-288z" }),
    react_1.default.createElement("path", { fill: "currentColor", d: "M510.173 510.173c12.496-12.496 32.759-12.496 45.254 0l139.2 139.2c12.496 12.496 12.496 32.759 0 45.254s-32.759 12.496-45.254 0l-139.2-139.2c-12.496-12.496-12.496-32.759 0-45.254z" }),
    react_1.default.createElement("path", { fill: "currentColor", d: "M352 224c17.674 0 32 14.327 32 32v192c0 17.674-14.327 32-32 32s-32-14.326-32-32v-192c0-17.673 14.326-32 32-32z" }),
    react_1.default.createElement("path", { fill: "currentColor", d: "M224 352c0-17.674 14.327-32 32-32h192c17.674 0 32 14.327 32 32s-14.326 32-32 32h-192c-17.673 0-32-14.327-32-32z" })));
exports.ZoomInIcon = ZoomInIcon;
const ZoomOutIcon = () => (react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "768", height: "768", viewBox: "0 0 768 768" },
    react_1.default.createElement("path", { fill: "currentColor", d: "M352 128c-123.712 0-224 100.288-224 224s100.288 224 224 224c123.712 0 224-100.288 224-224s-100.288-224-224-224zM64 352c0-159.058 128.942-288 288-288 159.059 0 288 128.942 288 288 0 159.059-128.941 288-288 288-159.058 0-288-128.941-288-288z" }),
    react_1.default.createElement("path", { fill: "currentColor", d: "M510.173 510.173c12.496-12.496 32.759-12.496 45.254 0l139.2 139.2c12.496 12.496 12.496 32.759 0 45.254s-32.759 12.496-45.254 0l-139.2-139.2c-12.496-12.496-12.496-32.759 0-45.254z" }),
    react_1.default.createElement("path", { fill: "currentColor", d: "M224 352c0-17.674 14.327-32 32-32h192c17.674 0 32 14.327 32 32s-14.326 32-32 32h-192c-17.673 0-32-14.327-32-32z" })));
exports.ZoomOutIcon = ZoomOutIcon;
