import BASE_DATA from './sample.json';

window.BASE_DATA = BASE_DATA as never;
window.FILTER_DATA = window.BASE_DATA;
window.sortFunc = (val) => {
  console.log(val);
  const debugResult = document.getElementById('debug_result');
  debugResult && (debugResult.innerHTML = JSON.stringify(window.FILTER_DATA));
};
window.DOM = window.DOM || { contents: document.body };

import { main } from './lib/main';

main();
