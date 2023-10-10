
export default function NasaGIS() {
	return(
		<>
			{/* <div className="absolute w-60 m-10 p-6 bg-white">
				<h1>Landslides</h1>
				<p>Data: 
					<a href='https://data.nasa.gov/Earth-Science/Global-Landslide-Catalog-Export/dd9e-wu2v/data'>NASA&apos;s Global Landslide Catalog (GLC)</a> 
					from 1988 to 2017
				</p>
				
					<h2>Casualties</h2>
					<div className="inline-block h-10">
						<div className="h-10 bg-gradient-to-r from-purple-700 from-0% via-blue-500 via-50% to-green-700 to-100%"/>
						<div className="h-10 bg-gradient-to-r from-green-700 to-yellow-500"/>
						<div className="h-10 bg-gradient-to-r from-yellow-500 from-0% via-orange-500 via-50% to-red-700 to-100%"/>
					</div>

					<div class='inline-block mx-auto'>
						<div>0</div>
						<div>100</div>
						<div>1000</div>
						<div>3000</div>
						<div>5000+</div>
					</div>
				</div> */}
				
				<>
  <meta charSet="utf-8" />
  <title>NASA Data - Landslides</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
    rel="stylesheet"
  />
  {/* <style
    dangerouslySetInnerHTML={{
      __html:
        "body {
					margin: 0;
					padding: 0;
				}\n      
			#map {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 100%;
			}
			h1 {
				font-size: 20px;
				line-height: 30px;
			}
			h2 {
				font-size: 14px;
				line-height: 20px;
				margin-bottom: 10px;
			}
			#console {
				position: absolute;
				width: 240px;
				margin: 10px;
				padding: 10px 20px;
				background-color: white;
			}
			.row {\n        height: 12px;\n        width: 100%;\n      }\n\n      .colors {\n        background: linear-gradient(to right, #6e03d8, #019dfe, #44ce0d, #fdfd21, #ef570b, #ff1500);\n        margin-bottom: 5px;\n      }\n\n      .label {\n        width: 18.3%;\n        display: inline-block;\n        text-align: left;\n      }\n    "
    }}
  /> */}
  
  <div id="console"className="absolute max-w-md max-h-md bg-white m-2 p-4 bg-white">
    <h1 className="text-2xl">Landslides</h1>
    <p>
      Data:{" "}
      <a href="https://data.nasa.gov/Earth-Science/Global-Landslide-Catalog-Export/dd9e-wu2v/data" className="text-cyan-600">
        NASA&apos;s Global Landslide Catalog (GLC)
      </a>{" "}
      from 1988 to 2017
    </p>
    <div className="session mb-5">
      <h2 className="text-xl">Casualties</h2>
      <div className="row colors"></div>
      <div className="row labels">
        <div className="label">0</div>
        <div className="label">100</div>
        <div className="label">1000</div>
        <div className="label">3000</div>
        <div className="label">5000+</div>
      </div>
    </div>
  </div>
	<iframe 
				src="https://api.mapbox.com/styles/v1/nswagg/cku6d397t005217nxro34xi39.html?title=false&access_token=pk.eyJ1IjoibnN3YWdnIiwiYSI6ImNrdHE4cG55azB0ejEybm11N21samw5c3YifQ.164L6otfChZfmGbF2GMDoQ&zoomwheel=false#2.04/21.1/-27.92/0/3" 
				title="Landslide Size Compared to Number of Fatalities (1988-2017 NASA)"
				style={{width:"100%", height:"100vh"}}
				/>
</>

		</>
	)
}