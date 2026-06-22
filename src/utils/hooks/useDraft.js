import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage form drafts in localStorage.
 * 
 * @param {string} key - Unique key for localStorage.
 */
export function useDraft(key) {
  const [hasExistingDraft, setHasExistingDraft] = useState(false);
  const [existingDraftData, setExistingDraftData] = useState(null);

  // Check for existing draft on mount or key change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only set if we actually have data inside
        if (parsed && Object.keys(parsed).length > 0) {
          setHasExistingDraft(true);
          setExistingDraftData(parsed);
        }
      } else {
        setHasExistingDraft(false);
        setExistingDraftData(null);
      }
    } catch (e) {
      console.error("Error checking draft in localStorage", e);
    }
  }, [key]);

  const saveDraft = useCallback((data) => {
    try {
      if (data && Object.keys(data).length > 0) {
        localStorage.setItem(key, JSON.stringify(data));
        setExistingDraftData(data);
      }
    } catch (e) {
      console.error("Error saving draft to localStorage", e);
    }
  }, [key]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setHasExistingDraft(false);
      setExistingDraftData(null);
    } catch (e) {
      console.error("Error clearing draft from localStorage", e);
    }
  }, [key]);

  return {
    hasExistingDraft,
    existingDraftData,
    saveDraft,
    clearDraft,
    setHasExistingDraft,
  };
}
