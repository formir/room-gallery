import React, { useRef, useState, useEffect, useContext } from 'react'
import { GalleryContext } from './../RoomGallery'

export type Position = {x: number, y: number}

export type ItemType = {
  description?: string;
  image?: string | {thumb?: string, prompt: string, original: string, zoom?: string};
  index?: number;
  position?: Position;
  element?: JSX.Element | Element;
}

export const Item = ({ image, description, element, index, position } : ItemType) =>  {
  const {currentState, zoom, settings, position: currentPosition} = useContext(GalleryContext);
  const [originLoaded, setOriginLoaded] = useState(false)
  const refOriginImage = useRef<HTMLImageElement>(null)

  const [zoomLoaded, setZoomLoaded] = useState(false)
  const refZoomImage = useRef<HTMLImageElement>(null)

  const [promptLoaded, setPromptLoaded] = useState(false)
  const refPromptImage = useRef<HTMLImageElement>(null)

  const originOnLoad = () => {
    setOriginLoaded(true)
  }

  const zoomOnLoad = () => {
    setZoomLoaded(true)
  }

  const promptOnLoad = () => {
    setPromptLoaded(true)
  }

  const atCurrentPosition = () => {
    return currentPosition.x - position.x < 1 && currentPosition.x - position.x > -1 && currentPosition.y === position.y
  }

  useEffect(() => {
    if (refOriginImage.current && refOriginImage.current.complete) {
      originOnLoad()
    }
    if (refZoomImage.current && refZoomImage.current.complete) {
      zoomOnLoad()
    }
    if (refPromptImage.current && refPromptImage.current.complete) {
      promptOnLoad()
    }
  }, [])

  function displayZoom() {
    return zoom && typeof image === "object" && image.zoom && atCurrentPosition()
  }

  function displayOriginal() {
    return typeof image === "object" && ((image.prompt && atCurrentPosition()) || !image.prompt ) 
  }

  if (element) {
    return <>{element}</>;
  } else {
    return <div className="item">
    <div className="item-image">
      {
        typeof image === "object" && !originLoaded && <img ref={refPromptImage} className="item-prompt-image" onLoad={promptOnLoad} src={image.prompt}/>
      }
      {
        typeof image === "string" ? <img className="item-original-image" ref={refOriginImage} onLoad={originOnLoad} src={image}/> : ( displayOriginal() || originLoaded ) && <img className="item-original-image" ref={refOriginImage} onLoad={originOnLoad} src={image?.original}/>
      }
      {
        typeof image === "object" && displayZoom() && <img ref={refZoomImage} className="item-zoom-image" onLoad={zoomOnLoad} style={{opacity: zoomLoaded && displayZoom() ? 1 : 0}} src={image.zoom}/>
      }
    </div>
    <div className="item-desc">
      <span>
        {description}
      </span>
    </div>
  </div>

  }
}
