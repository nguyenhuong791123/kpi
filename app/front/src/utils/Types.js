export const ACTION = {
    SLASH: '/'
    ,TABLES: 'tables'
    ,CHARTS: 'charts'
};

export const FILE_TYPE = {
    PDF: 'pdf'
    ,CSV: 'csv'
    ,XSLX: 'xslx'
    ,DOCX: 'docx'
}

export const CHART_TYPE = {
    LINE: [ "SimpleLineChart", "TinyLineChart", "DashedLineChart", "VerticalLineChart", "BiaxialLineChart", "VerticalLineChartWithSpecifiedDomain", "LineChartConnectNulls", "LineChartWithXAxisPading", "LineChartWithReferenceLines", "CustomizedDotLineChart", "CustomizedLabelLineChart", "SynchronizedLineChart", "HighlightAndZoomLineChart", "LineChartHasMultiSeries", "LineChartAxisInterval" ]
    ,AREA: [ "SimpleAreaChart", "StackedAreaChart", "TinyAreaChart", "PercentAreaChart", "CardinalAreaChart", "AreaChartConnectNulls", "AreaChartFillByValue" ] //, "SynchronizedAreaChart"
    ,BAR: [ "TinyBarChart", "SimpleBarChart", "StackedBarChart", "MixBarChart", "CustomShapeBarChart", "PositiveAndNegativeBarChart", "BrushBarChart", "BarChartWithMinHeight", "BarChartStackedBySign", "BarChartHasBackground", "BarChartWithMultiXAxis" ] //, "BarChartWithCustomizedEvent", "BiaxialBarChart"
    ,COMPOSED: [ "LineBarAreaComposedChart", "SameDataComposedChart", "VerticalComposedChart", "ComposedChartWithAxisLabels" ]
    // ,SCATTER: [ "SimpleScatterChart", "ThreeDimScatterChart", "JointLineScatterChart", "BubbleChart", "ScatterChartWithLabels", "MultipleYAxesScatterChart", "ScatterChartWithCells" ]
    ,PIE: [ "TwoLevelPieChart", "StraightAnglePieChart", "TwoSimplePieChart", "CustomActiveShapePieChart", "PieChartWithCustomizedLabel", "PieChartWithPaddingAngle" ]
    ,RADAR: [ "SimpleRadarChart", "SpecifiedDomainRadarChart" ]
    ,RADIA: [ "SimpleRadialBarChart" ]
    ,TREE: [ "SimpleTreemap", "CustomContentTreemap" ]
    ,TOOLTIP: [ "CustomContentOfTooltip" ]
    ,LEGEND: [ "LegendEffectOpacity" ]
    ,RESPNSIVE: [ "AreaResponsiveContainer", "ComposedResponsiveContainer", "PieResponsiveContainer" ]
}

export const COLORS = [
    "#CCFFFF", "#99FFFF", "#66FFFF", "#33FFFF", "#00FFFF", "#FFFFCC", "#CCFFCC", "#99FFCC", "#66FFCC", "#33FFCC"
    , "#00FFCC", "#FFFF99", "#CCFF99", "#99FF99", "#66FF99", "#33FF99", "#00FF99", "#FFFF66", "#CCFF66", "#99FF66"
    , "#66FF66", "#33FF66", "#00FF66", "#FFFF33", "#CCFF33", "#99FF33", "#66FF33", "#33FF33", "#00FF33", "#FFFF00"
    , "#CCFF00", "#99FF00", "#66FF00", "#33FF00", "#00FF00", "#FFCCFF", "#CCCCFF", "#99CCFF", "#66CCFF", "#33CCFF"
    , "#00CCFF", "#FFCCCC", "#CCCCCC", "#99CCCC", "#66CCCC", "#33CCCC", "#00CCCC", "#FFCC99", "#CCCC99", "#99CC99"
    , "#66CC99", "#33CC99", "#00CC99", "#FFCC66", "#CCCC66", "#99CC66", "#66CC66", "#33CC66", "#00CC66", "#FFCC33"
    , "#CCCC33", "#99CC33", "#66CC33", "#33CC33", "#00CC33", "#FFCC00", "#CCCC00", "#99CC00", "#66CC00", "#33CC00"
    , "#00CC00", "#FF99FF", "#CC99FF", "#9999FF", "#6699FF", "#3399FF", "#0099FF", "#FF99CC", "#CC99CC", "#9999CC"
    , "#6699CC", "#3399CC", "#0099CC", "#FF9999", "#CC9999", "#999999", "#669999", "#339999", "#009999", "#FF9966"
    , "#CC9966", "#999966", "#669966", "#339966", "#009966", "#FF9933", "#CC9933", "#999933", "#669933", "#339933"
    , "#009933", "#FF9900", "#CC9900", "#999900", "#669900", "#339900", "#009900", "#FF66FF", "#CC66FF", "#9966FF"
    , "#6666FF", "#3366FF", "#0066FF", "#FF66CC", "#CC66CC", "#9966CC", "#6666CC", "#3366CC", "#0066CC", "#FF6699"
    , "#CC6699", "#996699", "#666699", "#336699", "#006699", "#FF6666", "#CC6666", "#996666", "#666666", "#336666"
    , "#006666", "#FF6633", "#CC6633", "#996633", "#666633", "#336633", "#006633", "#FF6600", "#CC6600", "#996600"
    , "#666600", "#336600", "#006600", "#FF33FF", "#CC33FF", "#9933FF", "#6633FF", "#3333FF", "#0033FF", "#FF33CC"
    , "#CC33CC", "#9933CC", "#6633CC", "#3333CC", "#0033CC", "#FF3399", "#CC3399", "#993399", "#663399", "#333399"
    , "#003399", "#FF3366", "#CC3366", "#993366", "#663366", "#333366", "#003366", "#FF3333", "#CC3333", "#993333"
    , "#663333", "#333333", "#003333", "#FF3300", "#CC3300", "#993300", "#663300", "#333300", "#003300", "#FF00FF"
    , "#CC00FF", "#9900FF", "#6600FF", "#3300FF", "#0000FF", "#FF00CC", "#CC00CC", "#9900CC", "#6600CC", "#3300CC"
    , "#0000CC", "#FF0099", "#CC0099", "#990099", "#660099", "#330099", "#000099", "#FF0066", "#CC0066", "#990066"
    , "#660066", "#330066", "#000066", "#FF0033", "#CC0033", "#990033", "#660033", "#330033", "#000033", "#FF0000"
    , "#CC0000", "#990000", "#660000", "#330000", "#000000" ]