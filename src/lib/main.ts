function show(message: string) {
  alert(`[武将統計情報絞り込みブックマークレット(非公式ツール)]
${message}`);
}

let ready = false;

export function main() {
  if (ready) {
    return;
  }
  const targetDom = DOM.contents;
  const filterColor = targetDom.querySelector('#filter_color_general');
  const sortArea = targetDom.querySelector('#sort_area');
  const sortData = targetDom.querySelector('#sort_data') as HTMLSelectElement;
  if (
    !filterColor ||
    !sortArea ||
    !sortData ||
    !Array.isArray(BASE_DATA) ||
    !Array.isArray(FILTER_DATA)
  ) {
    show(
      '英傑大戦.netの武将統計情報ページで実行してください。読み込み中であれば少し待ってから実行してください。'
    );
    return;
  }
  ready = true;
  const originalBaseData = BASE_DATA;

  const colorItems = Array.from(filterColor.querySelectorAll('button.item'));
  const beforeSpan = document.createElement('span');
  beforeSpan.style.fontSize = '12px';
  beforeSpan.innerHTML = '(※非公式ツールの機能です)';
  const afterSpan = document.createElement('span');
  afterSpan.style.paddingRight = '40px';
  afterSpan.innerHTML = '回以上使用';
  const useNumFilter = document.createElement('input');
  useNumFilter.style.width = '100px';
  useNumFilter.style.fontSize = '24px';
  useNumFilter.setAttribute('type', 'number');
  useNumFilter.setAttribute('min', '0');
  useNumFilter.setAttribute('step', '10');
  useNumFilter.setAttribute('value', '0');
  sortArea.prepend(afterSpan);
  sortArea.prepend(useNumFilter);
  sortArea.prepend(beforeSpan);
  useNumFilter.addEventListener('input', (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const colors = colorItems
      .filter((elm) => elm.getAttribute('data-toggle') === '-1')
      .map((elm) => elm.getAttribute('value'));
    const sort = sortData.value;
    const minUse = parseInt(e.target.value);
    BASE_DATA = originalBaseData.filter((f) => f.useNum >= minUse);
    FILTER_DATA =
      colors.length > 0
        ? BASE_DATA.filter((f) => colors.includes(f.color))
        : BASE_DATA;
    sortFunc(sort);
  });
}
