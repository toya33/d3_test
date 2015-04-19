var width = 1000, height = 700;

window.onload = function() {

	var svg = d3.select("#view").append("svg")  // <div id="view">に<svg>を追加
		.attr("width", width)
		.attr("height", height);
	var map = svg.append("g");		// <svg>に<g>を追加

	// 地図データを読み込む    
//	d3.json("http://cloud.aitc.jp/20140717_D3js/gis/kanagawa.json", function(json) {
	d3.json("./gis/kanagawa.json", function(json) {

		   // 緯度・経度からスクリーン座標に変換
			var projection = d3.geo.mercator()
				.scale(50000)                           // 縮尺を指定
				.center(d3.geo.centroid(json))          // 中心位置を計算
				.translate([width / 2, height / 2]);    // 地図の中心を画面の中心にする

			// projectionを使ってpathを変換
			var path = d3.geo.path().projection(projection);

			// 地図を描画
			map.selectAll('path')
			.data(json.geometries)
			.enter()
			.append('path')
			.attr('d', path)
			.attr("fill", "#C0C0C0")
			.attr("stroke","#000000" )
			.on('click', function(d) {
				console.log(d);
			});
		
		///////////////////////////////////////////////////////////////////////
		// 金沢区内公園  http://www.city.yokohama.lg.jp/kanazawa/kz-opendata/
		var csvfile = "./sample/shelter_utf8.csv";
		d3.csv(csvfile, function(csv) {
			points = csv;
			svg = d3.select("svg");  // <svg>を選択

			svg.selectAll(".node")      //  <circle class="node">を選択
				.data(points).enter()        // データの増分を対象
				.append("circle")           // svgのcircleを追加
				.attr("class", "node")
				.attr("cx", function(d) { return projection([d.fX, d.fY])[0]; })    // 円の中心
				.attr("cy", function(d) { return projection([d.fX, d.fY])[1]; })    // 円の中心
				.attr("r", function(d) { return 5; })                                   // 円の半径
				.style("stroke", function(d) { return "#000000"; }) // 枠線の色
				.style("stroke-width", "1px") 						// 枠線の太さ
				.style("fill", function(d) {						// 塗りつぶしの色
					if (d.Name.indexOf("中学校")>=0){
						return "white";
					} else {
						return "red";
					}
				})
				.on('click', function(d) {
					console.log(d);
					address = [{Name:d.Name, 緯度:d.fX, 経度:d.fY, }];
					svg.selectAll(".address")
						.data(address)
						.attr("x",function(d) { return projection([d.fY, d.fX])[0]; })
						.attr("y",function(d) { return projection([d.fY, d.fX])[1]; })
						.text(function(d) { return d.Name; })
					;
				});
			;

			// 住所を表示する入れ物を作っておく
			address = [{Name:"ダミー", }];
			svg.selectAll(".address")
				.data(address).enter()
				.append("text")
				.attr("class", "address") 
				.attr("x",function(d) { return 0; })
				.attr("y",function(d) { return 0; })
				.style("font", "8pt sans-serif")
				.text(function(d) { return d.Name; })
			;
		});
	});
}
