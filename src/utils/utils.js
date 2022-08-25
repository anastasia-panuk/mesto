export function renderLoading(data, btn) {
  if(!data.onload) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохранить';
  }
}

export function startButtonState(btn) {
  btn.textContent = 'Сохранить';
}
