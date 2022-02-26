import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PreSale } from 'pages/legacy/PreSale';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stake" element={<PreSale />} />
      </Routes>
    </BrowserRouter>
  );
};
