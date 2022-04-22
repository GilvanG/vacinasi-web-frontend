import { useQuery } from 'react-query';
import { api } from '../api';

export async function getSchedules() {
  const { data } = await api.get();
  const schedules = data;

  return {
    schedules,
  };
}

export function useSchedules() {
  return useQuery('schedule', () => getSchedules(), {
    staleTime: 1000 * 60 * 10,
  });
}
