import React, { useRef, useState, useEffect, ReactEventHandler, useContext } from 'react'
import { GalleryContext } from './../RoomGallery'


export type ItemType = {
  description?: string;
  image?: string | {thumb?: string, prompt: string, original: string, zoom?: string};
  index?: number;
  position?: {x: number, y: number};
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

  useEffect(() => {
    if (refOriginImage.current && refOriginImage.current.complete) {
      originOnLoad()
    }
  })

  useEffect(() => {
    if (refZoomImage.current && refZoomImage.current.complete) {
      zoomOnLoad()
    }
  })

  useEffect(() => {
    if (refPromptImage.current && refPromptImage.current.complete) {
      promptOnLoad()
    }
  })

  function displayZoom() {
    return zoom && typeof image === "object" && image.zoom
  }

  function displayPrompt() {
    return typeof image === "object" && !zoom && image.prompt && !originLoaded
  }

  function displayOriginal() {
    return typeof image === "object" && ((image.prompt && (currentPosition.x - position.x < 1 && currentPosition.x - position.x > -1 && currentPosition.y === position.y)) || !image.prompt ) 
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
