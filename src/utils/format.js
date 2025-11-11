export function minToHM(min = 0) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}시간 ${m}분` : `${m}분`;
}

export function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).getFullYear();
}

