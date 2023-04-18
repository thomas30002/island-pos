import * as React from 'react';
import { createRoot } from 'react-dom/client';

// function render() {
//     ReactDOM.render(<><h1 className="text-3xl font-bold underline">
//     Hello world!
//   </h1></>, document.body);
// }

// render();

import Router from "./views/Router.jsx"

const root = createRoot(document.getElementById('app'));
root.render(<Router />);