am5.ready(function () {

  // Root elementti
  var root = am5.Root.new("chartdiv");

  // Teema
  root.setThemes([ 
      am5themes_Animated.new(root)
  ]);

  // Kaavion väri- ja teksti-asetukset
  root.interfaceColors.set("text", am5.color(0xFFFFFF)); // Tekstit valkoiseksi

  // XY-kaavio
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
  }));

  // Zoomin aluevalitsin (range selector säilytetään)
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomX"
  }));
  cursor.lineY.set("visible", false);

  // X-akseli (päivämäärät)
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: { timeUnit: "day", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
      }),
      tooltip: am5.Tooltip.new(root, {})
  }));
  xAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xFFFFFF)
  });

  // Y-akseli (arvot)
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
  }));
  yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xFFFFFF)
  });

  // X-akselin solujen viivat
  xAxis.get("renderer").grid.template.setAll({
      stroke: am5.color(0xFFFFFF), // Valkoinen väri solujen viivoille
      strokeOpacity: 0.3
  });

  // Y-akselin solujen viivat
  yAxis.get("renderer").grid.template.setAll({
      stroke: am5.color(0xFFFFFF), // Valkoinen väri solujen viivoille
      strokeOpacity: 0.3
  });

  // Sarja
  var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Data",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      stroke: am5.color(0x00FFFF),
      tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          labelFill: am5.color(0xFFFFFF)
      })
  }));

  // Esimerkkidata
  series.data.setAll([
      { date: new Date(2025, 4, 11).getTime(), value: 95 },
      { date: new Date(2025, 4, 12).getTime(), value: 97 },
      { date: new Date(2025, 4, 13).getTime(), value: 98 },
      { date: new Date(2025, 4, 14).getTime(), value: 99 },
      { date: new Date(2025, 4, 15).getTime(), value: 94 },
      { date: new Date(2025, 4, 16).getTime(), value: 92 },
      { date: new Date(2025, 4, 17).getTime(), value: 89 }
  ]);

  // Aluezoomaus (range selector säilytetty)
  var scrollbarX = am5.Scrollbar.new(root, {
      orientation: "horizontal",
      height: 10
  });
  chart.set("scrollbarX", scrollbarX);

  // Animaatiot
  series.appear(1000);
  chart.appear(1000, 100);

}); 
