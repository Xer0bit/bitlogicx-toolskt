import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkUserLimit } from '@/utils/userLimits';

export const useUserLimits = (feature) => {
  const user = useSelector((state) => state.user);
  const [usageCount, setUsageCount] = useState(0);
  const [isAllowed, setIsAllowed] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Load today's usage count from localStorage
    const today = new Date().toDateString();
    const storedUsage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
    if (storedUsage.date === today) {
      setUsageCount(storedUsage.count || 0);
    } else {
      // Reset count for new day
      localStorage.setItem('toolUsage', JSON.stringify({ date: today, count: 0 }));
      setUsageCount(0);
    }
  }, []);

  const checkLimit = (action = {}) => {
    const result = checkUserLimit(user, {
      ...action,
      feature,
      usageCount,
    });

    setIsAllowed(result.allowed);
    setErrorMessage(result.message || '');

    if (result.allowed) {
      // Increment usage count
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      const today = new Date().toDateString();
      localStorage.setItem('toolUsage', JSON.stringify({ date: today, count: newCount }));
    }

    return result;
  };

  return {
    isAllowed,
    errorMessage,
    usageCount,
    checkLimit,
  };
};
