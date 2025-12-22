// "use client";
// import React from 'react';
// import Plot from 'react-plotly.js';
// // import data from ml/data (project root)
// //import histDataJson from 'src/ml/data/weibull_curve.json';
// //import weibullJson from 'src/ml/data/weibull_curve.json';

// type HistItem = { value: number };
// type WeibullItem = { x: number; pdf: number };

// export default function DistributionPlot() {
//   // const histValues: number[] = (histDataJson as HistItem[]).map((d) => d.value);
//   // const weibull = weibullJson as WeibullItem[];
//   const weibullX = weibull.map((d) => d.x);
//   const weibullY = weibull.map((d) => d.pdf);

//   return (
//     <div className="w-full">
//       <Plot
//         data={[
//           {
//             x: histValues,
//             type: 'histogram',
//             histnorm: 'probability density',
//             marker: { color: 'rgba(59,130,246,0.6)' },
//             opacity: 0.7,
//             nbinsx: 60,
//             name: 'Frequency (Normalized)',
//           },
//           {
//             x: weibullX,
//             y: weibullY,
//             type: 'scatter',
//             mode: 'lines',
//             line: { color: 'rgb(220,38,38)', width: 3 },
//             name: 'Weibull PDF',
//             yaxis: 'y1',
//           },
//         ]}
//         layout={{
//           title: 'Frequency Distribution vs. Weibull Fit',
//           autosize: true,
//           margin: { t: 40, b: 40, l: 40, r: 20 },
//           xaxis: { title: 'Value' },
//           yaxis: { title: 'Density' },
//           legend: { orientation: 'h', x: 0.02, y: 1.05 },
//         }}
//         useResizeHandler
//         style={{ width: '100%', height: 360 }}
//         config={{ responsive: true, displayModeBar: false }}
//       />
//     </div>
//   );
// }
