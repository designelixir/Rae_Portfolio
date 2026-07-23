import Scene from './Scene'
import NeonSign from './Components/NeonSign'

import StarsIntro from './Components/Scene/0-StarsIntro'
import Logo from './Components/Scene/0-Logo'

function App() {
  return (
    <>
      <div className="scene-layer">
        <Scene />
      </div>
      <StarsIntro></StarsIntro>
      <Logo></Logo>
      <div  id="layer0-wall-texture" className="overlay-layer">
        
        <div id="layer1-wall-scene" className="flex-center-center flex-column">
          <div id="layer1-window" className="flex-start-center">
            <div id="layer1-window-cut"></div>
          </div>
          
          {/* <NeonSign /> */}
          
          <div id="layer1-floors">
              <div id="layer1-floor-trim"></div>
          </div>
        </div>
        {/* <div id="layer2-wall-scene" className="flex-center-center">
          <div id="layer2-bookshelf"></div>
          <div id="layer2-desk" className='flex-center-center'>
            <img src="/scene/layer2-computer.svg" id="layer2-computer"></img>
          </div>
          <div id="layer2-poster-plant-backpack" className="flex-end-end">
            <img src="/scene/layer2-lamp.svg" id="layer2-lamp"></img>
          </div>
          
        </div> */}

      </div>
      <div id="scroll-debug" />
      <div id="wall-scale-debug" />
    </>
  )
}

export default App
