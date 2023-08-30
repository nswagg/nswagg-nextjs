
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
				<iframe 
				src="https://api.mapbox.com/styles/v1/nswagg/cku6d397t005217nxro34xi39.html?title=false&access_token=pk.eyJ1IjoibnN3YWdnIiwiYSI6ImNrdHE4cG55azB0ejEybm11N21samw5c3YifQ.164L6otfChZfmGbF2GMDoQ&zoomwheel=false#2.04/21.1/-27.92/0/3" 
				title="Landslide Size Compared to Number of Fatalities (1988-2017 NASA)"
				style={{width:"100%", height:"100vh"}}
				/>
		</>
	)
}