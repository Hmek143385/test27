// Service API pour les prospects
import { fetchData } from './api';

export async function getProspects() {
  return fetchData('/prospects');
}

export async function getProspectById(id) {
  return fetchData(`/prospects/${id}`);
}