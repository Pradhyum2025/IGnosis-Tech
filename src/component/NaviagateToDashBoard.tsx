// ---------------------------------------------------------------------
// <copyright file="NaviagateToDashBoard.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NaviagteToDashBoard() {
  const currPath = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(()=>{
    if(currPath==="/"){
      navigate("/products")
    }
  },[])
  return null;
}
