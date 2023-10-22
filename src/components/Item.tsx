import React, { useRef, useState, useEffect, useContext, forwardRef, Ref } from 'react'
import { GalleryContext } from './RoomGallery'
import DOMPurify from "dompurify";

export type Position = {x: number, y: number}

export type ItemType = {
  title?: string;
  description?: string;
  descriptionHtml?: string;
  image?: string | { thumb?: string, prompt: string, original: string, zoom?: string };
  html?: string;
  vimeo?: string;
  youtube?: string;
  width?: `${number}${string}`;
  height?: `${number}${string}`;
  index?: number;
  position?: Position;
  element?: JSX.Element;
  HtmlElement?: HTMLElement;
}

const Image = forwardRef(
  (
    props: React.ComponentPropsWithRef<"img">,
    ref: Ref<HTMLImageElement>
  ) => {
    return <img ref={ref} {...props} loading="lazy" decoding="async"/>
})

export const Item = ({ image, title, description, descriptionHtml, html, vimeo, youtube, element, HtmlElement, position, height, width } : ItemType) => {
  const {zoom, position: currentPosition} = useContext(GalleryContext);
  const [originLoaded, setOriginLoaded] = useState(false)
  const refOriginImage = React.createRef<HTMLImageElement>()

  const [zoomLoaded, setZoomLoaded] = useState(false)
  const refZoomImage = React.createRef<HTMLImageElement>()

  const refPromptImage = React.createRef<HTMLImageElement>()

  const originOnLoad = () => {
    setOriginLoaded(true)
  }

  const zoomOnLoad = () => {
    setZoomLoaded(true)
  }

  const atCurrentPosition = () => {
    if (position && currentPosition) return currentPosition.x - position.x < 1 && currentPosition.x - position.x > -1 && currentPosition.y === position.y
  }

  const atPosition = () => {
    if (position && currentPosition) return currentPosition.x == position.x && currentPosition.y === position.y
  }

  function dimentions() {
    return {width: `min(100%, ${width})`, height: `min(100%, ${height})`}
  }

  useEffect(() => {
    if (refOriginImage.current && refOriginImage.current.complete) {
      originOnLoad()
    }
    if (refZoomImage.current && refZoomImage.current.complete) {
      zoomOnLoad()
    }
  }, [])

  function displayZoom() {
    return zoom && typeof image === "object" && image.zoom && atCurrentPosition()
  }

  function displayOriginal() {
    return typeof image === "object" && ((image.prompt && atCurrentPosition()) || !image.prompt ) 
  }

  function itemClass() {
    return `room-item${atPosition() ? ' item-active' : ''}`
  }

  if (element) {
    return <div className={itemClass()}>{element}</div>;
  } else if (HtmlElement) {
    return <div className={itemClass()} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(HtmlElement.innerHTML) }}></div>
  } else if (html) {
    return <div className={itemClass()} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}></div>
  } else if (vimeo) {
    return <div className={itemClass()}>
      <iframe title="vimeo-player" src={vimeo} width={"640" || width} height={"360" || height} frameBorder="0" allowFullScreen></iframe>
    </div>
  } else if (youtube) {
    return <div className={itemClass()}>
      <iframe width={"560" || width} height={"315" || height} src={youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  } else {
    return <div className={itemClass()}>
    <div className="item-image">
      {
        typeof image === "object" && !originLoaded &&
        <Image ref={refPromptImage} className="item-prompt-image" src={image?.prompt} style={dimentions()} />
      }
      {
        typeof image === "string" ?
          <Image className="item-original-image" ref={refOriginImage} onLoad={originOnLoad} src={image} style={dimentions()} />
          : (displayOriginal() || originLoaded) &&
          <Image className="item-original-image" ref={refOriginImage} onLoad={originOnLoad} src={image?.original} style={dimentions()} />
      }
      {
        typeof image === "object" && displayZoom() &&
        <Image ref={refZoomImage} className="item-zoom-image" onLoad={zoomOnLoad} style={{ ...dimentions(), opacity: zoomLoaded && displayZoom() ? 1 : 0 }} src={image.zoom} />
      }
    </div>
    {
      (title || description) &&
      <div className="item-desc">
        {
          title &&
          <p>
            {title}
          </p>
        }
        {
          description &&
          <span>
            {description}
          </span>
        }
      </div>
    }
    {
      (descriptionHtml) &&
      <div className="item-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descriptionHtml) }}/>
    }
  </div>
  }
}
