export default function Logo(){
    return(
    <>
      <style>{`
      #logo-container {position: absolute; top: 20vh; padding: 2.5vh; left: 0; width: 100vw; border: 3px solid red; pointer-events: none;}
        
        
      `}</style>
      <div id="logo-container" className="flex-center-center">
        <img className="logo-wrapper" style={{opacity: '0.25'}} src="/DesignElixir-Lettermark.svg" />
      </div>
    </>
    )
}