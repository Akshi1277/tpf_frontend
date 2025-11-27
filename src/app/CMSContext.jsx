"use client";
import { createContext, useContext } from "react";

export const CMSContext = createContext([]);

export const useCMS = () => useContext(CMSContext);
